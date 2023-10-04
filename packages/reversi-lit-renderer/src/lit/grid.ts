import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('reversi-grid')
export class GridElement extends LitElement {
  @property({type: Number}) x: number = -1;
  @property({type: Number}) y: number = -1;
  @property({type: Number}) i: 0 | 1 | 2 = 2;

  static styles = css`
    button {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: .5s;
    }
    button:hover {
      transform: scale(1.2);
    }
    div {
      width: 80px;
      height: 80px;
      box-sizing: border-box;
      padding: 5px;
      position: absolute;
      cursor: pointer;
      background-color: #070;
      border: 1px solid #111;
    }
    div:hover {
      background-color: #0a0;
    }
    .black {
      background-color: #222;
    }
    .white {
      background-color: #ddd;
    }
  `;

  handleClick() {
    const event = new Event('put-chess', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    const [posX, posY] = [
      this.x * 80,
      this.y * 80,
    ];
    return html`
      <div style="left: ${posX}px; top: ${posY}px" class="chess" @click=${this.handleClick}>
        ${this.i === 2 ? '' : html`
          <button class="${!this.i ? 'black' : 'white'}"></button>
        `}
      </div>
    `;
  }
}