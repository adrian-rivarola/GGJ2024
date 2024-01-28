import { Scene } from 'phaser';
import { EVENTS_NAME } from '../../consts';
import { BaseNPC } from './BaseNPCc';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';

export class Guardia extends BaseNPC {
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Guardia', player);
  }

  startDialog(): void {
    super.startDialog();

    const options: DialogOptions = {
      npc: this,
      message: 'Soy un guardia',
      answers: ['[Opcion 1]', '[Opcion 2]'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);

    this.scene.game.events.once(EVENTS_NAME.dialogEnded, (selectedOption: number) => {
      this.scene.game.events.emit(EVENTS_NAME.spawnChespies);
    });
    // onEnd: Empiezen a aparecer monedas
  }
}
