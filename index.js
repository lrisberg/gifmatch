$(document).ready(function() {
  // INITIALIZATION //

  const rows = 4;
  const columns = 5;

  let GIFURLs = [];

  // STATE //

  // FUNCTIONS //

  function createGrid(rows, columns) {
    for (let i = 0; i < rows; i++) {
      let row = $('<div>').addClass('row tile-row');
      $('#gameboard').append(row);
      for (let j = 0; j < columns; j++) {
        let tile = $('<div>').addClass('col tile').text('GIF');
        row.append(tile);
      }
    }
  }

  function renderGIFs(urls) {
    let tiles = $('.tile');
    for (let tile of tiles) {
      let img = $('<img>').attr('hello');
      console.log(img);
    }
  }



  // CREATION //
  createGrid(rows, columns);

  // EVENTS //



  $('button').click(function(event) {
    event.preventDefault();
    let userSearch = $('#search').val();
    if (userSearch === '') {
      console.log('You didn\'t enter anything');
    }
    console.log(userSearch);
    $.ajax({
      method: 'GET',
      url: `https://api.tenor.co/v1/search?tag=${userSearch}`,
      dataType: 'json',
      success: function(data) {
        for (let gif of data.results) {
          GIFURLs.push(gif.media[0].gif.url);
          //let gifImg = $('<img>').attr('src', gifGif.url);

        }
        renderGIFs(GIFURLs);
        console.log(GIFURLs);
      }
    })


  })


})
