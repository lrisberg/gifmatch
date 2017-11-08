import _ from 'lodash';
import {
  SELECT_GIF,
  STOP_WAITING
} from '../actions/actions.js';

function initialGifs() {
  const sourceGifs = [
    'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
    'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
    'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
    'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
    'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
    'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif',
    'https://media.giphy.com/media/l3q2L3yM5UhxEnsvC/giphy.gif',
    'https://media.giphy.com/media/3oz8xDzuVDbKoU4shi/giphy.gif'
  ];
  let doubledGifs = _.concat(sourceGifs, sourceGifs)
  let shuffledGifs = _.shuffle(doubledGifs);
  let groupedGifs = _.chunk(shuffledGifs, 4);
  return groupedGifs;
}

function initialState() {
  return {
    currentGif: null,
    currentKey: null,
    gifs: initialGifs(),
    misses: 0,
    waiting: false,
    tileVisibility: {}
  };
}

export default (state = initialState(), action) => {
  switch (action.type) {
    case SELECT_GIF:
      if (state.waiting) {
        return { ...state };
      }

      const { key, gif, stopWaitingFunc } = action;

      const tileVisibility = { ...state.tileVisibility, [key]: true };

      if (state.currentGif === null) {
        return {
          ...state,
          currentGif: gif,
          currentKey: key,
          tileVisibility: tileVisibility
        }
      }
      else {
        const currentKey = null;
        const currentGif = null;

        let misses = state.misses;
        let waiting = state.waiting;

        if (gif !== state.currentGif) {
          misses += 1;
          waiting = true;
          const copyCurrentKey = state.currentKey;
          setTimeout(() => {
            stopWaitingFunc(key, copyCurrentKey);
          }, 500);
        }

        return {
          ...state,
          misses: misses,
          currentGif: currentGif,
          currentKey: currentKey,
          waiting: waiting,
          tileVisibility: tileVisibility
        };
      }
    case STOP_WAITING:
      const { key1, key2 } = action;

      const tileVisibility2 = {
        ...state.tileVisibility,
        [key1]: false,
        [key2]: false
      };

      return {
        ...state,
        waiting: false,
        tileVisibility: tileVisibility2 }
    default:
      return state
  };
};
