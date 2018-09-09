var currentDocument = document.currentScript.ownerDocument;

class ModalDialog extends HTMLElement {
    constructor() {
        super();
        console.log("ModalDialog Constructor");
    }
    connectedCallback() {
        // console.log("in ModalDialog");

        this.render();
    }
    //attributeChangedCallback
    static get observedAttributes() {
        return ["visible", "title"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log('attributeChangeCalback:', name, oldVal, newVal);
        if (name === "visible" && this.shadowRoot) {
            if (newVal === null) {
                this.shadowRoot.querySelector('[wrapper]').classList.remove("visible");
            } else {
                this.shadowRoot.querySelector('[wrapper]').classList.add("visible");
            }
        }

    }
    // get set properties
    get title() {
        return this.getAttribute("title");
    }
    set title(value) {
        this.setAttribute("title", value);
    }

    get visible() {
        return this.hasAttribute("visible");
    }

    set visible(value) {
        if (value) {
            this.setAttribute("visible", "");
        } else {
            this.removeAttribute("visible");
        }
    }


    // end of get set region
    render() {
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });

        const template = currentDocument.querySelector("#modal-dialog").content;

        const title = template.querySelector('[title]');
        title.innerHTML = this.title;
        const instance = template.cloneNode(true);

        // adding instance first and then adding event listener later by query shadowRoot
        shadowRoot.appendChild(instance);
        let bnts = shadowRoot.querySelectorAll('[bnt]');
        let wrapper = shadowRoot.querySelector('wrapper')
        this.removeAttribute("visible");
        // console.log("buttons:", bnts);
        // this.removeAttribute("visible");
        bnts.forEach(bnt => {
            console.log('bnt', bnt, bnt instanceof HTMLElement);
            bnt.addEventListener('click', event => {
                let bntAtt = event.target.getAttribute('bnt');
                console.log(event.target, bntAtt);
                switch (bntAtt) {
                    case "ok":
                        this.removeAttribute("visible");
                        this.dispatchEvent(new CustomEvent("OK"));
                        break;
                    case "cancel":
                        this.removeAttribute("visible");
                        this.dispatchEvent(new CustomEvent("CANCEL"));
                        break;
                }
            })
        })
        


    }

}

customElements.define('modal-dialog', ModalDialog);