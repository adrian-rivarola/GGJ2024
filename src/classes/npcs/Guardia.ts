import { Scene } from 'phaser';
import { EVENTS_NAME } from '../../consts';
import { BaseNPC } from './BaseNPCc';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';

export class Guardia extends BaseNPC {
  private done = false;
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Guardia', player);
  }

  startDialog(): void {
    super.startDialog();

    if (this.player.coins < 3) {
      this.requestMoney();
    } else {
      const options: DialogOptions = {
        npc: this,
        message: 'Lo siento, el baño ya está cerrado por hoy',
        answers: ['...'],
      };
      this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);
    }
  }

  requestMoney() {
    const options: DialogOptions = {
      npc: this,
      message: 'Que haces? Cuesta 3 doblones usar NUESTRO inodoro',
      answers: ['Ok'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);

    this.scene.game.events.once(EVENTS_NAME.dialogEnded, (selectedOption: number) => {
      if (!this.done) {
        console.log('Spawining chespies');

        this.scene.game.events.emit(EVENTS_NAME.spawnChespies);
        this.done = true;
      }
    });
  }
}
