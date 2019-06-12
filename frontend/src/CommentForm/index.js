import { template } from "lodash";
import { clearDOMElement } from "utils";

require("./styles.scss");
export default class CommentForm {
  formTemplate = `
    <textarea class="comment-field" placeholder="write comment..."></textarea>
    <button id="btn-send-comment-<%= articleId %>">Send</button>
  `;

  constructor(container, articleId) {
    this.$container = container;
    this.articleId = articleId;
    this.setupUI();
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
  };
}
