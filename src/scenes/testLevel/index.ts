import { Scene, Tilemaps } from 'phaser';
import { BaseNPC, ChespiSpawner, Enemy, Player } from '../../classes';
import { Croto, Guardia, Larissa, Mozart, Panchero } from '../../classes/npcs';
import config from '../../config';
import { EVENTS_NAME } from '../../consts';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';

export class TestScene extends Scene {
  constructor() {
    super('test-scene');
  }
  private player!: Player;
  private enemies: Enemy[] = [];
  private map!: Tilemaps.Tilemap;
  _rotation = 0;

  private wallsLayer!: Tilemaps.TilemapLayer;

  addEnemies(newEnemies: Enemy[]) {
    this.physics.add.collider(newEnemies, this.wallsLayer);
    this.physics.add.collider(newEnemies, newEnemies);
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

  createNPCs() {
    this.map.getObjectLayer('NPC').objects.forEach((obj) => {
      let npc: BaseNPC;

      switch (obj.name) {
        case 'Mozart':
          npc = new Mozart(this, obj.x!, obj.y!, this.player);
          break;
        case 'Croto':
          npc = new Croto(this, obj.x!, obj.y!, this.player);
          break;
        case 'Larissa':
          npc = new Larissa(this, obj.x!, obj.y!, this.player);
          break;
        case 'Guardia':
          npc = new Guardia(this, obj.x!, obj.y!, this.player);
          break;
        case 'Panchero':
          npc = new Panchero(this, obj.x!, obj.y!, this.player);
          break;
        default:
          return;
      }
      this.physics.add.collider(npc, this.player);
    });
  }

  createSpawners() {
    const enemiesPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('ChespiSpawner', (obj) => obj.name === 'ChespiSpawner'),
    );
    enemiesPoints.forEach((obj) => {
      const spawner = new ChespiSpawner(this, obj.x, obj.y, '', this.player);
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
    this.player = new Player(this, 50, 50);
    this.physics.add.collider(this.wallsLayer, this.player);

    // this.createSpawners();
    this.createNPCs();

    if (config.debug) {
      const debugGraphics = this.add.graphics().setAlpha(0.7);
      this.wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      });
    }

    this.game.events.on(EVENTS_NAME.spawnChespies, this.createSpawners, this);

    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(1.8);
  }

  update(): void {
    // this._rotation += 0.0125;
    // this.cameras.main.setRotation(this._rotation);

    this.player.update();
    if (config.debug) {
      console.log('FPS: %d', this.game.loop.actualFps);
    }
  }
}
