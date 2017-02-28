
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


.controller('AppCtrl', function ($scope) {
  $scope.appTitle = 'Bch Test';
})

;

}());