import { Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';

export class TestScene extends Scene {
  constructor() {
    super('test-scene');
  }
  private player!: Player;
  private wallsLayer!: Tilemaps.TilemapLayer;

  preload(): void {
    this.load.baseURL = 'assets/';

    // MAP LOADING
    this.load.image('plains_tiles', 'tilemaps/tiles/plains.png');
    this.load.image('fences_tiles', 'tilemaps/tiles/fences.png');
    this.load.image('grass_tiles', 'tilemaps/tiles/grass.png');
    this.load.tilemapTiledJSON('plainsMap', 'tilemaps/json/plainsMap.json');
  }

  // TODO: Improve this
  create(): void {
    const map = this.make.tilemap({ key: 'plainsMap' });

    // add the tileset image we are using
    const plainsTileset = map.addTilesetImage('plainsTileset', 'plains_tiles');
    const grassTileset = map.addTilesetImage('grassTileset', 'grass_tiles');
    const fenceTileset = map.addTilesetImage('fencesTileset', 'fences_tiles');

    map.createLayer('GrassLayer', grassTileset, 0, 0);
    map.createLayer('PathLayer', plainsTileset, 0, 0);
    this.wallsLayer = map.createLayer('FenceLayer', fenceTileset, 0, 0);

    this.wallsLayer.setCollisionByProperty({ collides: true });

    // Player
    this.player = new Player(this, 100, 100);
    this.physics.add.collider(this.wallsLayer, this.player);

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  update(): void {
    this.player.update();
  }
}
