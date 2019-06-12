require("./styles.scss");
export default class Header {
  elementTemplate = `
      <div class="logo">
        <h1>ZA</h1>
      </div>
      <div class="user-info">
        <button id="login-header-button">LOG IN</button>
      </div>`;

  constructor() {
    this.$container = document.querySelector("#app-header");
    this.$loginButton = null;
    this.setupUI();
    this.setupEvents();
  }

  setupUI = () => {
    this.$container.innerHTML = this.elementTemplate;
    this.$loginButton = this.$container.querySelector("#login-header-button");
  };

  setupEvents = () => {
    this.$loginButton.addEventListener("click", this.onLoginButtonClicked);
  };

  // all event handlers goes here
  onLoginButtonClicked = e => {
    e.preventDefault();
    document.dispatchEvent(
      new Event("show-login-form", {
        bubbles: true
      })
    );
  };
}
