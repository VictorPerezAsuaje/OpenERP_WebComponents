import OpenERPComponent from "../../base/openerp-component.js";
import tabs from "./tabs.html";
import css from "./tabs.css";
import Button from "../button/button.js";

export default class Tabs extends OpenERPComponent {
    #defaultType = "horizontal";
    #availableTypes = { "horizontal": "horizontal", "vertical": "vertical" };

    get type() {
        return this.getAttribute("type") in this.#availableTypes ? this.getAttribute("type") : this.#defaultType;
    }

    set type(value) {
        this.setAttribute("type", value in this.#availableTypes ? value : this.#defaultType);
        this.#updateCssClasses();
    }

    get btnType() {
        return this.getAttribute("button-type");
    }

    set btnType(value) {
        this.setAttribute("button-type", value);
        this.initContent();
    }

    get btnColor() {
        return this.getAttribute("button-color");
    }

    set btnColor(value) {
        this.setAttribute("button-color", value);
        this.initContent();
    }

    get btnVariant() {
        return this.getAttribute("button-variant");
    }

    set btnVariant(value) {
        this.setAttribute("button-variant", value);
        this.initContent();
    }

    #updateCssClasses() {
        this.shadowRoot.getElementById("tabs").className = `tabs ${this.type}`;
    }

    constructor() {
        super();
        this.componentName = "oe-tabs";
        this.componentHTML = tabs;
        this.componentCSS = css;
        super.createWebComponent();     
        this.initContent();
        this.#updateCssClasses();
    }

    toggleTabVisibility(container, button) {
        this.shadowRoot
            .querySelectorAll(".tabs-container section")
            .forEach(tab => tab.classList.remove("active"));

        this.shadowRoot
            .querySelectorAll("header oe-button")
            .forEach(tab => tab.isActive = false);

        container.classList.add("active");
        button.isActive = true;
    }

    initContent() {      
        const clientTabs = this.querySelectorAll("oe-tab");
        const header = this.shadowRoot.querySelector("header");
        const tabsContainer = this.shadowRoot.querySelector(".tabs-container");
        header.innerHTML = "";
        tabsContainer.innerHTML = "";

        let hasActiveTab = false;
        for (let tab of clientTabs) {
            const button = new Button();
            button.type = this.btnType;
            button.color = this.btnColor;
            button.variant = this.btnVariant;           
            button.textContent = tab.getAttribute("title");

            if (!hasActiveTab) {
                button.isActive = tab.hasAttribute("active");
                hasActiveTab = tab.hasAttribute("active");
            }

            const container = document.createElement("section");
            container.innerHTML = tab.innerHTML.trim();
            container.className = `tab ${button.isActive ? "active" : ""}`;

            button.addEventListener("click", () => this.toggleTabVisibility(container, button));
            header.appendChild(button);            
            tabsContainer.appendChild(container);               
        }
    }
}

customElements.define('oe-tabs', Tabs);
