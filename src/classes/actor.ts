import { Physics } from 'phaser';

export class Actor extends Physics.Arcade.Sprite {
  protected hp = 5;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string = '',
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody().setCollideWorldBounds(true);
  }

  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.7,
      onStart: () => {
        if (value) {
          // this.tint = 0xff3333;
          this.hp = this.hp - value;
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  public getHPValue(): number {
    return this.hp;
  }

  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
