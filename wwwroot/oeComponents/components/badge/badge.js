import OpenERPComponent from "../../base/openerp-component.js";
import badge from "./badge.html";
import css from "./badge.css";

export default class Badge extends OpenERPComponent {
    #defaultVariant = "solid";
    #availableVariants = { "solid": "solid", "outline": "outline" };

    #defaultColor = "primary";
    #availableColors = {
        "primary": "primary",
        "secondary": "secondary",
        "accent": "accent",
        "info": "info",
        "success": "success",
        "warning": "warning",
        "error": "error",
    };

    #defaultSize = "text-xs";
    #availableSizes = {
        "xl": "text-xl",
        "lg": "text-lg",
        "md": "text-md",
        "sm": "text-sm",
        "xs": "text-xs"
    };

    #defaultType = "regular-rounded";
    #availableTypes = { "square": "soft-rounded", "pill": "regular-rounded" };

    /* PROPS */
    get variant() {
        return this.getAttribute("variant") in this.#availableVariants ? this.getAttribute("variant") : this.#defaultVariant;
    }

    set variant(value) {
        this.setAttribute("variant", value in this.#availableVariants ? value : this.#defaultVariant);
        this.#updateCssClasses();
    }

    get color() {
        return this.getAttribute("color") in this.#availableColors ? this.getAttribute("color") : this.#defaultColor;
    }

    set color(value) {
        this.setAttribute("color", value in this.#availableColors ? value : this.#defaultColor);
        this.#updateCssClasses();
    }

    get size() {
        return this.getAttribute("size") in this.#availableSizes ? this.#availableSizes[this.getAttribute("size")] : this.#defaultSize;
    }

    set size(value) {
        this.setAttribute("size", value in this.#availableSizes ? value : this.#defaultSize);
        this.#updateCssClasses();
    }

    get type() {
        return this.getAttribute("type") in this.#availableTypes ? this.#availableTypes[this.getAttribute("type")] : this.#defaultType;
    }

    set type(value) {
        this.setAttribute("type", value in this.#availableTypes ? value : this.#defaultType);
        this.#updateCssClasses();
    }

    #updateCssClasses() {
        this.shadowRoot.getElementById("badge").className = `badge ${this.variant} ${this.color} ${this.size} ${this.type}`;
    }

    constructor() {
        super();

        this.componentName = "oe-badge";
        this.componentHTML = badge;
        this.componentCSS = css[0][1];

        super.createWebComponent();
        this.#updateCssClasses();
    }    
}

customElements.define('oe-badge', Badge);
