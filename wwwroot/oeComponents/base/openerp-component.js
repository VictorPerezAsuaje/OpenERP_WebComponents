import importsCss from "./styles/__style-imports.min.css";
export default class OpenERPComponent extends HTMLElement {   
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.componentName = "";     
        this.componentHTML = "";
        this.componentCSS = "";
        this.template = document.createElement("template");           

        let importcss = document.createElement("style");
        importsCss.forEach(x => importcss.textContent += x[1])

        this.shadowRoot.appendChild(importcss);
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
        this.template.innerHTML = this.componentHTML;

        const styleElement = document.createElement("style");
        styleElement.textContent = this.componentCSS;

        this.shadowRoot.appendChild(styleElement);
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.setAttribute("fouc", "loaded");
    }
}
