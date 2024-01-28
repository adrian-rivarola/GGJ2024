import { Scene } from 'phaser';
import { EVENTS_NAME } from '../../consts';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';
import { BaseNPC } from './BaseNPCc';

export class Mozart extends BaseNPC {
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Mozart', player);
  }

  startDialog(): void {
    super.startDialog();

    const options: DialogOptions = {
      npc: this,
      message: "I'm Mozart",
      answers: ['???'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);
  }
}
