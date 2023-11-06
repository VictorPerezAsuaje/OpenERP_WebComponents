import OpenERPComponent from "../../base/openerp-component.js";
import card from "./card.html";
import css from "./card.css";

export default class Card extends OpenERPComponent {
    constructor() {
        super();
        this.componentName = "oe-card";
        this.componentHTML = card;
        this.componentCSS = css;
        super.createWebComponent();
    }
}

customElements.define('oe-card', Card);
