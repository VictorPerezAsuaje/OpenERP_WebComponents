import OpenERPComponent from "../../base/openerp-component.js";
import badge from "./badge.html";
import "./badge.css";

export default class Badge extends OpenERPComponent {
    static observedAttributes = [];
    #variants = { "solid": "solid", "outline": "outline" };

    #colors = {
        "primary": "primary",
        "secondary": "secondary",
        "accent": "accent",
        "info": "info",
        "success": "success",
        "warning": "warning",
        "error": "error",
    };

    #size = { "xl": "text-xl", "lg": "text-lg", "md": "text-md", "sm": "text-sm", "xs": "text-xs" };

    #type = { "square": "soft-rounded", "pill": "regular-rounded" };

    constructor() {
        super();
        this.componentName = "oe-badge";
        this.componentHTML = badge;

        this.loadClassProp("variant", this.getVariant());
        this.loadClassProp("color", this.getColor());
        this.loadClassProp("size", this.getSize());
        this.loadClassProp("type", this.getType());
    }    

    /* PROPS */
    getVariant() {
        return this.getAttribute("variant") in this.#variants ? this.getAttribute("variant") : "solid";
    }

    getColor() {
        return this.getAttribute("color") in this.#colors ? this.getAttribute("color") : "primary";
    }

    getSize() {
        return this.getAttribute("size") in this.#size ? this.#size[this.getAttribute("size")] : this.#size["xs"];
    }

    getType() {
        return this.getAttribute("type") in this.#type ? this.#type[this.getAttribute("type")] : this.#type["pill"];
    }
}

customElements.define('oe-badge', Badge);
