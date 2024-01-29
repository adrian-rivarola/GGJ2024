import { Scene } from 'phaser';
import { EVENTS_NAME } from '../../consts';
import { BaseNPC } from './BaseNPCc';
import DialogOptions from '../../interfaces/DialogOptions';
import { Player } from '../player';

export class Larissa extends BaseNPC {
  private vanished = false;
  constructor(scene: Scene, x: number, y: number, player: Player) {
    super(scene, x, y, 'Larissa', player);
  }

  startDialog(): void {
    if (this.vanished) {
      return;
    }
    super.startDialog();

    const options: DialogOptions = {
      npc: this,
      message: '... Si, hay un inodoro en la plaza hacia mi izquierda',
      answers: ['Grrrracias', '*Farts*'],
    };
    this.scene.game.events.emit(EVENTS_NAME.dialogStarted, options);

    this.scene.game.events.once(EVENTS_NAME.dialogEnded, (selectedOption: number) => {
      if (selectedOption == 2) {
        this.scene.tweens.add({
          targets: this,
          duration: 1500,
          alpha: 0,
          onComplete: () => {
            this.disableBody();
            this.vanished = true;
          },
        });
      }
    });
  }
}
