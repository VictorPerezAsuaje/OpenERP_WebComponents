import OpenERPComponent from "../../base/openerp-component.js";
import accordion from "./accordion.html";
import css from "./accordion.css";
import Icon from "../icon/icon.js";

export default class Accordion extends OpenERPComponent {
    #defaultSpaceBetween = 0;
    #availableSpaceBetween = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4"}

    #defaultVariant = "solid";
    #availableVariants = { "solid": "solid", "outline": "outline", "flat": "flat" };

    #defaultColor = "primary";
    #availableColors = {
        "primary": "primary",
        "secondary": "secondary",
        "accent": "accent",
        "info": "info",
        "success": "success",
        "warning": "warning",
        "error": "error"
    };

    /* PROPS */
    get spaceBetween() {
        return this.getAttribute("space-between") in this.#availableSpaceBetween ? this.getAttribute("space-between") : this.#defaultSpaceBetween;
    }

    set spaceBetween(value) {
        this.setAttribute("space-between", value in this.#availableSpaceBetween ? value : this.#defaultSpaceBetween);
        this.#updateCssClasses();
    }

    get variant() {
        return this.getAttribute("variant") in this.#availableVariants ? this.getAttribute("variant") : this.#defaultVariant;
    }

    set variant(value) {
        this.setAttribute("variant", value in this.#availableVariants ? value : this.#defaultVariant);
        this.#updateCssClasses();
    }

    get color() {
        return this.getAttribute("color") in this.#availableColors ? this.getAttribute("color") : this.#defaultColor;
    }

    set color(value) {
        this.setAttribute("color", value in this.#availableColors ? value : this.#defaultColor);
        this.#updateCssClasses();
    }

    get title() {
        return this.getAttribute("title");
    }

    set title(value) {
        this.setAttribute("title", value);
        this.initTitle();
    }

    #updateCssClasses() {
        this.shadowRoot.getElementById("accordion").className = `accordion ${this.variant} ${this.color} gap-${this.spaceBetween}`;
    }

    constructor() {
        super();
        this.componentName = "oe-accordion";
        this.componentHTML = accordion;
        this.componentCSS = css[0][1];
        super.createWebComponent();
        this.initContent();
        this.#updateCssClasses();
    }    

    toggleTabVisibility(container, button) {
        this.shadowRoot
            .querySelectorAll("#accordion section")
            .forEach(tab => tab.classList.remove("active"));

        this.shadowRoot
            .querySelectorAll("#accordion button")
            .forEach(tab => tab.isActive = false);

        container.classList.add("active");
        button.isActive = true;
    }

    initContent() {
        const clientTabs = this.querySelectorAll("oe-accordion:scope > oe-tab");
        const tabsContainer = this.shadowRoot.getElementById("accordion");
        tabsContainer.innerHTML = "";

        for (let tab of clientTabs) {
            const details = document.createElement("details");
            details.open = tab.hasAttribute("active");

            const summary = document.createElement("summary");

            const summaryContent = document.createElement("span");
            summaryContent.textContent = tab.getAttribute("title");

            if (tab.hasAttribute("icon")) {
                const icon = new Icon();
                icon.name = tab.getAttribute("icon");
                summary.appendChild(icon);
            }

            summary.appendChild(summaryContent);

            const container = document.createElement("section");
            container.innerHTML = tab.innerHTML.trim();

            details.appendChild(summary);
            details.appendChild(container);
            tabsContainer.appendChild(details);
        }
    }
}

customElements.define('oe-accordion', Accordion);
