import { getGifs } from '../utils/utils';

// action types

export const SET_TILE_VISIBILITY = 'SET_TILE_VISIBILITY';
export const SET_CURRENT_GIF = 'SET_CURRENT_GIF';
export const SET_CURRENT_KEY = 'SET_CURRENT_KEY';
export const SET_WAITING = 'SET_WAITING';
export const ADD_MISS = 'ADD_MISS';
export const RESET_TILE_VISIBILITY = 'RESET_TILE_VISIBILITY';
export const SET_GIFS = 'SET_GIFS';
export const RESET_MISSES = 'RESET_MISSES';

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

export function startNewGame(boardSize) {
  return function thunk(dispatch) {
    const gifs = getGifs(boardSize);
    dispatch(setCurrentGif(null));
    dispatch(setCurrentKey(null));
    dispatch(setWaiting(false));
    dispatch(resetMisses());
    dispatch(resetTileVisibility());
    dispatch(setGifs(gifs));
  }
}

export function resetMisses() {
  return {
    type: RESET_MISSES
  }
}

export function resetTileVisibility() {
  return {
    type: RESET_TILE_VISIBILITY
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

export function setGifs(gifs) {
  return {
    type: SET_GIFS,
    gifs
  }
}
