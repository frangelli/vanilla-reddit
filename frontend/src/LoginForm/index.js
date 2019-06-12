import { template } from "lodash";
import { clearDOMElement } from "utils";
import { postComment } from "services";

require("./styles.scss");
export default class LoginForm {
  formTemplate = `
    <form id="login-form">
      <input class="username-field" placeholder="username"/>
      <div class="buttons">
        <button id="btn-login">LogIn</button>
        <button id="btn-cancel">Cancel</button>
      </div>
    </form>
  `;

  constructor() {
    this.$el = null;
    this.$usernameField = null;
    this.$loginButton = null;
    this.$cancelButton = null;
    this.setupUI();
    this.setupEvents();
  }

  setupUI = () => {
    const formModalFragment = document.createDocumentFragment();
    const modalEl = document.createElement("div");
    modalEl.id = "login-modal";
    modalEl.classList.add("hidden");
    const modalFn = template(this.formTemplate);
    modalEl.innerHTML = modalFn({
      articleId: this.articleId
    });
    formModalFragment.appendChild(modalEl);
    document.body.appendChild(formModalFragment);
    this.$usernameField = modalEl.querySelector("input");
    this.$loginButton = modalEl.querySelector("#btn-login");
    this.$cancelButton = modalEl.querySelector("#btn-cancel");
    this.$el = modalEl;
  };

  setupEvents = () => {
    this.$loginButton.addEventListener("click", this.onLoginButtonClick);
    this.$cancelButton.addEventListener("click", this.onCancelButtonClick);
    document.addEventListener("show-login-form", this.onShowLoginClicked);
  };

  // all event handlers goes here
  onLoginButtonClick = e => {
    e.preventDefault();
    const username = this.$usernameField.value;
    if (!username) {
      window.alert("You should type a username to login!");
    }
  };

  onCancelButtonClick = e => {
    e.preventDefault();
    this.$el.classList.add("hidden");
  };

  onShowLoginClicked = e => {
    e.preventDefault();
    this.$el.classList.remove("hidden");
  };
}
