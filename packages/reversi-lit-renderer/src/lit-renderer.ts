import { Game, GamePluginImpl, GamePlugin, LifeCycle } from '@soku-games/core';
import { ReversiGame } from 'soku-game-reversi'
import './lit';
import { ReversiGameElement } from './lit';

@GamePluginImpl('reversi_lit_renderer')
export class ReversiLitRenderer extends GamePlugin {
  bindGame(
    game: ReversiGame, 
    extra?: {
      el: string;
      control?: boolean;
    }
  ): void {
    game.subscribe(LifeCycle.AFTER_PREPARE, () => {
      const element = document.querySelector(extra?.el || '#reversi-game');
      if (element) {
        // FIXME The type of the element
        const gameElement: any = document.createElement('reversi-game');
        Object.assign(gameElement, {
          game,
          control: extra?.control ?? false,
        });
        element.append(gameElement);
      }
    });
  }
}
