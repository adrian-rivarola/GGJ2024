import { Game, GameObjects, Scene } from 'phaser';

import { EVENTS_NAME, GameStatus, UpdateLifeOperation } from '../../consts';
import { Level, LevelOperations } from '../../classes/score';
import { Text } from '../../classes/text';
import { gameConfig } from '../../';
import { Player } from 'src/classes/player';

enum HeartFrames {
  FULL_HEART = 530,
  HALF_HEART = 531,
  EMPTY_HEART = 532,
}

export class UIScene extends Scene {
  private level!: Level;
  private gameEndPhrase!: Text;
  private hearts: GameObjects.Sprite[] = [];
  private beans: GameObjects.Sprite[] = [];
  maxHearts = 3;
  maxBeans = 5;

  private gameEndHandler: (status: GameStatus) => void;

  constructor() {
    super('ui-scene');

    this.gameEndHandler = (status) => {
      console.log('GAME OVER');

      this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)');
      this.game.scene.pause('level-1-scene');

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
        this.scene.get('level-1-scene').scene.restart();
        this.scene.restart();

        this.maxHearts = 3;
        this.createHearts();
        this.createBeans();
      });
    };
  }

  create(): void {
    this.level = new Level(this, 20, 20, 0);
    this.initListeners();

    this.createHearts();
    this.createBeans();
    this.updateLife(this.maxHearts * 2);
    this.updateBeans(0);
  }

  createHearts() {
    this.hearts.map((el) => el.destroy());
    this.hearts = [];

    for (let i = 0; i < this.maxHearts; i++) {
      this.hearts.push(this.add.sprite(20 + 32 * (i + 1), 100, 'tiles_spr').setScale(2));
    }
  }

  createBeans() {
    this.beans.map((el) => el.destroy());
    this.beans = [];

    for (let i = 0; i < this.maxBeans; i++) {
      this.beans.push(this.add.sprite(20 + 32 * (i + 1), 200, 'tiles_spr').setScale(2));
    }
  }

  updateBeans(beans: number) {
    let maxH = this.maxBeans;
    for (let i = 0; i < beans / 2; i++) {
      this.beans[i].setFrame(HeartFrames.FULL_HEART);
      maxH = i;
    }
    if (beans % 2 !== 0) {
      this.beans[maxH].setFrame(HeartFrames.HALF_HEART);
    }
    for (let i = Math.ceil(beans / 2); i < maxH; i++) {
      this.beans[i].setFrame(HeartFrames.EMPTY_HEART);
    }
  }

  updateLife(life: number) {
    if (life / 2 > this.maxHearts) {
      this.maxHearts = Math.ceil(life / 2);
      this.createHearts();
    }
    let maxH = this.maxHearts;
    for (let i = 0; i < life / 2; i++) {
      this.hearts[i].setFrame(HeartFrames.FULL_HEART);
      maxH = i;
    }
    if (life % 2 !== 0) {
      this.hearts[maxH].setFrame(HeartFrames.HALF_HEART);
    }
    for (let i = maxH + 1; i < this.hearts.length; i++) {
      this.hearts[i].setFrame(HeartFrames.EMPTY_HEART);
    }
  }

  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.hpChange, this.updateLife, this);
    this.game.events.on(EVENTS_NAME.beansChange, this.updateBeans, this);
    this.game.events.once(EVENTS_NAME.gameEnd, this.gameEndHandler, this);
  }
}
