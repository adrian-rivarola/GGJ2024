import { Math, Scene } from 'phaser';

import { Actor } from '../actor';
import { EVENTS_NAME } from '../../consts';
import { Player } from '../player';

const NPC_TEXTURES: Record<string, string> = {
  Croto: 'king',
  Mozart: 'king',
  Larissa: 'king',
  Guardia: 'king',
};

export class BaseNPC extends Actor {
  timesTalkedTo: number = 0;
  name: string;
  player: Player;
  scale = 1.5;

  constructor(scene: Scene, x: number, y: number, name: string, player: Player) {
    super(scene, x, y, NPC_TEXTURES[name], '');

    this.name = name;
    this.player = player;

    // PHYSICS MODEL
    this.getBody().setSize(15, 20);
    // this.getBody().setOffset(8, 8);
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

    this.scene.add.text(this.x - 8, this.y + 12, this.name, {
      color: 'black',
      align: 'center',
      fontFamily: 'Times, serif',
      fontSize: '10px',
    });
  }

  startDialog() {
    this.player.disabled = true;
  }

  // initAnimations() {
  //   this.anims.create({
  //     key: 'idle',
  //     frames: this.anims.generateFrameNames('slimeAtlas', {
  //       prefix: 'idle-',
  //       end: 3,
  //     }),
  //     repeat: -1,
  //     frameRate: 8,
  //   });
  //   this.anims.play('idle', true);
  // }

  protected checkFlip(): void {
    this.flipX = this.body.velocity.x < 0;
  }
}
