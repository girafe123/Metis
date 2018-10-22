import { MessageType } from './utils/Enums';

export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';
export function showMessage(text, type = MessageType.Info) {
  return {
    type: SHOW_MESSAGE,
    payload: { text, type },
  };
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE,
  };
}
