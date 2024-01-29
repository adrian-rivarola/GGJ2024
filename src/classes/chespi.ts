import { Math as PhaserMath, Scene } from 'phaser';

import { Enemy } from './enemy';
import { Player } from './player';

export class Chespi extends Enemy {
  constructor(scene: Scene, x: number, y: number, target: Player) {
    const attackHandler = () => {
      console.log('chespi.attackHandler()');

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
          this.target.width * 1.25
      ) {
        this.disableBody(true, false);
        this.target.onEnemyKilled();

        // try {
        this.scene.tweens.add({
          targets: this,
          duration: 100,
          repeat: 1,
          delay: 500,
          alpha: 0,
          onComplete: () => {
            this.destroy();
          },
        });
        // } catch (err) {
        //   console.error(err);
        // }
      }
    };
    super(scene, x, y, target, '', attackHandler);

    // this.target = target;
    this.scale = 1.5;

    // PHYSICS MODEL
    this.getBody().setSize(15, 20);
    this.getBody().setOffset(-2, 0);

    this.initAnimations();
  }

  private initAnimations(): void {
    const frames = this.scene.anims.generateFrameNames('chespi_atlas', {
      prefix: 'sprite',
      start: 1,
      end: 4,
    });

    this.scene.anims.create({
      key: 'idle',
      frames,
      repeat: -1,
      frameRate: 8,
    });
    this.anims.play('idle');
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
