import OpenERPComponent from "../../base/openerp-component.js";
import table from "./table.html";
import "./table.css";

export default class Table extends OpenERPComponent {
    static observedAttributes = ["rows-to-show", "page", "search"];

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

    data = [];

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
        return this.data.length;
    }

    get fetchFrom() {
        return this.getAttribute("oe-get");
    }

    async fetchData() {
        try {
            const response = await fetch(this.fetchFrom);
            if (!response.ok) {
                console.error('Failed to fetch data:', response.status, response.statusText);
                this.showMessage('Failed to fetch data.', "error");
                return;
            }

            this.data = await response.json();
            this.initTable();
        }
        catch (error)
        {
            console.error('Error while fetching data:', error);
            this.showMessage('Error while fetching data.', "error");
        }
    }

    showMessage(message, type) {   
        const messageContainer = this.shadowRoot.getElementById("messageContainer");
        const messageItem = this.shadowRoot.getElementById("message");
        let color = "bg-error";

        if (type === "info")
            color = "bg-info";

        this.cssClasses(messageContainer)
            .remove("bg-error")
            .remove("bg-info")
            .remove("none")
            .add(color);

        messageItem.textContent = message;
    }

    constructor() {
        super();
        this.componentName = "oe-table";
        this.componentHTML = table;
        super.createWebComponent();

        this.fetchData();      
    }


    initTable() {
        this.initHeader();
        this.initTableHead();
        this.initTableBody();
        this.initPagination();
        this.initPrevNextButtons();        

        this.hide("loaderContainer");
        this.show("tableContainer");
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
    }

    

    initTableHead() {
        const headRow = this.shadowRoot.querySelector("thead tr");
        Object.keys(this.data[0]).forEach(headData => {
            const th = document.createElement('th');
            th.className = "p-3";
            th.textContent = headData;
            headRow.appendChild(th);
        });
    }    

    initTableBody() {
        const body = this.shadowRoot.querySelector("tbody");
        body.innerHTML = "";

        const startingIndex = (this.page - 1) * this.rowsToShow;
        const endingIndex = Number(startingIndex) + Number(this.rowsToShow);

        for (let i = startingIndex; i < endingIndex; i++) {
            const rowData = this.data[i];
            const tr = document.createElement('tr');
            tr.className = "bg-white border border-solid border-b-1 border-gray-500";          
                            
            Object.keys(rowData).forEach(columnName => {
                const td = document.createElement('td');
                td.className = "p-3";                
                td.textContent = rowData[columnName];
                tr.appendChild(td);
            })
            
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
            li.innerHTML = "<span>...</span>";
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
                    <button class='pagination-button  flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-1 border-gray-300 soft-rounded'>
                        ${i}
                    </button>
                `;
            }

            const btn = li.querySelector("button");
            btn.addEventListener("click", () => this.changePageTo(i))
            availablePages.appendChild(li);            

            if (i == endingPage && endingPage != this.numberOfPages) {
                const li = document.createElement("li");
                li.innerHTML = "<span>...</span>";
                availablePages.appendChild(li);
                break;
            }
        }                
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

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("name: ", name, ", oldValue: ", oldValue, ", newValue: ", newValue)
    }
}

export class TableHead extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-head";
        super.createWebComponent();
    }
}

export class TableColumn extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-column";
        super.createWebComponent();
    }

    render() {
        const th = document.createElement('th');
        th.className = "p-3";
        th.innerHTML = this.innerHTML;
        return th;
    }
}


customElements.define('oe-column', TableColumn);
customElements.define('oe-head', TableHead);
customElements.define('oe-table', Table);
