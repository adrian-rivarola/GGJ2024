export enum EVENTS_NAME {
  gameEnd = 'game-end',
  levelUp = 'level-up',
  beanCollected = 'bean-collected',
  attack = 'attack',
  hpChange = 'hp-change',
  beansChange = 'beans-change',
}

export enum GameStatus {
  WIN,
  LOSE,
}

export type UpdateLifeOperation = 'INCREMENT' | 'DECREMENT';
