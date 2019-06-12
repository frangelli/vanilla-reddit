require("./styles.scss");
export default class Header {
  elementTemplate = `
      <div class="logo">
        <h1>ZA</h1>
      </div>
      <div class="user-info">
        <button id="login-header-button">LOG IN</button>
        <span class="username"></span>
        <button id="create-article-button"><i class="fa fa-plus"></i> NEW ARTICLE</button>
        <button id="logout-header-button">LOG OUT</button>
      </div>`;

  constructor() {
    this.$container = document.querySelector("#app-header");
    this.$loginButton = null;
    this.$logoutButton = null;
    this.$createArticleButton = null;
    this.$username = null;
    this.user = null;
    this.setupUI();
    this.setupEvents();
  }

  setupUI = () => {
    this.$container.innerHTML = this.elementTemplate;
    this.$loginButton = this.$container.querySelector("#login-header-button");
    this.$logoutButton = this.$container.querySelector("#logout-header-button");
    this.$createArticleButton = this.$container.querySelector(
      "#create-article-button"
    );
    this.$username = this.$container.querySelector(".username");
    this.user = localStorage.getItem("za-user")
      ? JSON.parse(localStorage.getItem("za-user"))
      : null;

    if (this.user) {
      this.updateUIForLoggedInUser();
    } else {
      this.updateUIForLoggedOutUser();
    }
  };

  setupEvents = () => {
    this.$loginButton.addEventListener("click", this.onLoginButtonClicked);
    this.$logoutButton.addEventListener("click", this.onLogoutButtonClicked);
    this.$createArticleButton.addEventListener(
      "click",
      this.onCreateArticleButtonClicked
    );
    document.addEventListener("user-logged-in", this.onUserLoggedIn);
  };

  updateUIForLoggedInUser = () => {
    this.$loginButton.classList.add("hidden");
    this.$username.textContent = this.user.username;
    this.$logoutButton.classList.remove("hidden");
    this.$username.classList.remove("hidden");
    this.$createArticleButton.classList.remove("hidden");
  };

  updateUIForLoggedOutUser = () => {
    this.$loginButton.classList.remove("hidden");
    this.$username.textContent = "";
    this.$createArticleButton.classList.add("hidden");
    this.$logoutButton.classList.add("hidden");
    this.$username.classList.add("hidden");
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

  onCreateArticleButtonClicked = e => {
    e.preventDefault();
    document.dispatchEvent(
      new Event("show-new-article-form", {
        bubbles: true
      })
    );
  };

  onLogoutButtonClicked = e => {
    e.preventDefault();
    localStorage.removeItem("za-user");
    this.updateUIForLoggedOutUser();
    document.dispatchEvent(
      new Event("user-logged-out", {
        bubbles: true
      })
    );
  };

  onUserLoggedIn = e => {
    e.preventDefault();

    this.user = localStorage.getItem("za-user")
      ? JSON.parse(localStorage.getItem("za-user"))
      : null;

    if (this.user) {
      this.updateUIForLoggedInUser();
    }
  };
}
