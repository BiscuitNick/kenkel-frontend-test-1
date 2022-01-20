function fetchData(url) {
  return fetch(url) //, fetchOptions)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return {
          error: true,
          status: resp.status,
        };
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

customElements.define(
  "array-credit-lock",
  class extends HTMLElement {
    constructor() {
      self = super();
      self.src = self.getAttribute("src");
      self.showHistory = self.getAttribute("showHistory") || true;
      self.compactItems = Number(self.getAttribute("compactItems") || 4);
      self.showAll = self.getAttribute("showAll") || false;
      self.totalItems = null;

      const template = document.getElementById("mytemplate");
      const templateContent = template.content;
      self
        .attachShadow({ mode: "open" })
        .appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
      const lockHistory = this.shadowRoot.getElementById("lock-history");
      lockHistory.addEventListener("click", this.toggleHistory, false);

      const showAllElement = this.shadowRoot.getElementById("show-all");
      showAllElement.addEventListener("click", this.toggleShowAll, false);

      const src = self.src;
      fetchData(src).then((data) => {
        const totalItems = data.length;
        self.totalItems = totalItems;
        showAllElement.innerText = `Show All (${totalItems})`;

        console.log(data);
      });
    }

    toggleHistory(e) {
      let showHistory = !self.showHistory;
      self.showHistory = showHistory;

      const lockHistory = e.target;
      lockHistory.innerText = showHistory
        ? "Hide lock history"
        : "Show lock history";

      console.log(lockHistory);
      console.log(showHistory);
      console.log(self.totalItems);
    }

    toggleShowAll(e) {
      let showAll = !self.showAll;
      self.showAll = showAll;

      const showAllElement = e.target;
      showAllElement.innerText = showAll
        ? "Show Recent"
        : `Show All (${self.totalItems})`;
    }
  }
);
