import { Game, Scale, Types, WEBGL } from 'phaser';

import { Intro, Level1, TestScene, UIScene } from './scenes';
import { LoadingScene } from './scenes/loading';

import config from './config';

type GameConfigExtended = Types.Core.GameConfig & {
  winScore: number;
};

export const gameConfig: GameConfigExtended = {
  title: 'Phaser game tutorial',
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#000',
  scale: {
    mode: Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: config.debug,
      debugShowBody: config.debug,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, Intro, TestScene, UIScene],
  winScore: 40,
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);

      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
      );
    }, 100);
  }
};

window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);
