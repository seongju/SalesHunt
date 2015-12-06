
angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $rootScope, $ionicPopup, LoginSvc) {
  $scope.user = {
    username: null,
    password: null,
    phoneNumber:null,
    inputPhoneNumber: null
  };
  if(LoginSvc.isRegistered) {
    $rootScope.username = LoginSvc.getUsername();
    $state.go('tab.search');
  }
  $scope.isRegistered = true;
  $scope.switchMode = function(mode) {
    $scope.isRegistered = mode;
  };
  $scope.loginSuccessAlert = function() {
    $rootScope.username = LoginSvc.getUsername();
    $state.go('tab.search');
  };
  $scope.loginErrorAlert = function(errorMessage) {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: errorMessage
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
    });
  };
  $scope.login = function() {
    LoginSvc.login($scope.user, $scope.loginSuccessAlert, $scope.loginErrorAlert);
  };
  $scope.signUpSuccessAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Account Created',
    template: 'You can now search for products and track them'
    });
    alertPopup.then(function(res) {
      $state.go('tab.search');
    });
  };
  $scope.signUpErrorAlert = function(errorMessage) {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: errorMessage
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');

    });
  };
  $scope.submit = function(){
    var phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if($scope.user.inputPhoneNumber.match(phoneno))
    {
      $scope.user.phoneNumber = "+1" + $scope.user.inputPhoneNumber.slice(0,3) + $scope.user.inputPhoneNumber.slice(4,7) + $scope.user.inputPhoneNumber.slice(8,12);
      LoginSvc.signUp($scope.user, $scope.signUpSuccessAlert, $scope.signUpErrorAlert);
    }
    else
    {
      var alertPopup = $ionicPopup.alert({
      title: 'Invalid Phone Number',
      template: 'Please use the form xxx-xxx-xxxx'
      });
      alertPopup.then(function(res) {
        $scope.user.inputPhoneNumber = null;
      });
    }
    
    //$state.go('tab.search');
  };
})

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

.controller('ResultsDetailCtrl', function($scope, $state, $stateParams, $rootScope, $ionicPopup, SearchSvc, TrackSvc) {
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
  $scope.buyButton = function(item) {
    window.open(item.DetailPageURL[0], '_system', 'location=yes'); return false;
  };
  // An alert dialog
  $scope.showSuccessAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Item Added!',
    template: 'We\'ll let you know when the price drops'
    });
    alertPopup.then(function(res) {
      $state.go('tab.tracklist');
    });
  };
  $scope.showErrorAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: 'Please check your network connection and try again'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
    });
  };
  $scope.addToList = function(item) {
    TrackSvc.add(item, $rootScope.username,$scope.showSuccessAlert, $scope.showErrorAlert);
  };
})

.controller('TracklistCtrl', function($scope, $ionicPopup, $rootScope, TrackSvc) {
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
    });
  };
  $scope.showErrorAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: 'Please check your network connection and try again'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
    });
  };
  $scope.remove = function(item) {
    TrackSvc.remove(item, $rootScope.username, $scope.showSuccessAlert, $scope.showErrorAlert);
  };
})

.controller('TracklistDetailCtrl', function($scope, $state, $rootScope,$stateParams, $ionicPopup, TrackSvc) {
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
  $scope.buyButton = function(item) {
    window.open(item.DetailPageURL[0], '_system', 'location=yes'); return false;
  };
  $scope.showSuccessAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Item Removed'
    //template: 'We\'ll let you know when the price drops'
    });
    alertPopup.then(function(res) {
      $state.go('tab.tracklist');
    });
  };
  $scope.showErrorAlert = function() {
    var alertPopup = $ionicPopup.alert({
    title: 'Oops, something went wrong',
    template: 'Please check your network connection and try again'
    });
    alertPopup.then(function(res) {
      //$state.go('tab.tracklist');
    });
  };
  $scope.remove = function(item) {
    TrackSvc.remove(item, $rootScope.username, $scope.showSuccessAlert, $scope.showErrorAlert);
    //$state.go('tab.tracklist');
  };
});
