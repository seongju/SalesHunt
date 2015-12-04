// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// API_KEY: AIzaSyAi37LkflJ-QKBm0WW6UKLvZ_CA68e7yZk

angular.module('starter', ['ionic','ionic.service.core', 'ngCordova', 'ionic.service.push', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    /* external */
    pushNotification = window.plugins.pushNotification;
    
    window.onNotification = function(e){

          switch(e.event){
            case 'registered':
              if(e.regid.length > 0){

                var device_token = e.regid;
                RequestsService.register(device_token).then(function(response){
                  alert('registered!');
                });
              }
            break;

            case 'message':
              alert('msg received: ' + e.message);
              /*
                {
                    "message": "Hello this is a push notification",
                    "payload": {
                        "message": "Hello this is a push notification",
                        "sound": "notification",
                        "title": "New Message",
                        "from": "813xxxxxxx",
                        "collapse_key": "do_not_collapse",
                        "foreground": true,
                        "event": "message"
                    }
                }
              */
            break;

            case 'error':
              alert('error occured');
            break;

          }
    };

    window.errorHandler = function(error){
      //alert('an error occured');
    }

    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'ecb': 'onNotification',
        'senderID': 'eecs441',
        'device_token' : '1234'
      }
    );

    /* end of external */
    /* end of external */

    Ionic.io();

    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        // console.log(notification, payload);
        alert( "Price drop on Macbook Air!");
      },
      "onRegister": function(data) {
        // console.log(data.token);

      },
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
         },
         "android": {
           "iconColor": "#343434"
         }
      } 
    });
    // this will give you a fresh user or the previously saved 'current user'
    var user = Ionic.User.current();
    user.id = Ionic.User.anonymousId();
    // if the user doesn't have an id, you'll need to give it one.
    if (!user.id) {
      user.id = Ionic.User.anonymousId();
      // user.id = 'your-custom-user-id';
    }

    var callback = function(pushToken) {
      console.log('Registered token:', pushToken.token);
      user.addPushToken(pushToken.token);
      user.set('token', pushToken.token);
      user.save(); // you NEED to call a save after you add the token
    }

    push.register(callback);


    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})



.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('tab.results', {
      url: '/results',
      views: {
        'tab-search': {
          templateUrl: 'templates/tab-results.html',
          controller: 'ResultsCtrl'
        }
      }
    })
    .state('tab.resultsDetail', {
      url: '/results/:searchId',
      views: {
        'tab-search': {
          templateUrl: 'templates/item-detail.html',
          controller: 'ResultsDetailCtrl'
        }
      }
   })

  .state('tab.tracklist', {
      url: '/tracklist',
      views: {
        'tab-tracklist': {
          templateUrl: 'templates/tab-tracklist.html',
          controller: 'TracklistCtrl'
        }
      }
    })
    .state('tab.tracklistDetail', {
      url: '/tracklist/:itemId',
      views: {
        'tab-tracklist': {
          templateUrl: 'templates/item-detail.html',
          controller: 'TracklistDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/search');

});
