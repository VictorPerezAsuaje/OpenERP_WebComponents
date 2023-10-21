import OpenERPComponent from "../../base/openerp-component.js";
import card from "./card.html";
import "./card.css";

export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";
        this.componentHTML = card;
    }    

    toggleSlotVisibility(slotName) {
        this.shadowRoot.querySelector(`slot[name=${slotName}]`).toggleAttribute("hidden");
    }
}

customElements.define('oe-card', Card);
