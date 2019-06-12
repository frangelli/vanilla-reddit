import { template } from "lodash";
import { clearDOMElement, hasCssClass, generateAvatarByUsername } from "utils";
import {
  fetchArticles,
  fetchArticleComments,
  voteUp,
  voteDown
} from "../services";
import CommentForm from "../CommentForm";

require("./styles.scss");
export default class ArticlesList {
  elementTemplate = `
    <div id="articles-list">
    </div>
  `;

  articleTemplate = `
    <div class="votes-wrapper">
      <a href="#" class="vote-btn vote-up" data-article-id="<%= id %>"></a>
      <span class="votes"><%= votes %></span>
      <a href="#" class="vote-btn vote-down" data-article-id="<%= id %>"></a>
    </div>
    <div>
      <header class="article-title" data-article-id="<%= id %>"><%= title %></header>
      <section class="article-content" data-article-id="<%= id %>">
        <%= content %>
      </section>
    </div>
    <div>
      <aside class="posted-by">Posted by <%= postedBy %><br/><%= postedAt %> ago</aside>
      <aside class="comments-counter"><%= commentsCount %> comments</aside>
    </div>
 `;

  commentTemplate = `
    <div class="avatar"><%= avatar %></div>
    <div class="comment-data">
      <span class="posted-by"><%= postedBy %></span>
      <span class="comment-content"><%= content %></span>
    </div>
  `;

  articles = [];

  constructor() {
    this.$container = document.querySelector("#content");
    this.$el = null;
    this.initUI();
    this.initData();
    this.setupEvents();
  }

  initUI = () => {
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

  setupEvents = () => {
    // event delegation for better performance
    this.$el.addEventListener("click", e => {
      const clickedElement = e.target;
      const { articleId } = clickedElement.dataset;
      if (
        hasCssClass(clickedElement, "article-content") ||
        hasCssClass(clickedElement, "article-title") ||
        hasCssClass(clickedElement, "article")
      ) {
        this.onArticleClick(articleId);
      } else if (hasCssClass(clickedElement, "vote-up")) {
        this.onVoteUpClick(articleId);
      } else if (hasCssClass(clickedElement, "vote-down")) {
        this.onVoteDownClick(articleId);
      }
    });
  };

  renderArticlesList = () => {
    const listFragment = document.createDocumentFragment();

    this.articles.forEach(article => {
      const articleEl = document.createElement("article");
      articleEl.classList.add("article");
      articleEl.dataset.articleId = article.id;
      const commentsEl = document.createElement("section");
      commentsEl.classList.add("comments");
      commentsEl.classList.add("hidden");
      commentsEl.dataset.articleId = article.id;

      const articleFn = template(this.articleTemplate);
      articleEl.innerHTML = articleFn({
        id: article.id,
        title: article.title,
        content: article.content,
        votes: article.votes,
        postedBy: article.user.username,
        postedAt: article.posted_at,
        commentsCount: article.comments_count
      });

      listFragment.appendChild(articleEl);
      listFragment.appendChild(commentsEl);
    });
    clearDOMElement(this.$el);
    this.$el.appendChild(listFragment);
  };

  renderArticleComments = (el, comments) => {
    const listFragment = document.createDocumentFragment();

    comments.forEach(comment => {
      const commentEl = document.createElement("comment");
      commentEl.classList.add("comment");
      commentEl.dataset.commentId = comment.id;

      const commentFn = template(this.commentTemplate);
      commentEl.innerHTML = commentFn({
        id: comment.id,
        postedBy: comment.user.username,
        content: comment.content,
        avatar: generateAvatarByUsername(comment.user.username)
      });

      listFragment.appendChild(commentEl);
    });
    clearDOMElement(el);
    el.appendChild(listFragment);
    new CommentForm(el, el.dataset.articleId);
  };

  // here goes all event handlers
  onArticleClick = articleId => {
    const articleCommentsEl = this.$el.querySelector(
      `[data-article-id="${articleId}"].comments`
    );
    if (articleCommentsEl) {
      if (hasCssClass(articleCommentsEl, "hidden")) {
        fetchArticleComments(articleId)
          .then(response => {
            this.renderArticleComments(articleCommentsEl, response.data);
            articleCommentsEl.classList.toggle("hidden");
          })
          .catch(err => {
            window.alert(err);
          });
      } else {
        articleCommentsEl.classList.toggle("hidden");
      }
    }
  };

  onVoteUpClick = articleId => {
    voteUp(articleId)
      .then(response => {
        this.articles = response.data;
        this.renderArticlesList();
      })
      .catch(err => {
        window.alert(err);
      });
  };

  onVoteDownClick = articleId => {
    voteDown(articleId)
      .then(response => {
        this.articles = response.data;
        this.renderArticlesList();
      })
      .catch(err => {
        window.alert(err);
      });
  };
}
