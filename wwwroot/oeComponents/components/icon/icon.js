import OpenERPComponent from "../../base/openerp-component.js";
import icon from "./icon.html";
import css from "./icon.css";

export default class Icon extends OpenERPComponent {
    get name() {
        return this.getAttribute("name");
    }

    set name(value) {
        this.setAttribute("name", value);
        this.#updateCssClasses();
    }

    #updateCssClasses() {
        this.shadowRoot.querySelector("i").className = `icon ${this.name}`;
    }

    constructor() {
        super();
        this.componentName = "oe-icon";
        this.componentCSS = css[0][1];        
        this.componentHTML = icon;

        super.createWebComponent();
        this.#updateCssClasses();
    }    
}

customElements.define('oe-icon', Icon);
