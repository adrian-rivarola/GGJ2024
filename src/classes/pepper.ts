import { Scene } from 'phaser';

import { Player } from './player';
import { PowerUp } from './power-up';

export class Pepper extends PowerUp {
  protected animations = [
    {
      key: 'good',
      frames: this.scene.anims.generateFrameNames('chest', {
        prefix: 'good-',
        end: 4,
      }),
      frameRate: 8,
      hideOnComplete: false,
    },
    {
      key: 'bad',
      frames: this.scene.anims.generateFrameNames('chest', {
        prefix: 'bad-',
        end: 4,
      }),
      frameRate: 8,
      hideOnComplete: false,
    }
  ];

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, target, frame);
    this.initAnimations();
    this.initOverlap();
  }

  protected overlap(): void {
    this.anims.play('bad');
  }
}
