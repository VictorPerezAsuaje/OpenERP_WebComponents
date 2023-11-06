import OpenERPComponent from "../../base/openerp-component.js";
import skeleton from "./skeleton.html";

export default class Skeleton extends OpenERPComponent {

    constructor() {
        super();
        this.componentName = "oe-skeleton";
        this.componentHTML = skeleton;
        this.componentCSS = "";

        super.createWebComponent();
    }    
}

customElements.define('oe-skeleton', Skeleton);
