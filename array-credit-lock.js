function ParseDate(datestring) {
  let date = datestring.split("T")[0];
  let time = new Date(datestring).toLocaleTimeString();

  return date + " " + time;
}

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
      const showAllElement = this.shadowRoot.getElementById("show-all");
      showAllElement.addEventListener(
        "click",
        () => {
          let showAll = !self.showAll;
          self.showAll = showAll;

          // const showAllElement = e.target;
          showAllElement.innerText = showAll
            ? "Show Fewer"
            : `Show All (${self.totalItems})`;
          this.populateListData();
        },
        false
      );

      const lockHistory = this.shadowRoot.getElementById("lock-history");
      lockHistory.addEventListener(
        "click",
        () => {
          let showHistory = !self.showHistory;
          self.showHistory = showHistory;
          lockHistory.innerText = showHistory
            ? "Hide lock history"
            : "Show lock history";

          showAllElement.style.display = showHistory ? "block" : "none";
          this.populateListData();
        },
        false
      );

      const collapsibles = this.shadowRoot.querySelectorAll(".collapsible");
      for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", () => {
          collapsibles[i].classList.toggle("expanded");
        });
      }

      const src = self.src;
      fetchData(src).then((data) => {
        const totalItems = data.length;
        self.totalItems = totalItems;
        showAllElement.innerText = `Show All (${totalItems})`;

        self.data = data;

        this.populateListData(self);
      });
    }

    populateListData() {
      const lockHistoryList =
        self.shadowRoot.getElementById("lock-history-list");

      lockHistoryList.innerHTML = "";

      const data = self.data;
      const showHistory = self.showHistory;
      const showAll = self.showAll;
      const compactItems = self.compactItems;

      if (showHistory) {
        let total = showAll ? data.length : compactItems;
        for (let i = 0; i < total; i++) {
          let content = data[i];
          let { date, type } = content;
          let statusText = type === "enrollment" ? "Locked" : "Unlocked";

          let li = document.createElement("li");
          li.className = "history-list";
          let span = document.createElement("span");
          span.className = "date";
          span.innerText = ParseDate(date);
          let div = document.createElement("div");
          div.className = "lock-wrapper";
          div.innerHTML = `<svg class="lock-icon" width="12px" height="18px" viewBox="0 0 12 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g id="Credit-Lock" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="2.1-Creditlock-Locked-History-Desktop" transform="translate(-424.000000, -539.000000)" fill="#3E3F42" fill-rule="nonzero">
                          <g id="bureau" transform="translate(167.000000, 190.000000)">
                            <g id="Group" transform="translate(22.000000, 349.820582)">
                              <path d="M245.5,5.79545455 L244.75,5.79545455 L244.75,3.75 C244.75,1.68 243.07,-1.77635684e-14 241,-1.77635684e-14 C238.93,-1.77635684e-14 237.25,1.68 237.25,3.75 L237.25,5.79545455 L236.5,5.79545455 C235.675,5.79545455 235,6.47045455 235,7.29545455 L235,14.7954545 C235,15.6204545 235.675,16.2954545 236.5,16.2954545 L245.5,16.2954545 C246.325,16.2954545 247,15.6204545 247,14.7954545 L247,7.29545455 C247,6.47045455 246.325,5.79545455 245.5,5.79545455 Z M241,12.5454545 C240.175,12.5454545 239.5,11.8704545 239.5,11.0454545 C239.5,10.2204545 240.175,9.54545455 241,9.54545455 C241.825,9.54545455 242.5,10.2204545 242.5,11.0454545 C242.5,11.8704545 241.825,12.5454545 241,12.5454545 Z M243.325,5.79545455 L238.675,5.79545455 L238.675,3.75 C238.675,2.4675 239.7175,1.425 241,1.425 C242.2825,1.425 243.325,2.4675 243.325,3.75 L243.325,5.79545455 Z" id="unlock_icon-copy-8"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>`;
          let lockspan = document.createElement("span");
          lockspan.className = "lock";
          lockspan.innerText = statusText;
          div.appendChild(lockspan);

          lockHistoryList.appendChild(li);
          li.appendChild(span);
          li.appendChild(div);
        }
      }
    }
  }
);
