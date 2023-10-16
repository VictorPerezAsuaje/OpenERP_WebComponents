import OpenERPComponent from "../base/component/openerp-component.js";

export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";
    }    

    /* METHODS */
    createCustomElement() {
        const div = document.createElement("div");
        div.className = this.className;
        div.innerHTML = this.innerHTML;
        this.outerHTML = div.outerHTML;
    }

    createWebComponent() {
        const template = document.createElement("template");
        template.innerHTML = `
            <div class="card p-2 bg-white border border-gray-300 soft-rounded soft-shadow">
                <slot></slot>
                <slot name="image"></slot>
                <slot name="title"></slot>
                <slot name="excerpt"></slot>
                <slot name="cta"></slot>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('oe-card', Card);
