export default class OpenERPComponent extends HTMLElement {
    getWithExternalStyle() {
        return this.hasAttribute('with-external-style');
    }

    constructor() {
        super();

        if (!this.getWithExternalStyle())
            this.attachShadow({ mode: "open" });

        this.componentName = "";     
    }    

    isNullOrWhiteSpace(string) {
        return string === undefined || string === null || string.trim() === "";
    }

    createCustomElement() {
        return null;
    }

    createWebComponent() {
        return null;
    }

    connectedCallback() {
        this.loadStylesheet();

        if (this.getWithExternalStyle())
            this.createCustomElement();
        else
            this.createWebComponent();
    }

    /* Turns a string split with "-" into camel case notation */
    snakeCaseIntoCamelCase(name) {
        let parts = name.split("-")
        return [parts.shift(), ...parts.map(n => n[0].toUpperCase() + n.slice(1))].join("")
    }

    loadStylesheet() {
        if (this.getWithExternalStyle()) return;

        const name = this.componentName.replace("oe-", "");
        const folderName = this.snakeCaseIntoCamelCase(name);
        const href = `/components/${folderName}/${name}.css`;
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
