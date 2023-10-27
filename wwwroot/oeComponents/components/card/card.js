import OpenERPComponent from "../../base/openerp-component.js";
import card from "./card.html";
import "./card.css";

export default class Card extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-card";
        this.componentHTML = card;
        super.createWebComponent();
    }
}

customElements.define('oe-card', Card);
