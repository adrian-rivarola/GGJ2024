import { Physics } from 'phaser';

export class Fart extends Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    flipX: boolean,
    texture: string = '',
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    this.flipX = flipX;

    scene.add.existing(this);
    this.initAnimations();
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'explosion',
      frames: [
        { key: 'fart0' },
        { key: 'fart1' },
        { key: 'fart2' },
        { key: 'fart3' },
        { key: 'fart4' },
        { key: 'fart5' },
        { key: 'fart6' },
        { key: 'fart7' },
        { key: 'fart8' },
        { key: 'fart9' },
        { key: 'fart10' },
        { key: 'fart11' },
        { key: 'fart12' },
        { key: 'fart13' },
        { key: 'fart14' },
        { key: 'fart15' }
      ],
      frameRate: 10,
      hideOnComplete: true
    });
  }
}
