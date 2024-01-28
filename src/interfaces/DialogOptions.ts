import { BaseNPC } from '../classes/npcs';

interface DialogOptions {
  npc: BaseNPC;
  message: string;
  answers: string[];
}

export default DialogOptions;
