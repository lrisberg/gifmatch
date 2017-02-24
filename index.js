$(document).ready(function() {
  // INITIALIZATION //

  const rows = 4;
  const columns = 5;

  let GIFURLs = [];

  // ---STATE--- //

  // ---FUNCTIONS--- //

  function createGrid() {
    for (let i = 0; i < rows; i++) {
      let row = $('<div>').addClass('row tile-row');
      $('#gameboard').append(row);
      for (let j = 0; j < columns; j++) {
        let tile = $('<div>').addClass('col tile');
        row.append(tile);
      }
    }
  }

  function renderGIFs(urls) {
    let tiles = $('.tile');
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      let img = $('<img>').attr('src', urls[i]).attr('height', '150px').attr('width', '150px');
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
