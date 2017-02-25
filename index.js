$(document).ready(function() {
  // INITIALIZATION //

  const rows = 4;
  const columns = 5;

  // ---STATE--- //

  // ---FUNCTIONS--- //

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function createGrid() {
    for (let i = 0; i < rows; i++) {
      let row = $('<div>').addClass('row tile-row');
      $('#gameboard').append(row);
      for (let j = 0; j < columns; j++) {
        let tile = $('<div>').addClass('col tile unfilled');
        row.append(tile);
      }
    }
  }

  // Until there are no tiles left:
  // 1. pick random GIF
  // 2. pick a random tile, append the GIF to the tile
  // 3. remove that tile from the pool of available tiles
  // 4. pick another random tile, append the same GIF to the tile
  // 5. remove that tile from the pool of available tiles
  // 6. repeat

  function renderGifs(shuffledURLs) {
    let availableTiles = $('.unfilled'); // .tile plus .unfilled?
    for (let url of shuffledURLs) {
      let firstTile = pickRandomUnfilledTile();
      let firstGif = $('<img>').attr('src', url).attr('height', '150px').attr('width', '150px'); // .addClass('hidden');
      $(firstTile).append(firstGif);
      $(firstTile).removeClass('unfilled');
      let secondTile = pickRandomUnfilledTile();
      let secondGif = $('<img>').attr('src', url).attr('height', '150px').attr('width', '150px'); // .addClass('hidden');
      $(secondTile).append(secondGif);
      $(secondTile).removeClass('unfilled');
    }
  }

  function pickRandomUnfilledTile() {
    let tileIndex = getRandomInt(0, $('.unfilled').length - 1);
    let tile = $('.unfilled')[tileIndex];

    return tile;
  }

  function shuffleArray(arr) {
    let newArr = [];
    for (let item of arr) {
      let randIndex = getRandomInt(0, arr.length);
      newArr.splice(randIndex, 0, item)
    }

    return newArr;
  }

  // ---CREATION--- //
  createGrid();

  // ---EVENTS--- //

  // toggle hide/show on tile/img click
  $('#gameboard').click(function(event) {
    let target = event.target;
    if ($(target).is('img')) {
      $(target).toggleClass('hidden');
    }
    if ($(target).hasClass('tile')) {
      let img = ($(target).children('img'));
      img.toggleClass('hidden');
    }
  })

  // AJAX search for GIFs upon search click
  $('button').click(function(event) {
    event.preventDefault();
    let userSearch = $('#search').val();
    if (userSearch === '') {
      console.log('You didn\'t enter anything');
    }
    $.ajax({
      method: 'GET',
      url: `https://api.tenor.co/v1/search?tag=${userSearch}`,
      dataType: 'json',
      success: function(data) {
        let gifUrls = [];
        for (let gif of data.results) {
          gifUrls.push(gif.media[0].gif.url);
        }
        let shuffledGifUrls = shuffleArray(gifUrls);
        renderGifs(shuffledGifUrls);
      }
    })
  })
})
