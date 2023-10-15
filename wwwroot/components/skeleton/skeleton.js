import OpenERPComponent from "../base/component/openerp-component.js";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
    </style>

    <div 
        role="status" 
        style="
            height: fit-content;
            width: 100%;
            background-color: #e2e8f0;
            border-radius: 0.5rem;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        ">
        <span class="sr-only">Loading...</span>
    </div>   
`;

export default class Skeleton extends OpenERPComponent {
    static observedAttributes = [];

    constructor() {
        super();
        this.componentName = "oe-skeleton";
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }    
}

customElements.define('oe-skeleton', Skeleton);
