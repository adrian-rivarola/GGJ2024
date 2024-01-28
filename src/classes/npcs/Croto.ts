import { Scene } from 'phaser';
import { EVENTS_NAME } from '../../consts';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';
import { BaseNPC } from './BaseNPCc';

export class Croto extends BaseNPC {
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Croto', player);
  }

  startDialog(): void {
    super.startDialog();

    const options: DialogOptions = {
      npc: this,
      message: 'Un qué?',
      answers: ['Un baño', 'Nada'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);

    this.scene.game.events.once(EVENTS_NAME.dialogEnded, (selectedOption: number) => {
      if (selectedOption == 1) {
        this.scene.time.delayedCall(300, () => {
          this.startDialog();
        });
      }
    });
  }
}
