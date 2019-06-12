import { template } from "lodash";
import { isLoggedIn, getCurrentUser } from "utils";
import { postArticle } from "services";

require("./styles.scss");
export default class ArticleForm {
  formTemplate = `
    <form id="article-form">
      <input type="text" id="article-title" placeholder="Article title..."/>
      <textarea id="article-content" class="comment-field" placeholder="Article content..."></textarea>
      <div class="buttons">
        <button id="btn-send-article">Send</button>
        <button id="btn-cancel-article">Cancel</button>
      </div>
    </form>
  `;

  constructor() {
    this.$modal = null;
    this.$titleField = null;
    this.$contentField = null;
    this.$sendButton = null;
    this.$cancelButton = null;
    this.setupUI();
    this.setupEvents();
  }

  setupUI = () => {
    const modalFragment = document.createDocumentFragment();
    const modalEl = document.createElement("div");
    modalEl.id = `article-modal`;
    modalEl.classList.add("hidden");
    const modalFn = template(this.formTemplate);
    modalEl.innerHTML = modalFn();
    modalFragment.appendChild(modalEl);
    document.body.appendChild(modalFragment);
    this.$titleField = modalEl.querySelector("input");
    this.$contentField = modalEl.querySelector("textarea");
    this.$sendButton = modalEl.querySelector("#btn-send-article");
    this.$cancelButton = modalEl.querySelector("#btn-cancel-article");
    this.$modal = modalEl;
  };

  setupEvents = () => {
    this.$sendButton.addEventListener("click", this.onSendButtonClick);
    this.$cancelButton.addEventListener("click", this.onCancelButtonClick);
    document.addEventListener(
      "show-new-article-form",
      this.onShowNewArticleForm
    );
  };

  // all event handlers goes here
  onSendButtonClick = e => {
    e.preventDefault();
    const title = this.$titleField.value;
    const content = this.$contentField.value;
    if (!title || !content) {
      window.alert("All fields are required!");
      return;
    }
    const user = getCurrentUser();
    if (!user) {
      window.alert("You are not logged in anymore... Please refresh the page");
      return;
    }

    postArticle(title, content, user.id)
      .then(response => {
        document.dispatchEvent(
          new CustomEvent("add-article", {
            detail: { article: response.data },
            bubbles: true
          })
        );
        this.$titleField.value = "";
        this.$contentField.value = "";
        this.$modal.classList.add("hidden");
      })
      .catch(err => {
        window.alert(err);
      });
  };

  onCancelButtonClick = e => {
    e.preventDefault();
    this.$modal.classList.add("hidden");
  };

  onShowNewArticleForm = () => {
    this.$modal.classList.remove("hidden");
  };
}
