import { Math, Scene } from 'phaser';

import { Actor } from '../actor';
import { EVENTS_NAME } from '../../consts';
import { Player } from '../player';

const NPC_TEXTURES: Record<string, string> = {
  Croto: 'king',
  Mozart: 'king',
  Larissa: 'king',
};

export class BaseNPC extends Actor {
  timesTalkedTo: number = 0;
  name: string;
  player: Player;

  constructor(scene: Scene, x: number, y: number, name: string, player: Player) {
    super(scene, x, y, NPC_TEXTURES[name], '');

    this.name = name;
    this.player = player;

    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(8, 8);
    this.body.immovable = true;

    // ANIMATIONS
    // this.initAnimations();

    this.scene.game.events.on(
      EVENTS_NAME.dialogAction,
      (player: Player) => {
        const distance = Math.Distance.BetweenPoints(player.body.position, this.body.position);
        if (distance <= 50) {
          this.timesTalkedTo++;
          this.startDialog();
        }
      },
      this,
    );
  }

  startDialog() {
    this.player.disabled = true;
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

    this.anims.play('idle', true);
  }

  // isNearPlayer() {
  //   if (
  //     PhaserMath.Distance.BetweenPoints(
  //       { x: this.x, y: this.y },
  //       { x: this.target.x, y: this.target.y },
  //     ) < this.AGRESSION_RADIUS
  //   ) {
  //     this.getBody().setVelocityX((this.target.x - this.x) * 0.5);
  //     this.getBody().setVelocityY((this.target.y - this.y) * 0.5);
  //     this.checkFlip();
  //     this.play('walk', true);
  //     this.state = SlimeState.FOLLOW;
  //   } else if (this.state === SlimeState.FOLLOW) {
  //     this.play('idle', true);
  //     this.state = SlimeState.IDLE;
  //   }
  // }

  protected checkFlip(): void {
    this.flipX = this.body.velocity.x < 0;
  }
}
