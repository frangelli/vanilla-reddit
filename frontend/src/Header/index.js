require("./styles.scss");
export default class Header {
  elementTemplate = `
      <div class="logo">
        <h1>ZA</h1>
      </div>
      <div class="user-info">
        <button id="loginButton">LOG IN</button>
      </div>`;

  constructor() {
    this.container = document.querySelector("#app-header");
    this.initUI();
  }

  initUI = () => {
    console.log("-----------------------");
    console.log("INIT UI HEADER");
    console.log("-----------------------");
    this.container.innerHTML = this.elementTemplate;
  };
}
