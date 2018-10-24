var currentDocument = document.currentScript.ownerDocument;

class UserCard extends HTMLElement {

    constructor() {
        super();
        this.addEventListener("click", (event) => {
            this.toggleCard();
        }, false)
    }

    render(userData) {
        // Fill the respective areas of the card using DOM manipulation APIs
        // All of our components elements reside under shadow dom. So we created a this.shadowRoot property
        // We use this property to call selectors so that the DOM is searched only under this subtree
        this.shadowRoot.querySelector('.card__full-name').innerHTML = userData.name;
        this.shadowRoot.querySelector('.card__user-name').innerHTML = userData.username;
        this.shadowRoot.querySelector('.card__website').innerHTML = userData.website;
        this.shadowRoot.querySelector('.card__address').innerHTML = `<h4>Address</h4>
          ${userData.address.suite}, <br />
          ${userData.address.street},<br />
          ${userData.address.city},<br />
          Zipcode: ${userData.address.zipcode}`
    }

    toggleCard() {
        let elem = this.shadowRoot.querySelector('.card__hidden-content');
        let btn = this.shadowRoot.querySelector('.card__details-btn');
        btn.innerHTML = elem.style.display == 'none' ? 'Less Details' : 'More Details';
        elem.style.display = elem.style.display == 'none' ? 'block' : 'none';
    }

    connectedCallback() {
        // const shadowRoot = this.attachShadow({
        //     mode: open
        // });
        
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        const template = currentDocument.querySelector("#user-card-template");
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);

        const userID = this.getAttribute("user-id");
        // console.log("userID:", userID);

        fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
            .then((response) => response.text())
            .then((responseText) => {
                this.render(JSON.parse(responseText));
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

customElements.define("user-card", UserCard);