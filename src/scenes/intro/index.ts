import { Scene } from 'phaser';

export class Intro extends Scene {
  private images: string[] = ['intro-1', 'intro-2', 'intro-3', 'intro-4'];
  private currentImage!: Phaser.GameObjects.Image;

  constructor() {
    super('intro-scene');
  }
  
  create(): void {
    this.setImage('intro');
    this.input.on('pointerdown', () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0)
    })
  
    this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      if (this.images.length > 0) {
        this.setImage(this.images[0])
      } else {
        this.scene.start('test-scene');
        this.scene.start('ui-scene');
      }
    })
  }

  setImage(texture: string): void {
    if (this.currentImage) {
      this.currentImage.destroy();
    }

    this.currentImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, texture);
    const scaleX = this.cameras.main.width / this.currentImage.width;
    const scaleY = this.cameras.main.height / this.currentImage.height;
    const scale = Math.min(scaleX, scaleY);
    this.currentImage.setScale(scale).setScrollFactor(0);

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.images.shift();
  }
}
