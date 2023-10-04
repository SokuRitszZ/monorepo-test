import { Game, GamePluginImpl, GamePlugin } from '@soku-games/core';

@GamePluginImpl('reversi_lit_renderer')
export class Reversi_lit_rendererPlugin extends GamePlugin {
  bindGame(game: Game): void {
  }
}
