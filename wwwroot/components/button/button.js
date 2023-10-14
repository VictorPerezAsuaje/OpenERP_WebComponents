import OpenERPComponent from "../base/openerp-component.js";

const template = document.createElement("template");
template.innerHTML = `
    <button class="btn btn-primary" onclick="console.log('clicked!')">
        <slot></slot>
    </button>
`;

export default class Button extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-button";
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }    
}

customElements.define('oe-button', Button);
