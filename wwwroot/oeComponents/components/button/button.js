import OpenERPComponent from "../../base/openerp-component.js";
import button from "./button.html";
import "./button.css";

export default class Button extends OpenERPComponent {
    #variants = { "solid": "solid", "outline": "outline" };
    #colors = { "primary": "primary", "secondary": "secondary", "accent": "accent" };

    constructor() {
        super();
        this.componentName = "oe-button";
        this.componentHTML = button;   
        
        this.loadClassProp("variant", this.getVariant());
        this.loadClassProp("color", this.getColor());
    }    

    /* PROPS */
    getVariant() {
        return this.getAttribute("variant") in this.#variants ? this.getAttribute("variant") : "solid";
    }

    getColor() {
        return this.getAttribute("color") in this.#colors ? this.getAttribute("color") : "primary";
    }
}

customElements.define('oe-button', Button);
