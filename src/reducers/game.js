// what is the state?
// state = {
//   misses: 0,
//   waiting: false,
//   gifs: [
//     {
//       gif: 'http://...',
//       visible: false
//     },
//     {
//       gif: 'http://...',
//       visible: false
//     },
//     {
//       gif: 'http://...',
//       visible: false
//     },
//   ]
// }

import _ from 'lodash';

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
    misses: 0,
    gifs: initialGifs(),
    currentGif: null,
    waiting: false,
    currentKey: null
  };
}

export default (state = initialState(), action) => {
  const newState = {};
  switch (action.type) {
    case 'SET_CURRENT_GIF':
      return { ...state, currentGif: action.gif };
    case 'SET_CURRENT_KEY':
      return { ...state, currentKey: action.key };
    case 'SET_WAITING':
      return { ...state, waiting: action.waiting };
    case 'ADD_MISS':
      return { ...state, misses: state.misses + 1 };
    default:
      return state
  };
};
