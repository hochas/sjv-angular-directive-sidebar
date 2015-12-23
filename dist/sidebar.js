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

.controller('sidebarCtrl', ['$scope', function($scope) {
  $scope.value = 0;

  $scope.add = function () {
    $scope.value++;
  };

  $scope.subtract = function() {
    $scope.value--;
  };
}]);
