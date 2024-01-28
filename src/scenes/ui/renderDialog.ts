import { Scene } from 'phaser';
import DialogOptions from '../../interfaces/DialogOptions';
import { EVENTS_NAME } from '../../consts';

export function renderTextBox(scene: Scene, options: DialogOptions) {
  const textpos = {
    x: window.innerWidth * 0.5 - 300,
    y: window.innerHeight - 140,
  };

  let option2: Phaser.GameObjects.Text;

  const option1 = scene.add.text(textpos.x + 80, textpos.y + 50, options.answers[0], {
    color: 'black',
    align: 'center',
    padding: {
      y: 10,
    },
    // fixedHeight: 90,
    fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    fontSize: '20px',
  });
  option1.setDepth(100);

  option1.setInteractive({ useHandCursor: true });
  option1
    .on('pointerover', () => option1.setColor('white'))
    .on('pointerout', () => option1.setColor('black'))
    .on('pointerup', () => {
      scene.game.events.emit(EVENTS_NAME.dialogEnded, 1);
      text.destroy();
      option1.destroy();
      option2?.destroy();
    });

  if (options.answers[1]) {
    option2 = scene.add.text(textpos.x + 80, textpos.y + 80, options.answers[1], {
      color: 'black',
      align: 'center',
      padding: {
        y: 10,
      },
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: '20px',
    });
    option2.setDepth(100);

    option2.setInteractive({ useHandCursor: true });
    option2
      .on('pointerover', () => option2.setColor('white'))
      .on('pointerout', () => option2.setColor('black'))
      .on('pointerup', () => {
        scene.game.events.emit(EVENTS_NAME.dialogEnded, 2);
        text.destroy();
        option1.destroy();
        option2.destroy();
      });
  }

  const message = `${options.npc.name}: ${options.message}`;
  const text = scene.add.text(textpos.x, textpos.y, message, {
    color: 'white',
    align: 'center',
    backgroundColor: 'red',
    padding: {
      y: 20,
      x: 40,
    },
    fixedHeight: 140,
    fixedWidth: 800,
    fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
    fontSize: '26px',
  });

  // setTimeout(() => {
  //   text.destroy();
  // }, 2000);
}
