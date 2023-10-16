import OpenERPComponent from "../base/component/openerp-component.js";

export default class Badge extends OpenERPComponent {
    static observedAttributes = [];
    #variants = { "solid": "solid", "outline": "outline" };
    #colors = { "primary": "primary", "secondary": "secondary", "accent": "accent" };
    #size = { "xl": "text-xl", "lg": "text-lg", "md": "text-md", "sm": "text-sm", "xs": "text-xs" };
    #type = { "square": "soft-rounded", "pill": "regular-rounded" };

    constructor() {
        super();
        this.componentName = "oe-badge";
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

    /* METHODS */

    createWebComponent() {
        const template = document.createElement("template");
        template.innerHTML = `
            <span class="badge ${this.getVariant()} ${this.getColor()} ${this.getSize()} ${this.getType()}">
                <slot></slot>
            </span>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('oe-badge', Badge);
