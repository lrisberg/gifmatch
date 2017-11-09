// action types

export const SET_TILE_VISIBILITY = 'SET_TILE_VISIBILITY';
export const SET_CURRENT_GIF = 'SET_CURRENT_GIF';
export const SET_CURRENT_KEY = 'SET_CURRENT_KEY';
export const SET_WAITING = 'SET_WAITING';
export const ADD_MISS = 'ADD_MISS';
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE';

// action creators

export function selectGif(key, gif) {
  return function thunk(dispatch, getState) {

    if (getState().waiting) {
      return;
    }

    dispatch(setTileVisibility(key, true));

    if (getState().currentGif === null) {
      dispatch(setCurrentGif(gif));
      dispatch(setCurrentKey(key));
    }
    else {
      const currentKeyCopy = getState().currentKey;
      const currentGifCopy = getState().currentGif;
      dispatch(setCurrentGif(null));
      dispatch(setCurrentKey(null));
      if (gif !== currentGifCopy) {
        dispatch(addMiss());
        dispatch(setWaiting(true));
        setTimeout(() => {
          dispatch(setWaiting(false));
          dispatch(setTileVisibility(key, false));
          dispatch(setTileVisibility(currentKeyCopy, false));
        }, 500)
      }
    }
  }
}

export function setTileVisibility(key, isVisible) {
  return {
    type: SET_TILE_VISIBILITY,
    key,
    isVisible
  }
}

export function setCurrentGif(gif) {
  return {
    type: SET_CURRENT_GIF,
    gif
  }
}

export function setCurrentKey(key) {
  return {
    type: SET_CURRENT_KEY,
    key
  }
}

export function addMiss() {
  return {
    type: ADD_MISS
  }
}

export function setWaiting(waiting) {
  return {
    type: SET_WAITING,
    waiting
  }
}

export function setBoardSize(gifs) {
  console.log('inside setBoardSize action');
  return {
    type: SET_BOARD_SIZE,
    gifs
  }
}
