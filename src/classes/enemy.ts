import { Math, Scene } from 'phaser';

import { EVENTS_NAME } from '../consts';
import { Actor } from './actor';
import { Player } from './player';

export class Enemy extends Actor {
  private target: Player;
  private AGRESSOR_RADIUS = 150;
  scale = 1.5;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;

    // ADD TO SCENE
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);

    // EVENTS
    // this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    // this.on('destroy', () => {
    //   this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
    // });
  }

  preUpdate(): void {}
}
