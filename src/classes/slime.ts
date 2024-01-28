import { Math as PhaserMath, Scene } from 'phaser';

import config from '../config';
import { Enemy } from './enemy';
import { Player } from './player';

enum SlimeState {
  IDLE,
  WAIT,
  MOVE,
  FOLLOW,
}

export class Slime extends Enemy {
  constructor(scene: Scene, x: number, y: number, texture: string, target: Player) {
    const attackHandler = () => {
      const yDiff = Math.abs(this.y - this.target.y);
      if (yDiff >= 24) {
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
    super(scene, x, y, target, attackHandler);

    // this.target = target;
    this.scale = 1.5;
    this.state = SlimeState.IDLE;

    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(8, 8);

    // ANIMATIONS
    this.initAnimations();
  }

  initAnimations() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('slimeAtlas', {
        prefix: 'idle-',
        end: 3,
      }),
      repeat: -1,
      frameRate: 8,
    });

    this.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNames('slimeAtlas', {
        prefix: 'walk-',
        end: 5,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: 'dead',
      frames: this.scene.anims.generateFrameNames('slimeAtlas', {
        prefix: 'dead-',
        end: 4,
      }),
      frameRate: 8,
    });

    this.anims.play('idle', true);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    this.isNearPlayer();

    if (this.state === SlimeState.IDLE) {
      const randomDir = PhaserMath.RandomXY(new PhaserMath.Vector2(0, 0), 60);

      this.getBody().setVelocity(randomDir.x, randomDir.y);
      this.checkFlip();

      this.play('walk');
      this.state = SlimeState.MOVE;

      this.on('animationcomplete', () => {
        this.state = SlimeState.WAIT;
        this.getBody().setVelocity(0, 0);
        this.play('idle');

        this.scene.time.delayedCall(4000, () => {
          this.state = SlimeState.IDLE;
        });
      });
    }
  }

  isNearPlayer() {
    if (
      PhaserMath.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.AGRESSION_RADIUS
    ) {
      this.getBody().setVelocityX((this.target.x - this.x) * 0.5);
      this.getBody().setVelocityY((this.target.y - this.y) * 0.5);
      this.checkFlip();
      this.play('walk', true);
      this.state = SlimeState.FOLLOW;
    } else if (this.state === SlimeState.FOLLOW) {
      this.play('idle', true);
      this.state = SlimeState.IDLE;
    }
  }

  protected checkFlip(): void {
    this.flipX = this.body.velocity.x < 0;
  }

  public setTarget(target: Player): void {
    this.target = target;
  }
}
