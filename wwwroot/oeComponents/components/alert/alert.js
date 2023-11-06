import OpenERPComponent from "../../base/openerp-component.js";
import alert from "./alert.html";
import css from "./alert.css";

export default class Alert extends OpenERPComponent {
    #defaulVariant = "solid";
    #availableVariants = { "solid": "solid", "outline": "outline" };

    #defaultColor = "info";
    #availableColors = {
        "info": "info",
        "success": "success",
        "warning": "warning",
        "error": "error"
    };


    /* PROPS */
    get variant() {
        return this.getAttribute("variant") in this.#availableVariants ?
            this.getAttribute("variant") : this.#defaulVariant;
    }

    set variant(value) {
        this.setAttribute("variant", value in this.#availableVariants ? value : this.#defaulVariant);
        this.#updateCssClasses();
    }

    get color() {
        return this.getAttribute("color") in this.#availableColors ?
            this.getAttribute("color") : this.#defaultColor;
    }

    set color(value) {
        this.setAttribute("color", value in this.#availableColors ? value : this.#defaultColor);
        this.#updateCssClasses();
        this.initIcon();
    }

    get title() {
        return this.getAttribute("title");
    }

    set title(value) {
        this.setAttribute("title", value);
        this.initTitle();
    }

    get message() {
        return this.innerHTML;
    }

    set message(value) {
        this.innerHTML = value;
        this.initMessage();
    }

    #updateCssClasses() {
        this.shadowRoot.getElementById("messageContainer").className = `alert ${this.variant} ${this.color}`;
    }

    constructor() {
        super();
        this.componentName = "oe-alert";
        this.componentHTML = alert;
        this.componentCSS = css[0][1];
        super.createWebComponent();
        this.#updateCssClasses();
        this.initTitle();
        this.initMessage();
        this.initIcon();
    }    

    initTitle() {
        const title = this.shadowRoot.querySelector(".alert-title");

        if (this.isNullOrWhiteSpace(this.title)) {
            title.classList.add("none");
            return;
        }

        title.classList.remove("none");
        title.textContent = this.title;
    }

    initMessage() {
        const message = this.shadowRoot.querySelector(".alert-message");
        message.innerHTML = this.message;
    }

    initIcon() {
        const icon = this.shadowRoot.querySelector("oe-icon");

        switch (this.color) {
            case this.#availableColors.info:
            default:
                icon.name = "fa-solid fa-circle-info";
                break;
            case this.#availableColors.success:
                icon.name = "fa-solid fa-circle-check";
                break;
            case this.#availableColors.warning:
                icon.name = "fa-solid fa-triangle-exclamation";
                break;
            case this.#availableColors.error:
                icon.name = "fa-solid fa-circle-exclamation";
                break;
        }
    }
}

customElements.define('oe-alert', Alert);
