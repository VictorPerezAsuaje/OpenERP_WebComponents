import OpenERPComponent from "../base/component/openerp-component.js";

const template = document.createElement("template");
template.innerHTML = `
    <div class="card p-3 bg-white border border-gray-300 soft-rounded soft-shadow">
        <slot></slot>
        <slot name="image"></slot>
        <slot name="title"></slot>
        <slot name="excerpt"></slot>
        <slot name="cta"></slot>
    </div>
`;


export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";
        this.template = template;
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }    
}

customElements.define('oe-card', Card);
