import OpenERPComponent from "../../base/openerp-component.js";
import button from "./button.html";
import css from "./button.css";

export default class Button extends OpenERPComponent {
    #variants = { "solid": "solid", "outline": "outline", "flat": "flat" };
    #colors = {
        "primary": "primary",
        "secondary": "secondary",
        "accent": "accent",
        "info": "info",
        "success": "success",
        "warning": "warning",
        "error": "error"
    };

    #type = { "square": "soft-rounded", "pill": "regular-rounded", "circle": "circle" };

    constructor() {
        super();
        this.componentName = "oe-button";
        this.componentHTML = button;   
        this.componentCSS = css[0][1];

        this.loadClassProp("variant", this.variant);
        this.loadClassProp("color", this.color);
        this.loadClassProp("type", this.type);
        super.createWebComponent();
    }    

    /* PROPS */
    get variant() {
        return this.getAttribute("variant") in this.#variants ? this.getAttribute("variant") : "solid";
    }

    get color() {
        return this.getAttribute("color") in this.#colors ? this.getAttribute("color") : "primary";
    }
    get type() {
        return this.getAttribute("type") in this.#type ? this.getAttribute("type") : "soft-rounded";
    }
}

customElements.define('oe-button', Button);
