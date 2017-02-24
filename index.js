$(document).ready(function() {
  // INITIALIZATION //

  const rows = 4;
  const columns = 5;

  let GIFURLs = [];

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

  function renderGIFs(imgurls) {
    let availableTiles = $('.unfilled'); // .tile plus .unfilled?
    console.log(availableTiles);
    for (let i = 0; i < availableTiles.length; i++) {
      let gif = imgurls[getRandomInt(0, imgurls.length)];
      let tile = availableTiles[getRandomInt(0, availableTiles.length)];


      let img = $('<img>').attr('src', imgurls[i]).attr('height', '150px').attr('width', '150px'); // .addClass('hidden');
      $(tile).append(img);
    }
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
          GIFURLs.push(gif.media[0].gif.url);
        }
        renderGIFs(GIFURLs);
      }
    })
  })
})
