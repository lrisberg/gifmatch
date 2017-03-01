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

  let gameStartedAt = null;
  let gameEndedAt = null;

  let missed = 0;
  let seenGifs = [];

  // ---FUNCTIONS--- //

  function showSearch() {
    $('#custom-search').show();
  }

  function hideSearch() {
    $('#custom-search').hide();
  }

  function hideGameScreen() {
    $('#game-screen').hide();
  }

  function showGameScreen() {
    $('#game-screen').show();
  }

  function hideWelcomeScreen() {
    $('#welcome-screen').hide();
  }

  function showPlayAgain() {
    let time = $('#timer').text();
    $('#you-won').text(`You won in ${time} seconds`);
    $('.play-again').show();
  }

  function hidePlayAgain() {
    $('.play-again').hide();
  }

  function hideTimer() {
    $('#timer').hide();
  }

  function showTimer() {
    $('#timer').show();
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
      rows = 2;
      columns = 2;
    }
    else if (difficulty === "medium") {
      rows = 3;
      columns = 4;
    }
    else if (difficulty === "hard") {
      rows = 4;
      columns = 5;
    }
  }

  // -- Timer -- //

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

  // --- INITIALIZATION--- //

  hidePlayAgain();
  hideGameScreen();
  hideSearch();

  // ---EVENTS--- //

  // click on tile, handle events/state
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
          hideTimer();
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

        // add +1 to 'missed'
        if (seenGifs.includes(imgElem.attr('src'))) {
          missed += 1;
        }

        seenGifs.push(imgElem.attr('src'));
        seenGifs.push(currentGifElem.attr('src'));

        console.log('missed =', missed);
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
    else if ($('#user-select option:selected').val() === 'custom') {
      currentTopic = $('#search').val();
    }
    else {
      currentTopic = $('#user-select option:selected').val();
    }
    difficulty = $('#difficulty option:selected').val()

    hideWelcomeScreen();
    showGameScreen();
    updateGridSize();
    createGrid();
    getGifs(shuffleAndRenderGifs);
    startTimer();
  })

  // play again
  $('#play-again-button').click(function(event) {
    event.preventDefault();

    hidePlayAgain();
    showTimer();
    resetGrid();
    getGifs(shuffleAndRenderGifs);
    startTimer();
  })

  $('#user-select').change(function(event) {
    if ($('#user-select').val() === 'custom') {
      showSearch();
    }
    else if ($('#user-select').val() !== 'custom') {
      hideSearch();
    }
  });
})
