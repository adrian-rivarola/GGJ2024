import { Math, Scene } from 'phaser';
import type { TestScene } from 'src/scenes';

import config from '../config';
import { Actor } from './actor';
import { Enemy } from './enemy';
import { Player } from './player';
import { Chespi } from './chespi';

export class ChespiSpawner extends Actor {
  private target: Player;
  private SPAWN_RADIUS = 20;
  private ACTIVATION_RADIUS = 150;
  private COOL_DOWN_DURATION = 200;
  private coolDownTimer = 0;
  private MIN_SPAWNS = 0;
  private MAX_SPAWNS = 1;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;
    this.alpha = 0;
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (config.debug) {
      const graphic = this.scene.add.graphics();
      graphic.strokeCircle(this.x, this.y, this.ACTIVATION_RADIUS);
    }

    if (
      Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.ACTIVATION_RADIUS &&
      this.coolDownTimer-- <= 0
    ) {
      (this.scene as TestScene).addEnemies(this.createEnemies());
      this.coolDownTimer = this.COOL_DOWN_DURATION;
    }
  }

  createEnemies(): Enemy[] {
    const enemies: Enemy[] = [];
    const newEnemies = Math.Between(this.MIN_SPAWNS, this.MAX_SPAWNS);

    for (let idx = 0; idx < newEnemies; idx++) {
      const x = Math.Between(this.x - this.SPAWN_RADIUS, this.x + this.SPAWN_RADIUS);
      const y = Math.Between(this.y - this.SPAWN_RADIUS, this.y + this.SPAWN_RADIUS);
      const enemy = new Chespi(this.scene, x, y, this.target);
      enemies.push(enemy);
    }
    return enemies;
  }

  public setTarget(target: Player): void {
    this.target = target;
  }
}
