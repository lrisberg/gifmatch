// action types

export const SELECT_GIF = 'SELECT_GIF';
export const STOP_WAITING = 'STOP_WAITING';

// action creators

export function selectGif(key, gif, stopWaitingFunc) {
  return {
    type: SELECT_GIF,
    key,
    gif,
    stopWaitingFunc
  };
}

export function stopWaiting(key1, key2) {
  return {
    type: STOP_WAITING,
    key1,
    key2
  };
}
