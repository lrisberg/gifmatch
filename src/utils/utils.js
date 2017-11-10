import _ from 'lodash';

export function getGifs(boardSize) {
  let sourceGifs;
  if (boardSize === 'medium') {
    sourceGifs = [
      'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
      'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
      'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
      'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
      'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
      'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif',
      'https://media.giphy.com/media/l3q2L3yM5UhxEnsvC/giphy.gif',
      'https://media.giphy.com/media/3oz8xDzuVDbKoU4shi/giphy.gif'
    ];
  }
  else if (boardSize === 'small') {
    sourceGifs = [
      'https://media.giphy.com/media/d1FL4zXfIQZMWFQQ/giphy.gif',
      'https://media.giphy.com/media/l3q2Fa0XM2SEciHaU/giphy.gif',
      'https://media.giphy.com/media/26xBy4g1eHS1vqZRS/giphy.gif',
      'https://media.giphy.com/media/l3vRjYearYzgNb7e8/giphy.gif',
      'https://media.giphy.com/media/l3q2yYNt8DXoyKRdm/giphy.gif',
      'https://media.giphy.com/media/l3q2y9WQRuooRmyfS/giphy.gif'
    ];
  }
  let doubledGifs = _.concat(sourceGifs, sourceGifs)
  let shuffledGifs = _.shuffle(doubledGifs);
  let groupedGifs = _.chunk(shuffledGifs, 4);
  return groupedGifs;
}
