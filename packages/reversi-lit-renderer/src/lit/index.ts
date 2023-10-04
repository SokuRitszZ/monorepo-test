import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ReversiGame } from "soku-game-reversi";
import './grid';
import { LifeCycle } from "@soku-games/core";

@customElement('reversi-game')
export class ReversiGameElement extends LitElement {
  game?: ReversiGame;
  currentI: number = 0;

  @property({type: Boolean}) control: boolean = false;
  @property({attribute: false}) grid: (0 | 1 | 2)[][] = [];

  connectedCallback() {
    super.connectedCallback();

    this.game?.subscribe(LifeCycle.AFTER_PREPARE, () => {
      this.grid = this.game?.data.grid as any;
    });
    const render = () => {
      this.currentI ^= 1;
      this.grid = [...this.grid];
    }
    this.game?.subscribe(LifeCycle.AFTER_STEP, render);
    this.game?.subscribe(LifeCycle.AFTER_REVERSE_STEP, render);
  }

  handlePutChess(e: any) {
    if (!this.control) {
      return;
    }
    const {x, y} = e.target;
    this.game?.step(`${this.currentI}${x.toString(36)}${y.toString(36)}`);
  }

  render() {
    const { grid } = this.game!.data;
    return html`
      <h1>
        ReversiGame
      </h1>
      <div @put-chess=${this.handlePutChess} class="board">
        ${grid.map((r, i) => (
          r.map((id, j) => (
            html`
              <reversi-grid x="${i}" y="${j}" i="${id as 0 | 1 | 2}"></reversi-grid>
            `
          ))
        ))}
      </div>
    `;
  }

  static styles = css`
    .board {
      width: 640px;
      height: 640px;
      position: relative;
    }
  `;
}