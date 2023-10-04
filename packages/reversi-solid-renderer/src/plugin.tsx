/** @jsx createComponent */
import { GamePluginImpl, GamePlugin, LifeCycle } from '@soku-games/core';
import { ReversiGame } from 'soku-game-reversi';
import { render, createComponent } from 'solid-js/web';
import { App } from './main';

@GamePluginImpl('reversi_solid_renderer')
export class Reversi_solid_rendererPlugin extends GamePlugin {
  bindGame(
    game: ReversiGame,
    extra?: {
      el: string;
    }
  ): void {
    game.subscribe(LifeCycle.AFTER_PREPARE, () => {
      const element = document.querySelector(extra?.el ?? '#reversi-game');

      if (element) {
        render(() => <App />, element);
      }
    });
  }
}
