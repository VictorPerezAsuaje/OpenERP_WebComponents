import OpenERPComponent from "../base/openerp-component.js";

const template = document.createElement("template");
template.innerHTML = `
    <div class="card p-smx bg-white border border-light-grey regular-rounded soft-shadow">
        <slot></slot>
    </div>
`;

export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";
        console.log("card appending child")
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }    
}

customElements.define('oe-card', Card);
