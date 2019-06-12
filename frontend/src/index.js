import Header from "./Header";
import ArticlesList from "./ArticlesList";
import LoginForm from "./LoginForm";
import ArticleForm from "./ArticleForm";

require("./styles/main.scss");
class ZenArticles {
  // initial component template
  elementTemplate = `
  <div id="main">
    <header id="app-header"></header>
    <section id="content" class="container"></section>
  </div>
  `;

  constructor() {
    this.container = document.body;
    this.setupUI();
  }

  setupUI = () => {
    this.container.innerHTML = this.elementTemplate;
    // Header
    new Header();
    // Articles List
    new ArticlesList();
    // Login Modal
    new LoginForm();
    // Article Modal
    new ArticleForm();
  };
}

const app = new ZenArticles();
