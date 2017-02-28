
(function () {

modules = [];
modules.push('bch.test');
modules.push('ui.router');
modules.push('bch.test');
modules.push('ngAnimate');
modules.push('ngSanitize');
modules.push('ui.bootstrap');


modules.push('Collapsible');
angular.module('Collapsible', [])

.controller('CollapsibleCtrl', function () {

  var self = this;
  self.isCollapsed = true;

  self.collapseToggle =  function() {
    self.isCollapsed = !self.isCollapsed;
  };

});

angular.module('bch.test', modules)


.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('init', {
      url: '/',
      templateUrl: 'template/home.html'
    });
})

.run(function ($rootScope,   $state,   $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
})

.controller('AppCtrl', function ($scope, $state) {
    $scope.$on('$stateChangeSuccess', function (event) {
        $scope.appTitle = 'Bch Test';
    });
})

;

}());