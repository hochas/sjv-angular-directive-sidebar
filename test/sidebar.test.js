'use strict';

describe('sidebarCtrl', function() {
  beforeEach(module('sjv.sidebar'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.add', function() {
    it('checks that value is 1 when add function runs', function() {
      var $scope = {};
      var controller = $controller('sidebarCtrl', { $scope: $scope });
      $scope.value = 0;
      $scope.add();
      expect($scope.value).toEqual(1);
    });
  });

  describe('$scope.subtract', function() {
    it('checks that value is -1 when subtract function runs', function() {
      var $scope = {};
      var controller = $controller('sidebarCtrl', { $scope: $scope });
      $scope.value = 0;
      $scope.subtract();
      expect($scope.value).toEqual(-1);
    });
  });
});