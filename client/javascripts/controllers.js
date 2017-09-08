(function() {

  angular
    .module('gifmatchApp')
    .controller('MainController', MainController)
    .controller('GifController', GifController)

    function pick6(gifs) {
      let selectedGifs = [];
      while (selectedGifs.length < 6) {
        let randomIndex = Math.floor(Math.random() * (gifs.length));
        if (selectedGifs.includes(gifs[randomIndex])) {
          continue;
        }
        else {
          selectedGifs.push(gifs[randomIndex]);
        }
      }
      return selectedGifs;
    }

    function makeRandomPairs(subset) {
      let duplicatedGifs = [];
      for (let i = 0; i < 2; i++) {
        for (let gif of subset) {
          let randomIndex = Math.floor(Math.random() * (duplicatedGifs.length));
          duplicatedGifs.splice(randomIndex, 0, angular.copy(gif));
        }
      }
      return duplicatedGifs;
    }

    function griddify(gifsToShow) {
      return [
        [ gifsToShow[0], gifsToShow[1], gifsToShow[2], gifsToShow[3] ],
        [ gifsToShow[4], gifsToShow[5], gifsToShow[6], gifsToShow[7] ],
        [ gifsToShow[8], gifsToShow[9], gifsToShow[10], gifsToShow[11] ]
      ]
    }

    function makeGifsFromUrls(urls) {
      let gifs = [];
      for (let url of urls) {
        let gif = {
          url: url,
          visible: false,
          matched: false
        }
        gifs.push(gif)
      }
      return gifs;
    }

    function MainController() {
      var vm = this;

      let gifUrls = ['https://media.tenor.co/images/c4ddaade7b4f2498abf4ac124073c8ae/tenor.gif', 'https://media.tenor.co/images/a7051e31e1633d00a277e72ecef1d550/tenor.gif', 'https://media.tenor.co/images/afbc61d033fa7488107e1cc667893b11/tenor.gif', 'https://media.tenor.co/images/28914c3f5b751bbaf24da3121bc1375b/tenor.gif', 'https://media.tenor.co/images/067ce00fb8fac1831af4ecbdec600ba6/tenor.gif', 'https://media.tenor.co/images/4bf02d0ab25493e338248c084f0efb61/tenor.gif', 'https://media.tenor.co/images/42185f13c396d9dd217bfd1afcc0d021/tenor.gif', 'https://media.tenor.co/images/659bd2d2faf926550b27e4b61b9efebc/tenor.gif', 'https://media.tenor.co/images/a4a5bd805e6532c766a5bbdd3b0e5c07/tenor.gif', 'https://media.tenor.co/images/aa0478e5e16d0293e0952520903b0161/tenor.gif'];

      let gifs = makeGifsFromUrls(gifUrls);
      let subset = pick6(gifs); // [1, 2, 3]
      let subsetWithDupes = makeRandomPairs(subset); // [2, 3, 2, 1, 1, 3]
      let gridOfGifs = griddify(subsetWithDupes); // [[:4], [:4], [:4]]

      vm.images = gridOfGifs;

      vm.lastSelected = null;

      vm.selectGif = function(gif) {
        gif.visible = true;

        if (vm.lastSelected === null) {
          vm.lastSelected = gif;
        }
        else {
          if (vm.lastSelected.url === gif.url) {
            console.log('a match');
            gif.visible = false;
            vm.lastSelected.visible = false;
            gif.matched = true;
            vm.lastSelected.matched = true;
            vm.lastSelected = null;
          }
          else {
            console.log('not a match');
            gif.visible = false;
            vm.lastSelected.visible = false;
            vm.lastSelected = null;
          }
        }
      }
    }

    function GifController() {
      let vm = this;

      // from binding
      // vm.gif

      vm.toggleGif = function() {
        vm.gmClick();
      }
    }

    //cheater
    //cheater
    //pumpkin

})();
