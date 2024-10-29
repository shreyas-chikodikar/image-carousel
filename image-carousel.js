import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js";

class ImageCarousel extends LitElement {
  static get styles() {
    return css`
      .mainDiv {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .back:before {
        content: "\u276E";
        font-size: 1.5rem;
      }
      .front:before {
        content: "\u276F";
        font-size: 1.5rem;
      }
      .direction-button {
        height: var(--carousel-button-size);
        width: var(--carousel-button-size);
        vertical-align: middle;
        border-radius: 50%;
        border: solid 1px grey;
        cursor: pointer;
        background: white;
        margin: 1vmin;
      }
      #paginator {
        margin: 1vmin;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .page {
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
        cursor: pointer;
        margin: 0.1rem;
        padding: 0;
        background: none;
      }
      .active {
        background: black;
      }
      .inactive {
        background: none;
      }
      #imgDiv {
        width: 90%;
      }
      img {
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      images: { type: Array },
      index: { type: Number },
    };
  }

  constructor() {
    super();
    this.images = [];
    this.index = 0;
    addEventListener("DOMContentLoaded", () => {
      this.autoPlay();
    });
  }

  render() {
    return html`<div class="mainDiv">
        ${this.addButton("back")}
        <div id="imgDiv">${this.addImages()}</div>
        ${this.addButton("front")}
      </div>
      <div id="paginator">${this.addPaginator()}</div>`;
  }

  addImages() {
    return html`<img id="img${this.index + 1}" src="${
      this.images[this.index]
    }"></img>`;
  }

  addButton(direction) {
    return html`<button
      @click="${this._change}"
      class="direction-button ${direction}"
    ></button>`;
  }

  _change(e) {
    if (e.currentTarget.className.includes("back")) {
      this.index != 0 ? this.index-- : this.index;
    } else {
      this.index < this.images.length - 1 ? this.index++ : this.index;
    }
  }

  addPaginator() {
    return html`${this.images.map(
      (image, idx) =>
        html`<button
          class="page ${idx == this.index ? "active" : "inactive"}"
          @click="${this._loadPage}"
          id="${idx}"
        ></button>`
    )}`;
  }

  autoPlay() {
    const source = this.shadowRoot.getElementById("imgDiv");

    var intervalId = setInterval(this.setBehavior.bind(this), 2000);

    source.addEventListener("mouseover", function () {
      if (intervalId) clearInterval(intervalId);
    });

    const self = this;
    source.addEventListener("mouseout", function () {
      intervalId = setInterval(
        function () {
          self.setBehavior();
        }.bind(this),
        2000
      );
    });
  }

  setBehavior() {
    if (this.index == this.images.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }

  _loadPage(e) {
    this.index = e.srcElement.id;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  firstUpdated() {
    super.firstUpdated();
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
  }

  update(changedProperties) {
    super.update(changedProperties);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
  }
}

customElements.define("image-carousel", ImageCarousel);
