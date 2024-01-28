import { GameObjects, Scene } from 'phaser';

import { Text } from '../../classes/text';
import { EVENTS_NAME, GameStatus } from '../../consts';

enum HeartFrames {
  FULL_HEART = 530,
  HALF_HEART = 531,
  EMPTY_HEART = 532,
}

export class UIScene extends Scene {
  private gameEndPhrase!: Text;
  private hearts!: Text;
  maxHearts = 5;

  private gameEndHandler: (status: GameStatus) => void;

  constructor() {
    super('ui-scene');

    this.gameEndHandler = (status) => {
      console.log('GAME OVER');

      this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
      this.game.scene.pause('test-scene');

      this.gameEndPhrase = new Text(
        this,
        this.game.scale.width / 2,
        this.game.scale.height * 0.4,
        status === GameStatus.LOSE
          ? `YOU DIED!\nCLICK TO RESTART`
          : `YOU ARE ROCK!\nCLICK TO RESTART`,
      )
        .setAlign('center')
        .setColor(status === GameStatus.LOSE ? '#ff0000' : '#ffffff');

      this.gameEndPhrase.setPosition(
        this.game.scale.width / 2 - this.gameEndPhrase.width / 2,
        this.game.scale.height * 0.4,
      );

      this.input.on('pointerdown', () => {
        this.game.events.off(EVENTS_NAME.gameEnd, this.gameEndHandler);
        this.scene.get('test-scene').scene.restart();
        this.scene.restart();

        this.maxHearts = 5;
        this.createHearts();
      });
    };
  }

  create(): void {
    this.initListeners();

    this.createHearts();
    // this.createBeans();
    this.updateLife(this.maxHearts);
    // this.updateBeans(0, false);
  }

  createHearts() {
    this.hearts = new Text(
      this,
      20,
      20,
      '💨'.repeat(this.maxHearts)
    );
  }

  updateLife(life: number) {
    this.hearts.text = '💨'.repeat(life);
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.hpChange, this.updateLife, this);
    // this.game.events.on(EVENTS_NAME.beansChange, this.updateBeans, this);
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
  }
}
