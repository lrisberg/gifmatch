(function() {

  angular
    .module('gifmatchApp')
    .controller('MainController', MainController)

    function MainController() {
      var vm = this;

      let imgUrl = 'https://media.tenor.co/images/3fa2bbcd2ed33a3ace817ac6e33264d5/tenor.gif';
      vm.images = [
        [imgUrl, imgUrl, imgUrl, imgUrl],
        [imgUrl, imgUrl, imgUrl, imgUrl],
        [imgUrl, imgUrl, imgUrl, imgUrl],
      ];
    }

})();
