import OpenERPComponent from "../../base/openerp-component.js";
import button from "./button.html";
import css from "./button.css";

export default class Button extends OpenERPComponent {
    #defaultVariant = "solid";
    #availableVariants = { "solid": "solid", "outline": "outline", "flat": "flat" };

    #defaultColor = "primary";
    #availableColors = {
        "primary": "primary",
        "secondary": "secondary",
        "accent": "accent",
        "info": "info",
        "success": "success",
        "warning": "warning",
        "error": "error"
    };

    #defaultType = "soft-rounded";
    #availableTypes = { "square": "soft-rounded", "pill": "regular-rounded", "circle": "circle" };

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

    get type() {
        return this.getAttribute("type") in this.#availableTypes ? this.#availableTypes[this.getAttribute("type")] : this.#defaultType;
    }

    set type(value) {
        this.setAttribute("type", value in this.#availableTypes ? value : this.#defaultType);
        this.#updateCssClasses();
    }

    get isActive() {
        return this.hasAttribute("active");
    }

    set isActive(value) {
        if (value)
            this.setAttribute("active", "");
        else
            this.removeAttribute("active");

        this.#updateCssClasses();
    }

    #updateCssClasses() {
        this.shadowRoot.getElementById("button").className = `button ${this.variant} ${this.color} ${this.type} ${this.isActive ? "active" : ""}`;
    }

    constructor() {
        super();
        this.componentName = "oe-button";
        this.componentHTML = button;   
        this.componentCSS = css[0][1];

        super.createWebComponent();
        this.#updateCssClasses();
    }    
}

customElements.define('oe-button', Button);
