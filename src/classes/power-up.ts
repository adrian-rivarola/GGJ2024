import { Scene } from 'phaser';

import { EVENTS_NAME } from '../consts';
import { Actor } from './actor';
import { Player } from './player';

export class PowerUp extends Actor {
  protected target: Player;
  private RESPAWN_TIME = 15000;
  protected animations: Phaser.Types.Animations.Animation[] = [];

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

    this.on('animationcomplete', () => {
      this.scene.time.delayedCall(300, () => {
        this.disableBody(true, true);
      });
    });
  }

  protected overlap(): void {};

  protected initAnimations(): void {
    this.animations.forEach((animation) => {
      this.scene.anims.create(animation);
    });
  }

  protected initOverlap(): void {
    const overlap = this.scene.physics.add.overlap(this.target, this, () => {
      this.scene.physics.world.removeCollider(overlap);
      this.scene.game.events.emit(EVENTS_NAME.powerUpCollected, this.constructor.name);
      this.overlap();

      this.scene.time.delayedCall(this.RESPAWN_TIME, () => {
        this.enableBody(true, this.x, this.y, true, true);
        this.initOverlap();
      });
    });
  }
}
