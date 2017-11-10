import { getGifs } from '../utils/utils';

import {
  SET_TILE_VISIBILITY,
  SET_CURRENT_GIF,
  SET_CURRENT_KEY,
  SET_WAITING,
  ADD_MISS,
  RESET_TILE_VISIBILITY,
  SET_GIFS,
  RESET_MISSES
} from '../actions/actions.js';

function initialState() {
  return {
    currentGif: null,
    currentKey: null,
    gifs: getGifs('medium'),
    misses: 0,
    waiting: false,
    tileVisibility: {}
  };
}

export default (state = initialState(), action) => {
  switch (action.type) {
    case SET_TILE_VISIBILITY:
      const { key, isVisible } = action;

      const tileVisibility = {
        ...state.tileVisibility,
        [key]: isVisible,
      }

      return {
        ...state,
        tileVisibility: tileVisibility
      }
    case SET_CURRENT_GIF:
      return {
        ...state,
        currentGif: action.gif
      }
    case SET_CURRENT_KEY:
      return {
        ...state,
        currentKey: action.key
      }
    case ADD_MISS:
      return {
        ...state,
        misses: state.misses + 1
      }
    case SET_WAITING:
      return {
        ...state,
        waiting: action.waiting
      }
    case RESET_TILE_VISIBILITY:
      return {
        ...state,
        tileVisibility: {}
      }
    case SET_GIFS:
      return {
        ...state,
        gifs: action.gifs
      }
    case RESET_MISSES:
      return {
        ...state,
        misses: 0
      }
    default:
      return state
  };
};
