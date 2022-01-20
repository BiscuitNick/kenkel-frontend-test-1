function fetchData(url) {
  //   var fetchHeaders = new Headers({
  //     Accept: "application/json",
  //   });

  //   var fetchOptions = {
  //     cache: "default",
  //     headers: fetchHeaders,
  //     method: "GET",
  //     mode: "cors",
  //   };

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

class MyEl extends HTMLElement {
  static get observedAttributes() {
    return ["src", "collapsed", "compactItems", "showAll"];
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.innerHtml = "";
      fetchData(newVal).then((data) => {
        console.log("where am i d");
        console.log(attrName);
        console.log(oldVal);
        console.log(newVal);
        console.log(data);

        data.map((x, i) => {
          this.innerHTML += `<div>${
            i +
            "-collapsed" +
            x.type +
            "-" +
            x.provider +
            "-" +
            x.active +
            "-" +
            x.date
          }</div>`;
        });

        // this.innerHTML = <div>{data.map(
        //   (x, i) => <div>{i + "-" + x.type}</div>
        // )}</div>;

        //         this.innerHTML = `<pre>
        // ${JSON.stringify(data, 0, 2)}
        //             </pre>`;
      });
    }
  }
}

// Define our web component
customElements.define("my-el", MyEl);
