import { template } from "lodash";
import { clearDOMElement } from "utils";
import { postComment } from "services";

require("./styles.scss");
export default class CommentForm {
  formTemplate = `
    <textarea class="comment-field" placeholder="write comment..."></textarea>
    <button id="btn-send-comment-<%= articleId %>">Send</button>
  `;

  constructor(container, articleId) {
    this.$container = container;
    this.articleId = articleId;
    this.$contentField = null;
    this.$sendButton = null;
    this.setupUI();
    this.setupEvents();
  }

  setupUI = () => {
    const formFragment = document.createDocumentFragment();
    const formEl = document.createElement("form");
    formEl.classList.add("comment-form");
    formEl.id = `comment-form-article-${this.articleId}`;
    const formFn = template(this.formTemplate);
    formEl.innerHTML = formFn({
      articleId: this.articleId
    });
    formFragment.appendChild(formEl);
    this.$container.appendChild(formFragment);
    this.$contentField = formEl.querySelector("textarea");
    this.$sendButton = formEl.querySelector("button");
  };

  setupEvents = () => {
    this.$sendButton.addEventListener("click", this.onSendButtonClick);
  };

  // all event handlers goes here
  onSendButtonClick = e => {
    e.preventDefault();
    const content = this.$contentField.value;
    if (!content) {
      window.alert("You should type something to comment!");
    }
    postComment(this.articleId, content, 1)
      .then(response => {
        document.dispatchEvent(
          new CustomEvent("add-comment", {
            detail: { comment: response.data },
            bubbles: true
          })
        );
        this.$contentField.value = "";
      })
      .catch(err => {
        window.alert(err);
      });
  };
}
