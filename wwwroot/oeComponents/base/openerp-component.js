export default class OpenERPComponent extends HTMLElement {   
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.componentName = "";     
        this.componentHTML = "";
        this.template = document.createElement("template");        
    }    

    isNullOrWhiteSpace(string) {
        return string === undefined || string === null || string.trim() === "";
    }

    hide(itemId) {
        const item = this.shadowRoot.getElementById(itemId);
        if (item.classList.contains("none")) return;
        item.classList.add("none");
    }

    show(itemId) {
        const item = this.shadowRoot.getElementById(itemId);
        if (!item.classList.contains("none")) return;
        item.classList.remove("none");
    }

    cssClasses(item) {
        var list = item.classList;

        return {
            toggle: function (c) { list.toggle(c); return this; },
            add: function (c) { list.add(c); return this; },
            remove: function (c) { list.remove(c); return this; },
            contains: function (c) { list.contains(c); return this; }
        };

    }

    createWebComponent() {
        this.loadStylesheet();
        this.template.innerHTML = this.componentHTML;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    /**
     * Loads any value property to the componentHTML that follows the {{ propName }} and replaces it with the propValue. 
     * 
     * This should always be defined AFTER assigning the this.componentHTML in the component constructor.
     * @param {any} propName
     * @param {any} propValue
     */
    loadClassProp(propName, propValue) {
        this.componentHTML = this.componentHTML.replaceAll(`{{${propName}}}`, propValue);
    }

    /* Turns a string split with "-" into camel case notation */
    snakeCaseIntoCamelCase(name) {
        let parts = name.split("-")
        return [parts.shift(), ...parts.map(n => n[0].toUpperCase() + n.slice(1))].join("")
    }

    loadStylesheet() {
        const name = this.componentName.replace("oe-", "");
        const folderName = this.snakeCaseIntoCamelCase(name);
        const href = `/oeComponents/components/${folderName}/${name}.css`;
        const existingLink = document.querySelector(`link[href="${href}"]`);

        if (existingLink) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        this.shadowRoot.appendChild(link);     

        link.addEventListener("load", () => {
            this.setAttribute("fouc", "loaded");
        })
    }
}
