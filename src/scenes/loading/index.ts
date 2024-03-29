import { Scene } from 'phaser';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';

    // PLAYER LOADING
    this.load.image('intro-1', 'tilemaps/tiles/dungeon-16-16.png');
    this.load.image('intro-2', 'sprites/char.png');
    this.load.image('intro-3', 'sprites/npcs/Chespi.png');
    this.load.image('intro-4', 'sprites/npcs/Croto.png');
    this.load.image('king', 'sprites/king.png');
    this.load.image('char', 'sprites/char.png');
    this.load.image('chespi', 'sprites/npcs/Chespi.png');
    this.load.image('croto', 'sprites/npcs/Croto.png');
    this.load.image('edgar', 'sprites/npcs/Edgar.png');
    this.load.image('guardia', 'sprites/npcs/Guardia.png');
    this.load.image('larissa', 'sprites/npcs/Larissa.png');
    this.load.image('morzadella', 'sprites/npcs/Morzadella.png');
    this.load.image('pancho_cobra', 'sprites/npcs/PanchoCobra.png');

    this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');
    this.load.atlas('chespi_atlas', 'sprites/chespi.png', 'spritesheets/chespi_atlas.json');
    this.load.atlas(
      'char_walk_atlas',
      'sprites/char_walking.png',
      'spritesheets/char_walk_atlas.json',
    );
    this.load.atlas('char_idle_atlas', 'sprites/char.png', 'spritesheets/char_idle_atlas.json');
    this.load.atlas('char_dash_atlas', 'sprites/fartdash.png', 'spritesheets/char_dash_atlas.json');
    this.load.atlas(
      'char_attack_atlas',
      'sprites/attack.png',
      'spritesheets/char_attack_atlas.json',
    );

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

    this.load.audio('pickupCoin', 'sounds/pickupCoin.wav');
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
