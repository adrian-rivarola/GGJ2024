export enum EVENTS_NAME {
  gameEnd = 'game-end',
  levelUp = 'level-up',
  powerUpCollected = 'power-up-collected',
  attack = 'attack',
  hpChange = 'hp-change',
  beansChange = 'beans-change',
  dialogAction = 'dialog-action',
  dialogStarted = 'dialog-started',
  dialogEnded = 'dialog-ended',
}

export enum GameStatus {
  WIN,
  LOSE,
}

export type UpdateLifeOperation = 'INCREMENT' | 'DECREMENT';
