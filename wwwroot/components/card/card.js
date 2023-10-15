import OpenERPComponent from "../base/component/openerp-component.js";

const template = document.createElement("template");


export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";

        template.innerHTML = `
            <div class="card p-2 bg-white border border-gray-300 soft-rounded soft-shadow">
                <slot></slot>
                <slot name="image"></slot>
                <slot name="title"></slot>
                <slot name="excerpt"></slot>
                <slot name="cta"></slot>
            </div>
        `;

        this.template = template;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }    
}

customElements.define('oe-card', Card);
