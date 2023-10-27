﻿import OpenERPComponent from "../../base/openerp-component.js";
import skeleton from "./skeleton.html";

export default class Skeleton extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-skeleton";
        this.componentHTML = skeleton;
        super.createWebComponent();
    }    
}

customElements.define('oe-skeleton', Skeleton);
