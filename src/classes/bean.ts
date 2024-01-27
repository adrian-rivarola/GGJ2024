import { Scene } from 'phaser';

import { EVENTS_NAME } from '../consts';
import { Actor } from './actor';
import { Player } from './player';

export class Bean extends Actor {
  private target: Player;
  private RESPAWN_TIME = 15000;

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

    this.initAnimations();
    this.initOverlap();

    this.on('animationcomplete', () => {
      this.scene.time.delayedCall(300, () => {
        this.disableBody(true, true);
      });
    });
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'good',
      frames: this.scene.anims.generateFrameNames('chest', {
        prefix: 'good-',
        end: 4,
      }),
      frameRate: 8,
      hideOnComplete: false,
    });

    this.scene.anims.create({
      key: 'bad',
      frames: this.scene.anims.generateFrameNames('chest', {
        prefix: 'bad-',
        end: 4,
      }),
      frameRate: 8,
      hideOnComplete: false,
    });
  }

  private initOverlap(): void {
    const overlap = this.scene.physics.add.overlap(this.target, this, () => {
      this.scene.physics.world.removeCollider(overlap);
      this.anims.play('bad');
      this.scene.game.events.emit(EVENTS_NAME.beanCollected);

      this.scene.time.delayedCall(this.RESPAWN_TIME, () => {
        this.enableBody(true, this.x, this.y, true, true);
        this.initOverlap();
      });
    });
  }
}
