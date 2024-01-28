import { Math as PhaserMath, Scene } from 'phaser';

import { Enemy } from './enemy';
import { Player } from './player';

export class Chespi extends Enemy {
  constructor(scene: Scene, x: number, y: number, texture: string, target: Player) {
    const attackHandler = () => {
      const yDiff = Math.abs(this.y - this.target.y);
      if (yDiff >= 32) {
        return;
      }

      if (
        this.target.canAttack &&
        PhaserMath.Distance.BetweenPoints(
          { x: this.x, y: this.y },
          { x: this.target.x, y: this.target.y },
        ) <
          this.target.width * 0.75
      ) {
        this.disableBody(true, false);
        this.target.onEnemyKilled();

        this.anims.play('dead');

        try {
          this.scene.tweens.add({
            targets: this,
            duration: 600,
            repeat: 1,
            delay: 500,
            onComplete: () => {
              this.setAlpha(0);
              this.destroy();
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    };
    super(scene, x, y, target, texture, attackHandler);

    // this.target = target;
    this.scale = 1.5;

    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(8, 8);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (
      PhaserMath.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.AGRESSION_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
      this.checkFlip();
    } else {
      this.getBody().setVelocity(0);
    }
  }

  protected checkFlip(): void {
    this.flipX = this.body.velocity.x < 0;
  }

  public setTarget(target: Player): void {
    this.target = target;
  }
}
