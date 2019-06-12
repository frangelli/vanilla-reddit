import Header from "./Header";
import ArticlesList from "./ArticlesList";
import LoginForm from "./LoginForm";

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
    this.initUI();
  }

  initUI = () => {
    console.log("-----------------------");
    console.log("INIT UI MAIN APP");
    console.log("-----------------------");
    this.container.innerHTML = this.elementTemplate;
    // Header
    new Header();
    // Articles List
    new ArticlesList();
    // Login Modal
    new LoginForm();
  };
}

const app = new ZenArticles();
