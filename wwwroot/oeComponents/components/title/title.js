import OpenERPComponent from "../../base/openerp-component.js";
import title from "./title.html";
import "./title.css";

export default class Title extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-title";
        this.componentHTML = title;

        this.loadClassProp("tag", this.variant.tag);
        this.loadClassProp("classes", this.variant.classes);
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
