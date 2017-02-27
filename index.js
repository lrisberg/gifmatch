$(document).ready(function() {
  // ZE RULES
  // Only change state in event handlers.

  // INITIALIZATION //

  $('select').material_select();

  let rows = 3;
  let columns = 4;

  // ---STATE--- //

  let currentGifElem = null;
  let currentTopic = '';
  let canClick = true;
  let difficulty = null;

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
        let gif = $('<img>').attr('src', url).addClass('hidden');
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
      url: `https://api.tenor.co/v1/search?tag=${currentTopic}&limit=50`,
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

  function showTimer() {
    $('#timer').show();
  }

  function hideTimer() {
    $('#timer').hide();
  }

  function hideSelect() {
    $('select').hide();
  }

  function createSearchInput() {
    let div = $('<div>').addClass('input-field col offset-l4 l4');
    $('form').append(div);
    let input = $('<input id="search" type="search" placeholder="Search GIFs">');
    let label = $('<label class="label-icon" for="search">');
    let icon = $('<i class="material-icons">').text('search')
    div.append(input, label, icon)
  }

  // -- Timer -- //
  let gameStartedAt = null;
  let gameEndedAt = null;

  function getCurrentDuration() {
    return new Date().valueOf() - gameStartedAt.valueOf();
  }

  setInterval(() => {
    if (gameStartedAt !== null && gameEndedAt === null) {
      let duration = (getCurrentDuration() / 1000).toFixed(2);
      $('#timer').text(duration);
    }
  }, 100);

  function stopTimer() {
    gameEndedAt = new Date();
  }

  function startTimer() {
    gameStartedAt = new Date();
    gameEndedAt = null;
  }

  function calculateGameTime() {
    return gameEndedAt.valueOf() - gameStartedAt.valueOf();
  }

  function showImages(imgElems) {
    imgElems.forEach(function(imgElem) {
      $(imgElem).removeClass('hidden').addClass('shown');
    })
  }

  function hideImages(imgElems) {
    imgElems.forEach(function(imgElem) {
      $(imgElem).removeClass('shown').addClass('hidden');
    })
  }

  function matchTiles(tiles) {
    tiles.forEach(function(tile) {
      $(tile).addClass('matched');
    })
  }

  function allTilesMatched() {
    return $('.matched').length === (rows * columns);
  }

  function updateGridSize() {
    if (difficulty === "easy") {
      rows = 3;
      columns = 2;
    }
    else if (difficulty === "medium") {
      rows = 4;
      columns = 3;
    }
    else if (difficulty === "hard") {
      rows = 5;
      columns = 4;
    }
  }

  // --- INITIALIZATION--- //

  hidePlayAgain();
  hideTimer();

  // ---EVENTS--- //

  $('#gameboard').click(function(event) {
    if (canClick === false) {
      return;
    }

    let target = $(event.target);
    if (target.hasClass('tile') && !target.hasClass('matched')) {
      let imgElem = target.children('img');
      let imgUrl = imgElem.attr('src');

      if (currentGifElem === null) {
        currentGifElem = imgElem;
        showImages([imgElem]);
      }
      else if (currentGifElem.attr('src') === imgUrl) {
        console.log('Its a match!');
        showImages([imgElem]);
        matchTiles([imgElem.parent(), currentGifElem.parent()]);

        if (allTilesMatched()) {
          console.log('You won!');
          showImages([$('img')]);
          showPlayAgain();
          stopTimer();
          console.log(calculateGameTime());
        }
        else {
          let toHideElem = currentGifElem;
          canClick = false;
          window.setTimeout(function() {
            hideImages([imgElem, toHideElem]);
            canClick = true;
          }, 1000)
        }

        currentGifElem = null;
      }
      else {
        console.log('Not a match');
        showImages([imgElem]);
        let toHideElem = currentGifElem;
        currentGifElem = null;
        canClick = false;
        window.setTimeout(function() {
          canClick = true;
          hideImages([imgElem, toHideElem]);
        }, 1000)
      }
    }
  })

  // AJAX search for GIFs upon search click
  $('#play-button').click(function(event) {
    event.preventDefault();
    if ($('#user-select option:selected').val() === 'random') {
      currentTopic = '';
    }
    else {
      currentTopic = $('#user-select option:selected').val();
    }
    difficulty = $('#difficulty option:selected').val()

    hideWelcomeScreen();
    updateGridSize();
    createGrid();
    getGifs(shuffleAndRenderGifs);
    showTimer();
    startTimer();
  })

  // play again
  $('#play-again-button').click(function(event) {
    event.preventDefault();

    hidePlayAgain();
    resetGrid();
    getGifs(shuffleAndRenderGifs);
    startTimer();
  })
})
