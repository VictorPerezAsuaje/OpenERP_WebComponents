import OpenERPComponent from "../base/component/openerp-component.js";

export default class Button extends OpenERPComponent {
    #variants = { "solid": "solid", "outline": "outline" };
    #colors = { "primary": "primary", "secondary": "secondary", "accent": "accent" };

    constructor() {
        super();
        this.componentName = "oe-button";
    }    

    /* PROPS */
    getVariant() {
        return this.getAttribute("variant") in this.#variants ? this.getAttribute("variant") : "solid";
    }

    getColor() {
        return this.getAttribute("color") in this.#colors ? this.getAttribute("color") : "primary";
    }

    /* METHODS */

    createWebComponent() {
        const variant = this.getVariant();
        const color = this.getColor();

        const template = document.createElement("template");
        template.innerHTML = `
            <button class="btn ${variant} ${color}">
                <slot></slot>
            </button>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('oe-button', Button);
