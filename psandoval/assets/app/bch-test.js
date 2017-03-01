
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
  self.collapLabel ="Abrir";

  self.collapseToggle =  function() {
    self.isCollapsed = !self.isCollapsed;
    if(self.isCollapsed)
      self.collapLabel = "Abrir";
    else
      self.collapLabel = "Cerrar";
  };

});


modules.push('panels');
angular.module('panels', modules)
.directive('panelCollapsible', function() {
   return {
       templateUrl: 'template/panel-collapsible.html'
   }
});

modules.push('bannerList');
angular.module('bannerList', [])
.controller('bannerListCtrl', function ($scope, $http) {

    var self = this;
    self.list = [];

    $http.get('resource/list.json')
    .then(function(res){
      self.list = res.data;
    });


})

.controller('bannerResumeCtrl', function ($scope, $http) {

    var self = this;
    self.list = [];

    $http.get('resource/resume.json')
    .then(function(res){
      self.list = res.data;
    });


});;

modules.push('inputTable');
angular.module('inputTable', [])
.controller('inputTableCtrl', function ($scope, $http, $filter) {

    var self = this;


    self.defaultPlaceholder = "Seleccione...";

    self.fs = {};
    self.fs.select1Opts = [{"val": 1, "desc": "Opción 1"}];
    self.fs.general_search = '';

    self.maxSize = 5;
    self.filteredItems = [];
    self.itemsPerPage = 5;
    self.pagedItems = [];
    self.currentPage = 0;
    self.totalItems = 0;
    self.totalItemsFiltered = 0.
    self.items = [];

    $http.get('resource/table.json')
    .then(function(res){
      self.items = res.data;
      self.totalItems = self.items.length;
      self.search();
    });


    /*
    $scope.$watch('currentPage', function(newValue, oldValue, scope) {
        console.log('search');
    }, objectEquality);
    */

    self.pageChanged = function() {
      self.pageData();
    };

    var strainer = function (haystack, needle) {
        if (!needle) {
            return true;
        }

        if(haystack === parseInt(haystack, 10))
          return haystack.toString().indexOf(needle) !== -1;
        else
          return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    self.search = function () {

        self.filteredItems = $filter('filter')(self.items, function (item) {
            for(var col in item) {
                if (strainer(item[col], self.fs.general_search)) {
                    return true;
                }
            }
            return false;
        });

        self.currentPage = 0;
        self.totalItemsFiltered = self.filteredItems.length;
        self.pageData();

        console.log('search');
    };

    self.pageData = function () {

        page = self.currentPage - 1;
        if(page < 0)
          page = 0;

        rangeFrom = page * self.itemsPerPage;
        rangeTo   = (page + 1 ) * self.itemsPerPage;

        self.pagedItems = self.filteredItems.slice(
          rangeFrom,
          rangeTo
        );

        //console.log(rangeFrom, rangeTo, self.itemsPerPage, page, self.pagedItems);
    };
})

;

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