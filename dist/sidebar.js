'use strict';

angular.module('sjv.sidebar', [])

.directive('sidebar', function () {
  return {
    restrict: 'AE',
    templateUrl: 'sidebar.html',
    controller: 'sidebarCtrl',
    replace: true
  };
})

.controller('sidebarCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.filters = {
    freetext: { 
      visible: false,
      placeholder: ''
    },
    toggles: false
  };

  $http.get('assets/sidebar.json').then(function(res) {
    configureSidebar(res.data);
  });

  function configureSidebar(config) {
    $scope.filters.freetext.visible = config.filters.freetext;
    if (config.filters.freetext) {
      $scope.filters.freetext.placeholder = config.options.freetextPlaceholder;
    }
    $scope.filters.toggles = config.filters.toggles;
  }
}]);
