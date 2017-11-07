// action types

export const ADD_MISS = 'ADD_MISS';
export const SET_CURRENT_GIF = 'SET_CURRENT_GIF';
export const SET_CURRENT_KEY = 'SET_CURRENT_KEY';
export const SET_WAITING = 'SET_WAITING';
export const SET_TILE_VISIBILITY = 'SET_TILE_VISIBILITY';

// action creators

export function addMiss() {
  return {
    type: ADD_MISS
  }
}

// export function setCurrentGif(gif) {
//   return {
//     type: SET_CURRENT_GIF,
//     currentGif:
//   }
// }