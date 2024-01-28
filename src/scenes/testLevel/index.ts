import { Scene, Tilemaps } from 'phaser';
import { Enemy, Player, SlimeSpawner } from '../../classes';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import config from '../../config';

export class TestScene extends Scene {
  constructor() {
    super('test-scene');
  }
  private player!: Player;
  private enemies: Enemy[] = [];
  private map!: Tilemaps.Tilemap;

  private wallsLayer!: Tilemaps.TilemapLayer;

  addEnemies(newEnemies: Enemy[]) {
    this.physics.add.collider(newEnemies, this.wallsLayer);
    this.physics.add.collider(
      this.player,
      newEnemies,
      (obj1, obj2) => {
        (obj1 as Player).getDamage(0.25);
      },
      undefined,
      this,
    );
    this.enemies = this.enemies.concat(newEnemies);
  }

  createSpawners() {
    const enemiesPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('SlimeSpawner', (obj) => obj.name === 'SlimeSpawner'),
    );
    enemiesPoints.forEach((obj) => {
      const spawner = new SlimeSpawner(this, obj.x, obj.y, '', this.player);
      this.addEnemies(spawner.createEnemies());
    });
  }

  // TODO: Improve this
  create(): void {
    this.map = this.make.tilemap({ key: 'plainsMap' });

    // add the tileset image we are using
    const plainsTileset = this.map.addTilesetImage('plainsTileset', 'plains_tiles');
    const grassTileset = this.map.addTilesetImage('grassTileset', 'grass_tiles');
    const fenceTileset = this.map.addTilesetImage('fencesTileset', 'fences_tiles');

    this.map.createLayer('GrassLayer', grassTileset, 0, 0);
    this.map.createLayer('PathLayer', plainsTileset, 0, 0);
    this.wallsLayer = this.map.createLayer('FenceLayer', fenceTileset, 0, 0);

    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Player
    this.player = new Player(this, 100, 100);

    this.physics.add.collider(this.wallsLayer, this.player);

    this.createSpawners();

    if (config.debug) {
      const debugGraphics = this.add.graphics().setAlpha(0.7);
      this.wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      });
    }

    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  update(): void {
    this.player.update();
    if (config.debug) {
      console.log('FPS: %d', this.game.loop.actualFps);
    }
  }
}
