(function() {

  angular
    .module('gifmatchApp')
    .component('gmMain', {
      controller: 'MainController',
      controllerAs: 'vm',
      templateUrl: '../views/main.html'
    });

})();
