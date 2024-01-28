export enum EVENTS_NAME {
  gameEnd = 'game-end',
  levelUp = 'level-up',
  powerUpCollected = 'power-up-collected',
  attack = 'attack',
  hpChange = 'hp-change',
  beansChange = 'beans-change',
}

export enum GameStatus {
  WIN,
  LOSE,
}

export type UpdateLifeOperation = 'INCREMENT' | 'DECREMENT';
