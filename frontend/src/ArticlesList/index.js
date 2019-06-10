import { template } from "lodash";
import { clearDOMElement } from "utils";
import { fetchArticles, fetchArticleComments } from "../services";

require("./styles.scss");
export default class ArticlesList {
  elementTemplate = `
    <div id="articles-list">
    </div>
  `;

  articleTemplate = `
    <div class="votes-wrapper">
      <a href="#" class="vote-btn vote-up"></a>
      <span class="votes"><%= votes %></span>
      <a href="#" class="vote-btn vote-down"></a>
    </div>
    <div>
      <header class="article-title"><%= title %></header>
      <section class="article-content">
        <%= content %>
      </section>
    </div>
    <div>
      <aside class="posted-by">Posted by <%= postedBy %><br/><%= postedAt %> ago</aside>
      <aside class="comments-counter">5 comments</aside>
    </div>
 `;

  articles = [];

  constructor() {
    this.$container = document.querySelector("#content");
    this.$el = null;
    this.initUI();
    this.initData();
  }

  initUI = () => {
    console.log("-----------------------");
    console.log("INIT UI ARTICLES LIST");
    console.log("-----------------------");
    this.$container.innerHTML = this.elementTemplate;
    this.$el = this.$container.querySelector("#articles-list");
  };

  initData = () => {
    fetchArticles()
      .then(response => {
        this.articles = response.data;
        this.renderArticlesList();
      })
      .catch(err => {
        window.alert(err);
      });
  };

  renderArticlesList = () => {
    const listFragment = document.createDocumentFragment();

    this.articles.forEach(article => {
      const articleEl = document.createElement("article");
      articleEl.classList.add("article");

      const articleFn = template(this.articleTemplate);
      articleEl.innerHTML = articleFn({
        title: article.title,
        content: article.content,
        votes: article.votes,
        postedBy: article.user.username,
        postedAt: article.posted_at
      });

      listFragment.appendChild(articleEl);
    });
    clearDOMElement(this.$el);
    this.$el.appendChild(listFragment);
  };
}
