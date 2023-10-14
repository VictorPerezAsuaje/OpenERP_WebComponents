import OpenERPComponent from "../base/component/openerp-component.js";

const template = document.createElement("template");
template.innerHTML = `
    <button class="btn btn-primary">
        <slot></slot>
    </button>
`;

export default class Button extends OpenERPComponent {
    #variants = { "solid": "solid", "outline": "outline" };
    #colors = { "primary": "primary", "secondary": "secondary", "accent": "accent" };

    constructor() {
        super();
        this.componentName = "oe-button";

        const variant = this.getAttribute("variant") in this.#variants ? this.getAttribute("variant") : "solid";
        const color = this.getAttribute("color") in this.#colors ? this.getAttribute("color") : "primary";

        template.innerHTML = `
            <button class="btn ${variant} ${color}">
                <slot></slot>
            </button>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }    
}

customElements.define('oe-button', Button);
