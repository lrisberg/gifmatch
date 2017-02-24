$(document).ready(function() {
  // INITIALIZATION //

  const rows = 4;
  const columns = 5;

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

  // CREATION //
  createGrid(rows, columns);

  // EVENTS //

  $('button').click(function(event) {
    event.preventDefault();
    console.log('You clicked the button');
    let userSearch = $('#search').val();
    console.log(userSearch);

  })


})
