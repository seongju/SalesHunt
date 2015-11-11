angular.module('starter.controllers', [])


.controller('SearchCtrl', function($scope, $state, $rootScope, SearchSvc) {
  $scope.search = SearchSvc.getTerm();
  $scope.submit = function(){
    if ($scope.search.term === '') {
      return;
    }
    SearchSvc.setTerm($scope.search.term);
    $state.go('tab.results');
  };
})

.controller('ResultsCtrl', function($scope,$state, SearchSvc) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.search = SearchSvc.getTerm();
  $scope.items = SearchSvc.all();
  $scope.viewItem = function(item) {
    $state.go('tab.resultsDetail',{searchId: item.Item});
  };
  $scope.remove = function(item) {
    SearchSvc.remove(item);
  };
  $scope.submit = function(){
    if ($scope.search.term === '') {
      return;
    }
    SearchSvc.setTerm($scope.search.term);
    $state.go($state.current, {}, {reload: true});
    //$state.go('tab.results');
  };
  // $scope.clear = function() {
  //   $scope.search = '';
  // };
})

.controller('ResultsDetailCtrl', function($scope, $state, $stateParams, SearchSvc, TrackSvc) {
  $scope.item = SearchSvc.get($stateParams.searchId);
  $scope.trackButton=true;
  $scope.addToList = function(item) {
    TrackSvc.add(item);
    $state.go('tab.results');
  };
})

.controller('TracklistCtrl', function($scope, TrackSvc) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
     $scope.items = TrackSvc.all();
  });

  $scope.items = TrackSvc.all();
  $scope.remove = function(item) {
    TrackSvc.remove(item);
  };
})

.controller('TracklistDetailCtrl', function($scope, $state, $stateParams, TrackSvc) {
  $scope.item = TrackSvc.get($stateParams.itemId);
  $scope.trackButton=false;
  $scope.addToList = function(item) {
    TrackSvc.add(item);
    $state.go('tab.tracklist');
  };
  $scope.remove = function(item) {
    TrackSvc.remove(item);
    $state.go('tab.tracklist');
  };
})



;
