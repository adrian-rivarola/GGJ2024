import { Scene } from 'phaser';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';

    // PLAYER LOADING
    this.load.image('king', 'sprites/king.png');
    this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');

    // MAP LOADING
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/dungeon-16-16.png',
    });
    this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json');

    // CHEST LOADING
    this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.atlas('chest', 'tilemaps/tiles/dungeon-16-16.png', 'spritesheets/chest_atlas.json');

    this.load.atlas('enemy', 'tilemaps/tiles/dungeon-16-16.png', 'spritesheets/enemy_atlas.json');

    // NEW LOADING
    this.load.image('plains_tiles', 'tilemaps/tiles/plains.png');
    this.load.image('fences_tiles', 'tilemaps/tiles/fences.png');
    this.load.image('grass_tiles', 'tilemaps/tiles/grass.png');
    this.load.tilemapTiledJSON('plainsMap', 'tilemaps/json/plainsMap.json');

    // Player assets
    // this.load.image('slimeImg', 'sprites/slime.png');
    this.load.atlas('slimeAtlas', 'sprites/slime.png', 'spritesheets/slime_atlas.json');

    for (let i = 1; i <= 10; i++) {
      this.load.audio(`fart${i - 1}`, `sounds/Fart_${i}.wav`);
    }
    for (let i = 1; i <= 16; i++) {
      this.load.image(`fart${i - 1}`, `sprites/fart/fart-${i}.png`);
    }
  }

  create(): void {
    this.scene.start('test-scene');
    this.scene.start('ui-scene');
  }
}
