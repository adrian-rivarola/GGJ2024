import { Input, Scene } from 'phaser';

import { EVENTS_NAME, GameStatus } from '../consts';
import { Actor } from './actor';
import { Fart } from './fart';

export class Player extends Actor {
  private keyW: Input.Keyboard.Key;
  private keyA: Input.Keyboard.Key;
  private keyS: Input.Keyboard.Key;
  private keyD: Input.Keyboard.Key;
  private keySpace: Input.Keyboard.Key;
  private keyShift: Input.Keyboard.Key;
  // private hpText!: Text;
  private maxHitsPerAttack = 2;
  private enemiesHit = 0;
  private maxHP = 5;
  private dash = false;
  private pepper = false;
  private coins = 0;
  private maxCoins = 3;
  private hpInterval!: NodeJS.Timeout;
  // private powerUpCollectedHandler: (type: string) => void;
  disabled = false;
  scale = 1.5;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'king');

    // KEYS
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');
    this.keyShift = this.scene.input.keyboard.addKey(16);
    this.keySpace = this.scene.input.keyboard.addKey(32);

    const keyZ = this.scene.input.keyboard.addKey('Z');

    keyZ.on('down', (event: KeyboardEvent) => {
      this.scene.game.events.emit(EVENTS_NAME.dialogAction, this);
    });

    this.keyShift.on('down', (event: KeyboardEvent) => {
      this.fart();
      // this.anims.play('dash', true);
      this.dash = true;
      this.body.checkCollision.none = true;

      setTimeout(() => {
        this.dash = false;
        this.body.checkCollision.none = false;
      }, 500)

      // this.on('animationcomplete', () => {
      //   this.dash = false;
      //   this.body.checkCollision.none = false;
      // });
    });

    this.keySpace.on('down', (event: KeyboardEvent) => {
      this.enemiesHit = 0;
      this.fart();
      // this.anims.play('attack', true);
      this.scene.game.events.emit(EVENTS_NAME.attack);
    });

    // PHYSICS
    this.getBody().setSize(15, 20);
    // this.getBody().setOffset(8, 0);

    // EVENTS
    this.initListeners();

    // ANIMATIONS
    // this.initAnimations();
    this.setDepth(10);

    this.hpInterval = setInterval(() => {
      if (this.hp < this.maxHP) {
        this.hp++;
        this.updateHp(0);
      }
      if (Date.now() % 5 == 0) {
        this.fart();
      }
    }, 2000);

    this.on('destroy', () => {
      this.keySpace.removeAllListeners();
    });
  }

  get canAttack(): boolean {
    return this.enemiesHit < Math.floor(this.maxHitsPerAttack);
  }

  updateHp(value: number) {
    if (this.hp > 0) {
      this.scene?.game.events.emit(EVENTS_NAME.hpChange, this.hp + value);
    }
  }

  onEnemyKilled() {
    this.getCoin();
    this.enemiesHit++;

    if (this.enemiesHit < 2) {
      // this.scene.sound.add('hitHurt').play();
      this.scene.cameras.main.shake(50, new Phaser.Math.Vector2(0.005, 0.0));
    }
  }

  update(): void {
    this.getBody().setVelocity(0);
    if (this.disabled) {
      return;
    }

    const movement = 110 * (this.dash ? 3 : 1);

    if (this.keyW?.isDown) {
      this.body.velocity.y = -movement;
      // !this.anims.isPlaying && this.anims.play('run', true);
    }

    if (this.keyA?.isDown) {
      this.body.velocity.x = -movement;
      this.checkFlip();
      // this.getBody().setOffset(30, 15);
      // !this.anims.isPlaying && this.anims.play('run', true);
    }

    if (this.keyS?.isDown) {
      this.body.velocity.y = movement;
      // !this.anims.isPlaying && this.anims.play('run', true);
    }

    if (this.keyD?.isDown) {
      this.body.velocity.x = movement;
      this.checkFlip();
      // this.getBody().setOffset(15, 15);
      // !this.anims.isPlaying && this.anims.play('run', true);
    }
  }

  private getCoin(): void {
    if (this.coins < this.maxCoins && Math.floor(Math.random() * 10) <= 3) {
      this.coins++;
      this.scene.sound.add('pickupCoin').play();
      this.scene?.game.events.emit(EVENTS_NAME.coinChange, this.coins);
    }
  }

  private fart(): void {
    this.getDamage(1);
    this.scene.sound.add(`fart${Math.floor(Math.random() * 10)}`).play();
    const x = this.x + (!this.flipX ? -this.body.width : this.body.width);
    new Fart(this.scene, x, this.y, !this.flipX).anims.play('explosion', true);
  }

  private initAnimations(): void {
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNames('a-king', {
        prefix: 'run-',
        end: 7,
      }),
      frameRate: 8,
    });

    this.scene.anims.create({
      key: 'dash',
      frames: this.scene.anims.generateFrameNames('a-king', {
        prefix: 'attack-',
        end: 2,
      }),
      frameRate: 8,
    });

    this.scene.anims.create({
      key: 'attack',
      frames: this.scene.anims.generateFrameNames('a-king', {
        prefix: 'attack-',
        end: 2,
      }),
      frameRate: 8,
    });
  }

  private initListeners() {
    // this.scene.game.events.on(EVENTS_NAME.powerUpCollected, this.powerUpCollectedHandler);
    this.scene.game.events.on(EVENTS_NAME.dialogEnded, () => {
      this.disabled = false;
    });
  }

  public getDamage(value?: number): void {
    if (!value || this.dash) return;

    super.getDamage(value);

    if (this.hp <= 0) {
      clearInterval(this.hpInterval);
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
    }

    this.updateHp(-value);
    this.scene.time.delayedCall(100, () => this.clearTint());
  }
}
