import { Scene } from 'phaser';
import { EVENTS_NAME, GameStatus } from '../../consts';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';
import { BaseNPC } from './BaseNPCc';

export class Panchero extends BaseNPC {
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Panchero', player);
  }

  startDialog(): void {
    super.startDialog();

    const options: DialogOptions = {
      npc: this,
      message: "I'm Panchero Cobra",
      answers: ['Aceptar pancho', 'Rechazar pancho'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);

    this.scene.game.events.once(EVENTS_NAME.dialogEnded, (selectedOption: number) => {
      if (selectedOption == 1) {
        this.scene.time.delayedCall(500, () => {
          this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
        });
      }
    });
  }
}
