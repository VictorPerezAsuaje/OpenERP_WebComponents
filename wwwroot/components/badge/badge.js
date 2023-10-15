import OpenERPComponent from "../base/component/openerp-component.js";

const template = document.createElement("template");

export default class Badge extends OpenERPComponent {
    static observedAttributes = [];
    #variants = { "solid": "solid", "outline": "outline" };
    #colors = { "primary": "primary", "secondary": "secondary", "accent": "accent" };
    #size = { "xl": "text-xl", "lg": "text-lg", "md": "text-md", "sm": "text-sm", "xs": "text-xs" };
    #type = { "square": "soft-rounded", "pill": "regular-rounded" };

    constructor() {
        super();
        this.componentName = "oe-badge";
        const variant = this.getAttribute("variant") in this.#variants ? this.getAttribute("variant") : "solid";
        const color = this.getAttribute("color") in this.#colors ? this.getAttribute("color") : "primary";
        const size = this.getAttribute("size") in this.#size ? this.#size[this.getAttribute("size")] : this.#size["xs"];
        const type = this.getAttribute("type") in this.#type ? this.#type[this.getAttribute("type")] : this.#type["pill"];

        template.innerHTML = `
            <span class="badge ${variant} ${color} ${size} ${type}">
                <slot></slot>
            </span>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }    
}

customElements.define('oe-badge', Badge);
