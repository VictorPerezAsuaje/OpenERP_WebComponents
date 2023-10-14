﻿import OpenERPComponent from "../base/component/openerp-component.js";

export default class Title extends OpenERPComponent {
    static observedAttributes = [];

    getVariant() {
        switch (this.getAttribute("variant")) {
            case "xl": return { tag: "h1", classes: "text-xl" };
            case "lg": return { tag: "h2", classes: "text-lg" };
            case "md": return { tag: "h3", classes: "text-md" };
            case "sm": return { tag: "h4", classes: "text-sm" };
            case "xs": return { tag: "h5", classes: "text-xs" };
        }
    }

    constructor() {
        super();
        this.componentName = "oe-title";
        const variant = this.getVariant();

        const template = document.createElement("template");
        template.innerHTML = `
            <${variant.tag} class="mb-2 font-bold text-gray-700 ${variant.classes}">
                <slot></slot>
            </${variant.tag}>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }    
}

customElements.define('oe-title', Title);