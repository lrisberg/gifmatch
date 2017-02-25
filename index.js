$(document).ready(function() {
  // ZE RULES
  // Only change state in event handlers.

  // INITIALIZATION //

  const rows = 2;
  const columns = 2;

  // ---STATE--- //

  let currentGifElem = null;
  let currentTopic = '';

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

  function pickRandomUnfilledTile() {
    return $('.unfilled')[getRandomInt(0, $('.unfilled').length - 1)];
  }

  function renderGifs(shuffledURLs) {
    for (let url of shuffledURLs) {
      for (let i = 0; i < 2; i++) {
        let tile = pickRandomUnfilledTile();
        let gif = $('<img>').attr('src', url).attr('height', '150px').attr('width', '150px').addClass('hidden');
        $(tile).append(gif).removeClass('unfilled');
      }
    }
  }

  function shuffleArray(arr) {
    let newArr = [];
    for (let item of arr) {
      let randIndex = getRandomInt(0, newArr.length);
      newArr.splice(randIndex, 0, item)
    }

    return newArr;
  }

  function hideWelcomeScreen() {
    $('#welcome-screen').hide();
  }

  function showPlayAgain() {
    $('.play-again').show();
  }

  function hidePlayAgain() {
    $('.play-again').hide();
  }

  function shuffleAndRenderGifs(gifUrls) {
    renderGifs(shuffleArray(gifUrls));
  }

  function resetGrid() {
    $('.tile').removeClass('matched').removeClass('hidden').removeClass('shown').addClass('unfilled');
    $('img').remove();
  }

  function getGifs(onSuccess) {
    $.ajax({
      method: 'GET',
      url: `https://api.tenor.co/v1/search?tag=${currentTopic}`,
      dataType: 'json',
      success: function(data) {
        let gifUrls = [];
        for (let gif of data.results) {
          gifUrls.push(gif.media[0].gif.url);
        }
        onSuccess(gifUrls);
      }
    });
  }

  // --- INITIALIZATION--- //

  hidePlayAgain();

  // ---EVENTS--- //

  function showImages(imgElem) {
    $(imgElem).removeClass('hidden').addClass('shown');
  }

  function hideImages(imgElem) {
    $(imgElem).removeClass('shown').addClass('hidden');
  }

  function matchTile(tile) {
    $(tile).addClass('matched');
  }

  function allTilesMatched() {
    return $('.matched').length === (rows * columns);
  }

  $('#gameboard').click(function(event) {
    let target = event.target;
    if ($(target).hasClass('tile') && !$(target).hasClass('matched')) {
      let imgElem = $(target).children('img');
      let imgUrl = imgElem.attr('src');

      if (currentGifElem === null) {
        currentGifElem = imgElem;
        showImages(imgElem);
      }
      else if (currentGifElem.attr('src') === imgUrl) {
        console.log('Its a match!');
        showImages(imgElem);
        matchTile($(imgElem).parent());
        matchTile($(currentGifElem).parent());

        if (allTilesMatched()) {
          console.log('You won!');
          showImages($('img'));
          showPlayAgain();
        }
        else {
          let toHideElem = currentGifElem;
          window.setTimeout(function() {
            hideImages(imgElem);
            hideImages(toHideElem);
          }, 1000)
        }

        currentGifElem = null;
      }
      else {
        console.log('Not a match');
        showImages(imgElem);
        let toHideElem = currentGifElem;
        currentGifElem = null;
        window.setTimeout(function() {
          hideImages(imgElem);
          hideImages(toHideElem);
        }, 1000)
      }
    }
  })

  // AJAX search for GIFs upon search click
  $('#play-button').click(function(event) {
    event.preventDefault();

    currentTopic = $('#search').val();
    if (currentTopic === '') {
      console.log('You didn\'t enter anything');
    }

    hideWelcomeScreen();
    createGrid();
    getGifs(shuffleAndRenderGifs);
  })

  // play again
  $('#play-again-button').click(function(event) {
    event.preventDefault();

    hidePlayAgain();
    resetGrid();
    getGifs(shuffleAndRenderGifs);
  })
})
