import OpenERPComponent from "../../base/openerp-component.js";
import table from "./table.html";
import css from "./table.css";

export default class Table extends OpenERPComponent {
    #defaultSortDirection = "asc";
    #defaultSortOptions = {
        asc: "asc",
        desc: "desc"
    };

    #defaultNoDataFoundText = "No matching records found";
    #defaultPaginationPageRange = 3;
    #defaultPage = 1;
    #defaultRowsToShow = 5;
    #defaultRowsToShowOptions = {
        "5": 5,
        "10": 10,
        "25": 25,
        "50": 50,
        "100": 100
    }; 

    #data = [];  
    #filteredData = [];
    #columns = {};

    get numberOfPages() {
        return Math.ceil(this.rowCount / this.rowsToShow); 
    }

    get page() {
        return this.getAttribute("page") ?? this.#defaultPage;
    }

    get rowsToShow() {
        return this.getAttribute("rows-to-show") ?? this.#defaultRowsToShow;
    }

    get rowCount() {
        return this.#filteredData.length;
    }

    get search() {
        return this.getAttribute("search");
    }

    get fetchFrom() {
        return this.getAttribute("oe-get");
    }

    get noDataFoundText() {
        return this.getAttribute("oe-no-data-text") ?? this.#defaultNoDataFoundText;
    }

    get sortColumn() {
        return this.getAttribute("sort-column")?.toLowerCase();
    }

    get sortDirection() {
        const direction = this.getAttribute("sort-direction")?.toLowerCase();

        if (!direction)
            return this.#defaultSortDirection;

        if (!(direction in this.#defaultSortOptions))
            return this.#defaultSortDirection;

        return this.#defaultSortOptions[direction];
    }

    async fetchData() {
        const response = await fetch(this.fetchFrom);
        if (!response.ok) {
            console.error('Failed to fetch data:', response.status, response.statusText);
            this.showMessage('Failed to fetch data.');
            return;
        }

        this.#data = await response.json();
        this.#filteredData = this.#data;
        this.initTable();
    }

    showMessage(message) {   
        const messageContainer = this.shadowRoot.getElementById("messageContainer");
        messageContainer.classList.remove("none");
        messageContainer.textContent = message;
    }

    #sortStringFunc(a, b) {
        if (this.sortDirection === "asc") {
            if (a[this.sortColumn] < b[this.sortColumn]) return -1
            return a[this.sortColumn] > b[this.sortColumn] ? 1 : 0
        }
        else {
            if (a[this.sortColumn] > b[this.sortColumn]) return -1
            return a[this.sortColumn] < b[this.sortColumn] ? 1 : 0
        }
    }

    constructor() {
        super();
        this.componentName = "oe-table";
        this.componentHTML = table;
        this.componentCSS = css[0][1];
        super.createWebComponent();

        this.fetchData();      
    }

    initTable() {
        this.loadUserDefinedColumns();

        this.initHeader();
        this.initTableHead()

        this.initSearch();                    
        this.initSorting();            

        this.initTableBody();
        
        this.initPagination();
        this.initPrevNextButtons();        

        this.hide("loaderContainer");
        this.show("tableContainer");
    }

    loadUserDefinedColumns() {
        const userColumns = this.querySelectorAll("oe-column");

        if (userColumns.length === 0) {
            if (this.#filteredData?.length === 0) return;

            Object.keys(this.#filteredData[0]).forEach(headData => {
                this.#columns[headData] = {
                    bind: headData,
                    headTemplate: headData,
                    rowTemplate: null,
                    sortable: null
                };
            });

            return;
        }

        Array.from(userColumns).forEach(c => {
            this.#columns[c.bindTo ?? c.columnName] = c.getColumnDefinition();
        });
    }

    initHeader() {
        const rowsToShow = this.shadowRoot.getElementById("rowsToShow");
        Object.keys(this.#defaultRowsToShowOptions).forEach(x => {
            const option = document.createElement("option");

            option.innerHTML = `
                <option selected='${this.#defaultRowsToShowOptions[x] == this.rowsToShow}'>
                    ${this.#defaultRowsToShowOptions[x]}
                </option>`;

            rowsToShow.appendChild(option);
        });

        rowsToShow.addEventListener("change", () => this.changeRowsToShow());

        const search = this.shadowRoot.getElementById("table-search");
        let timeout = null;
        search.addEventListener("keyup", () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.applySearchFilter(search.value)
            }, 200);
        })
    }    

    initTableHead() {
        const headRow = this.shadowRoot.querySelector("thead tr");
        headRow.innerHTML = "";
        Object.values(this.#columns).forEach(column => {
            const th = document.createElement('th');            
            th.className = "p-3";
            th.innerHTML = column.headTemplate;

            if (column.sortable) {
                th.setAttribute("sort", "");
                th.setAttribute("sort-by", column.bind)

                if (column.bind === this.sortColumn)
                    th.setAttribute("sort", this.sortDirection);

                th.addEventListener("click", () => this.applySorting(th));
            }
            
            headRow.appendChild(th);            
        });
    }

    initSearch() {
        const searchableFields = this.querySelectorAll("[oe-bind][searchable='true']");
        const searchContainer = this.shadowRoot.getElementById("searchContainer");
        searchContainer.classList.remove("none");

        if (searchableFields.length === 0) {
            searchContainer.classList.add("none");
            return;
        }

        if (this.isNullOrWhiteSpace(this.search)) return;  

        const tableSearch = this.shadowRoot.getElementById("table-search");
        tableSearch.value = this.search;
        
        const searchableColumns = [...searchableFields].map(x => x.getAttribute("oe-bind").toLowerCase());

        this.#filteredData = this.#data.filter(x =>
            searchableColumns.some(column =>
                `${x[column] ?? ""}`.includes(this.search)
            )
        );        
    }

    initSorting() {        
        if (!this.sortColumn || !(this.sortColumn in this.#columns)) return;

        this.#filteredData = this.#filteredData.sort((a, b) => this.#sortStringFunc(a,b));         
    }

    applyBindingDataToRowTemplate(rowData, rowTemplate) {
        const bindables = Object.keys(rowData).join("|");
        const regexExp = new RegExp(`{{(${bindables})}}`, "i");
        const matches = rowTemplate.match(regexExp);
        if (!matches || matches.length == 0)
            return rowTemplate;

        matches.forEach(match => {
            const cleanMatch = match.replace("{{", "").replace("}}", "").toLowerCase();
            const data = rowData[cleanMatch];

            if (data !== undefined || data !== null)
                rowTemplate = rowTemplate.replace(match, data); 
        });

        return rowTemplate;
    }

    initTableBody() {
        const body = this.shadowRoot.querySelector("tbody");
        body.innerHTML = "";

        if (this.rowCount == 0) {
            body.innerHTML = `
            <tr>
                <td colspan='${Object.keys(this.#columns).length}'>
                    ${this.noDataFoundText}
                </td>
            </tr>`;
            return;
        }

        const startingIndex = (this.page - 1) * this.rowsToShow;
        let endingIndex = Number(startingIndex) + Number(this.rowsToShow);

        if (endingIndex > this.rowCount)
            endingIndex = this.rowCount;

        for (let i = startingIndex; i < endingIndex; i++) {
            const rowData = this.#filteredData[i];
            const tr = document.createElement('tr');
            tr.id = crypto.randomUUID();
            tr.className = "bg-white border border-solid border-b-1 border-gray-500";          

            Object.keys(this.#columns).forEach(col => {
                const td = document.createElement('td');
                td.className = "p-3";

                // rowTemplate has priority over the data 
                if (this.#columns[col].rowTemplate)
                    td.innerHTML = this.applyBindingDataToRowTemplate(rowData ,this.#columns[col].rowTemplate);
                else
                    td.textContent = rowData[col];

                tr.appendChild(td);
            });
            
            body.appendChild(tr);
        }
    }    

    initPagination() {
        const navigation = this.shadowRoot.getElementById("navigation");
        navigation.classList.remove("none");

        const totalRows = this.shadowRoot.getElementById("totalRows");

        totalRows.textContent = this.rowCount;

        const visibleRows = this.shadowRoot.getElementById("visibleRows");
        const initRowIndex = this.rowsToShow * (Number(this.page) - 1);
        visibleRows.textContent = `${initRowIndex} - ${Number(initRowIndex) + Number(this.rowsToShow)}`;

        const availablePages = this.shadowRoot.getElementById("availablePages");
        availablePages.innerHTML = "";


        if (this.page - this.#defaultPaginationPageRange > 1) {
            const li = document.createElement("li");
            li.innerHTML = "<span class='select-none'>...</span>";
            availablePages.appendChild(li);
        }

        const startingPage = this.page - this.#defaultPaginationPageRange > 1 ? this.page - this.#defaultPaginationPageRange : 1;

        let endingPage = startingPage + Number(this.#defaultPaginationPageRange) * 2;
        if (endingPage >= this.numberOfPages)
            endingPage = this.numberOfPages;

        for (let i = startingPage; i <= endingPage; i++) {         
            const li = document.createElement("li");

            if (i == this.page) {
                li.innerHTML = `
                    <button class='pagination-button selected flex items-center justify-center px-3 h-8 text-white border border-gray-300 soft-rounded'>
                        ${i}
                    </button>
                `;
            }
            else {
                li.innerHTML = `
                    <button class='pagination-button flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-1 border-gray-300 soft-rounded'>
                        ${i}
                    </button>
                `;
            }

            const btn = li.querySelector("button");
            btn.addEventListener("click", () => this.changePageTo(i))
            availablePages.appendChild(li);            

            if (i == endingPage && endingPage != this.numberOfPages) {
                const li = document.createElement("li");
                li.innerHTML = "<span class='select-none'>...</span>";
                availablePages.appendChild(li);
                break;
            }
        }                

        this.togglePrevNextButtonDisabled();
    }

    initPrevNextButtons() {
        const previousPageBtn = this.shadowRoot.getElementById("previousPage");
        const nextPageBtn = this.shadowRoot.getElementById("nextPage");
        previousPageBtn.addEventListener("click", () => this.previousPage());
        nextPageBtn.addEventListener("click", () => this.nextPage());
    }

    togglePrevNextButtonDisabled() {
        const prevPage = Number(this.page) - 1;
        const nextPage = Number(this.page) + 1;
        const previousPageBtn = this.shadowRoot.getElementById("previousPage");

        if (prevPage < 1)
            previousPageBtn.classList.add("disabled");
        else
            previousPageBtn.classList.remove("disabled");

        const nextPageBtn = this.shadowRoot.getElementById("nextPage");

        if (nextPage > this.numberOfPages)
            nextPageBtn.classList.add("disabled");
        else
            nextPageBtn.classList.remove("disabled");
    }

    previousPage() {
        const prevPage = Number(this.page) - 1;       
        this.changePageTo(prevPage);
    }

    nextPage() {
        const nextPage = Number(this.page) + 1;        
        this.changePageTo(nextPage);
    }

    /* ---- ATTRIBUTE CHANGE METHODS ---- */
    changePageTo(pageNumber) {
        this.setAttribute("page", pageNumber);
        this.initTableBody();
        this.initPagination();
        this.togglePrevNextButtonDisabled();
    }

    changeRowsToShow() {
        const rowsToShow = this.shadowRoot.getElementById("rowsToShow");
        this.setAttribute("rows-to-show", rowsToShow.options[rowsToShow.selectedIndex].value);

        if (this.page > this.numberOfPages) {
            this.changePageTo(this.numberOfPages);
            return;
        }

        this.initTableBody();
        this.initPagination();
    }

    applySearchFilter(searchValue) {
        this.setAttribute("search", searchValue);

        if (this.isNullOrWhiteSpace(this.search)) {
            this.#filteredData = this.#data;

            this.initSorting();
            this.initTableBody();
            this.initPagination();
            return;
        }

        const searchableColumns = [...this.querySelectorAll("[oe-bind][searchable='true']")].map(x => x.getAttribute("oe-bind").toLowerCase());

        this.#filteredData = this.#data.filter(x =>
            searchableColumns.some(column =>
                `${x[column] ?? ""}`.includes(this.search)
            )
        );

        this.initTableBody();
        this.initPagination();
    }    

    applySorting(tableHead) {
        const sortBy = tableHead.getAttribute("sort-by")?.toLowerCase();
        if (sortBy === this.sortColumn?.toLowerCase()) {
            // If you click the same column change sort direction
            this.setAttribute("sort-direction", this.sortDirection === "desc" ? "asc" : "desc");
        }
        else {
            // If you change column sort by default
            this.setAttribute("sort-column", sortBy);
            this.setAttribute("sort-direction", this.#defaultSortDirection);
        }

        if (!(sortBy in this.#columns)) return;

        this.#filteredData = this.#filteredData.sort((a, b) => this.#sortStringFunc(a,b));  

        this.initTableHead();
        this.initTableBody();
    }
}

export class Column extends OpenERPComponent {
    static observedAttributes = [];

    get bindTo() {
        return this.getAttribute("oe-bind")?.toLowerCase();
    }

    get columnName() {
        return this.getAttribute("oe-name");
    }

    constructor() {
        super();
        this.componentName = "oe-column";
        if (this.isNullOrWhiteSpace(this.bindTo) && this.isNullOrWhiteSpace(this.columnName)) {
            console.error("A column requires to either have a bind-to or a name specified");
            return;
        }

        super.createWebComponent();       
    }

    getColumnDefinition() {        
        const headTemplate = this.querySelector("oe-head-template");
        const rowTemplate = this.querySelector("oe-row-template");

        const col = {
            bind: this.bindTo ?? "",
            headTemplate: null,
            rowTemplate: null,
            sortable: this.getAttribute("sortable")
        };

        if (headTemplate)
            col.headTemplate = headTemplate.innerHTML.trim();
        else
            col.headTemplate = this.innerHTML.trim();

        if (rowTemplate)
            col.rowTemplate = rowTemplate.innerHTML.trim();

        return col;
    }
}


customElements.define('oe-column', Column);
customElements.define('oe-table', Table);
