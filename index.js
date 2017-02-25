$(document).ready(function() {
  // INITIALIZATION //

  const rows = 4;
  const columns = 5;

  let gifUrls = [];

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

  function renderGIFs(imgUrls) {
    let availableTiles = $('.unfilled'); // .tile plus .unfilled?
    for (let i = 0; i < availableTiles.length; i++) {
      let randGIFIndex = getRandomInt(0, imgUrls.length - 1);
      let gif = $('<img>').attr('src', imgUrls[randGIFIndex]).attr('height', '150px').attr('width', '150px'); // .addClass('hidden');
      let randTileIndex = getRandomInt(0, availableTiles.length - 1);
      let tile = availableTiles[randTileIndex];
      $(tile).append(gif);
      $(tile).removeClass('unfilled');
      imgUrls.splice(randGIFIndex, 1);
      let secondRandTileIndex = getRandomInt(0, availableTiles.length - 1);
      let secondTile = availableTiles[secondRandTileIndex];
      $(secondTile).append(gif);
      $(secondTile).removeClass('unfilled');
    }
  }

  function renderGifs2(shuffledURLs) {
    let availableTiles = $('.unfilled'); // .tile plus .unfilled?
    for (let url of shuffledURLs) {
      let firstTile = pickRandomUnfilledTile();
      let gif = $('<img>').attr('src', url).attr('height', '150px').attr('width', '150px'); // .addClass('hidden');
      $(firstTile).append(gif);
      $(firstTile).removeClass('unfilled');
    }
  }

  function pickRandomUnfilledTile() {
    let tileIndex = getRandomInt(0, $('.unfilled').length - 1);
    let tile = $('.unfilled')[tileIndex];

    return tile;
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
        for (let gif of data.results) {
          gifUrls.push(gif.media[0].gif.url);
        }
        renderGifs2(gifUrls);
      }
    })
  })
})
