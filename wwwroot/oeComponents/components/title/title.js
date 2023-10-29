import OpenERPComponent from "../../base/openerp-component.js";
import title from "./title.html";
import css from "./title.css";

export default class Title extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-title";
        this.componentCSS = css[0][1];

        const heading = document.createElement(this.variant.tag);
        heading.className = `title mb-2 font-bold text-gray-700 ${this.variant.classes}`;
        heading.appendChild(document.createElement("slot"));
        this.componentHTML = heading.outerHTML;

        super.createWebComponent();
    }  

    /* PROPS */
    get variant() {
        switch (this.getAttribute("variant")) {
            case "xl": return { tag: "h1", classes: "text-xl" };
            case "lg": return { tag: "h2", classes: "text-lg" };
            case "md": return { tag: "h3", classes: "text-md" };
            case "sm": return { tag: "h4", classes: "text-sm" };
            case "xs": return { tag: "h5", classes: "text-xs" };
            default: return { tag: "h3", classes: "text-md" };
        }
    }
}

customElements.define('oe-title', Title);
