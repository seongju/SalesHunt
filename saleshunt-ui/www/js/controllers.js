angular.module('starter.controllers', [])


.controller('SearchCtrl', function($scope, $state, $rootScope, SearchSvc) {
  $scope.search = SearchSvc.getTerm();
  $scope.submit = function(){
    if ($scope.search.term === '') {
      return;
    }
    SearchSvc.setTerm($scope.search.term, {});
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

  $scope.sortOptions = [
    {
      id: 0,
      name: 'Relevance (Defualt)'
    },
    {
      id: 1,
      name: "Price: Low to High"
    },
    {
      id: 2,
      name: "Price: High to Low"
    }
  ];
  $scope.sort = $scope.sortOptions[0];
  $scope.sortItems = function(sort) {
    $scope.sort = sort;
    SearchSvc.sortItems(sort);
  };
  $scope.viewItem = function(item) {
    $state.go('tab.resultsDetail',{searchId: item.ASIN[0]});
  };
  $scope.remove = function(item) {
    SearchSvc.remove(item);
  };
  $scope.getPic = function(item) {
    if(item.hasOwnProperty('MediumImage')) {
      return item.MediumImage[0].URL[0];
    }
    else {
      return item.ImageSets[0].ImageSet[0].MediumImage[0].URL[0];
    }
  };
  $scope.submit = function(){
    if ($scope.search.term === '') {
      return;
    }
    SearchSvc.setTerm($scope.search.term, $scope.sort);
    $state.go($state.current, {}, {reload: true});
    //$state.go('tab.results');
  };
  // $scope.clear = function() {
  //   $scope.search = '';
  // };
})

.controller('ResultsDetailCtrl', function($scope, $state, $stateParams, $ionicPopup, SearchSvc, TrackSvc) {
  var Ctrl = this;
  $scope.item = SearchSvc.get($stateParams.searchId);
  $scope.trackButton=true;
  $scope.getPic = function(item) {
    if(item.hasOwnProperty('LargeImage')) {
      return item.LargeImage[0].URL[0];
    }
    else {
      return item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
    }
  };
  // An alert dialog
  $scope.showSuccessAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Item Added!',
    template: 'We\'ll let you know when the price drops'
    });
    alertPopup.then(function(res) {
      $state.go('tab.tracklist');
      console.log('popup closed');
    });
  };
  $scope.showErrorAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: 'Please check your network connection and try again'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
      console.log('popup closed');
    });
  };
  $scope.addToList = function(item) {
    TrackSvc.add(item, $scope.showSuccessAlert, $scope.showErrorAlert);
  };
})

.controller('TracklistCtrl', function($scope, $ionicPopup, TrackSvc) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.items = TrackSvc.all();
  $scope.$on('$ionicView.enter', function(e) {
     $scope.items = TrackSvc.all();
  });
  $scope.getPic = function(item) {
    if(item.hasOwnProperty('LargeImage')) {
      return item.LargeImage[0].URL[0];
    }
    else {
      return item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
    }
  };
  $scope.showSuccessAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Item Removed'
    //template: 'We\'ll let you know when the price drops'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
      console.log('popup closed');
    });
  };
  $scope.showErrorAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: 'Please check your network connection and try again'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
      console.log('popup closed');
    });
  };
  $scope.remove = function(item) {
    TrackSvc.remove(item, $scope.showSuccessAlert, $scope.showErrorAlert);
  };
})

.controller('TracklistDetailCtrl', function($scope, $state, $stateParams, $ionicPopup, TrackSvc) {
  $scope.item = TrackSvc.get($stateParams.itemId);
  $scope.trackButton=false;
  $scope.addToList = function(item) {
    TrackSvc.add(item);
    $state.go('tab.tracklist');
  };
  $scope.getPic = function(item) {
    if(item.hasOwnProperty('LargeImage')) {
      return item.LargeImage[0].URL[0];
    }
    else {
      return item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
    }
  };
  $scope.showSuccessAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Item Removed'
    //template: 'We\'ll let you know when the price drops'
    });
    alertPopup.then(function(res) {
      $state.go('tab.tracklist');
      console.log('popup closed');
    });
  };
  $scope.showErrorAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: 'Please check your network connection and try again'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
      console.log('popup closed');
    });
  };
  $scope.remove = function(item) {
    TrackSvc.remove(item, $scope.showSuccessAlert, $scope.showErrorAlert);
    //$state.go('tab.tracklist');
  };
})



;
