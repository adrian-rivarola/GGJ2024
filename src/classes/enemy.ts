import { Math as PhaserMath, Scene } from 'phaser';

import { EVENTS_NAME } from '../consts';
import { Actor } from './actor';
import { Player } from './player';

export class Enemy extends Actor {
  protected target: Player;
  protected AGRESSION_RADIUS = 150;
  protected attackHandler: Function;
  scale = 1.5;

  constructor(scene: Scene, x: number, y: number, target: Player, attackHandler: Function) {
    super(scene, x, y);
    this.target = target;
    this.attackHandler = attackHandler;

    // ADD TO SCENE
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);

    // EVENTS
    this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
    this.on('destroy', () => {
      this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
    });
  }

  // preUpdate(): void {
  // if (
  //   Math.Distance.BetweenPoints(
  //     { x: this.x, y: this.y },
  //     { x: this.target.x, y: this.target.y },
  //   ) < this.AGRESSOR_RADIUS
  // ) {
  //   this.getBody().setVelocityX(this.target.x - this.x);
  //   this.getBody().setVelocityY(this.target.y - this.y);
  //   this.checkFlip();
  // } else {
  //   this.getBody().setVelocity(0);
  // }
  // }

  protected checkFlip(): void {
    this.flipX = this.body.velocity.x < 0;
  }

  public setTarget(target: Player): void {
    this.target = target;
  }
}
