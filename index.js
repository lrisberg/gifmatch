$(document).ready(function() {
  // INITIALIZATION //

  const rows = 3;
  const columns = 4;

  // ---STATE--- //

  let currentGif = '';

  // ---FUNCTIONS--- //

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function createGrid() {
    for (let i = 0; i < rows; i++) {
      let row = $('<div>').addClass('tile-row');
      $('#gameboard').append(row);
      for (let j = 0; j < columns; j++) {
        let tile = $('<div>').addClass('tile unfilled');
        row.append(tile);
      }
    }
  }

  function renderGifs(shuffledURLs) {
    let availableTiles = $('.unfilled');
    for (let url of shuffledURLs) {
      let firstTile = pickRandomUnfilledTile();
      let firstGif = $('<img>').attr('src', url).attr('height', '150px').attr('width', '150px').addClass('hidden');
      $(firstTile).append(firstGif);
      $(firstTile).removeClass('unfilled');
      let secondTile = pickRandomUnfilledTile();
      let secondGif = $('<img>').attr('src', url).attr('height', '150px').attr('width', '150px').addClass('hidden');
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

  function hideWelcomeScreen() {
    $('#welcome-screen').hide();
  }

  // ---EVENTS--- //


  // 1. click the first tile. Show the image and set the currentGif to that Gif.
  // 2. click another tile. Show that img. If that img === currentGif, log 'It's a match!' and apply the class 'matched' to both images.
  // 3. Reset the currentGif to ''.

  $('#gameboard').click(function(event) {
    let target = event.target;
    if ($(target).hasClass('tile')) {
      let imgElem = ($(target).children('img'));
      let imgUrl = ($(target).children('img').attr('src'));
      if (currentGif === '') {
        currentGif = imgElem;
        console.log('currentGif =', currentGif);
        imgElem.removeClass('hidden').addClass('shown');
      }
      else if (currentGif.attr('src') === imgUrl) {
        console.log('Its a match!');
        imgElem.removeClass('hidden').addClass('shown');
        currentGif = '';
      }
      else if (currentGif.attr('src') !== imgUrl) {
        console.log('Not a match');
        imgElem.removeClass('hidden').addClass('shown');
        window.setTimeout(function() {
          imgElem.removeClass('shown').addClass('hidden');
          $(currentGif).removeClass('shown').addClass('hidden');
          currentGif = '';
        }, 1500)
      }
    }
  })


    // if ($(target).is('img')) {
    //   let currentGif = $(target).attr('src');
    //   console.log('currentGif =', currentGif);
    //   $(target).toggleClass('hidden');
    // }
  //   if ($(target).hasClass('tile')) {
  //     let img = ($(target).children('img'));
  //     if (currentGif === '') {
  //       currentGif = $(target).children('img').attr('src');
  //       console.log('currentGif =', currentGif);
  //       img.toggleClass('hidden');
  //     }
  //     else if (img.attr('src') === currentGif) {
  //       console.log('That\'s a match!');
  //       img.toggleClass('hidden');
  //     }
  //   }
  // })

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
        hideWelcomeScreen();
        createGrid();
        renderGifs(shuffledGifUrls);
      }
    })
  })
})
