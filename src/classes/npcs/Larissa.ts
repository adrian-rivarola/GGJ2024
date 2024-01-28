import { Scene } from 'phaser';
import { EVENTS_NAME } from '../../consts';
import { BaseNPC } from './BaseNPCc';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';

export class Larissa extends BaseNPC {
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Larissa', player);
  }

  startDialog(): void {
    super.startDialog();
    console.log('Larissa.startDialog()');

    const options: DialogOptions = {
      npc: this,
      message: 'Un baño? ....',
      answers: ['Gracias', '*Farts*'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);
  }
}
