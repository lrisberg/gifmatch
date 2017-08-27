(function() {

  angular
    .module('gifmatchApp')

    .component('gmMain', {
      controller: 'MainController',
      controllerAs: 'vm',
      templateUrl: '../views/main.html'
    })

    .component('gmGif', {
      bindings: {
        gif: '<',
        gmClick: '&'
      },
      controller: 'GifController',
      controllerAs: 'vm',
      templateUrl: '../views/gif.html'
    });

})();
