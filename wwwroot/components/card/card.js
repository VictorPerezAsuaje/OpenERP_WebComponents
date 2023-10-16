import OpenERPComponent from "../base/component/openerp-component.js";

export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";
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

    toggleSlotVisibility(slotName) {
        if (this.getWithExternalStyle()) return;

        this.shadowRoot.querySelector(`slot[name=${slotName}]`).toggleAttribute("hidden");
    }
}

customElements.define('oe-card', Card);
