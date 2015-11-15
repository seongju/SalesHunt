angular.module('starter.services', [])

.factory('$localstorage', ['$window','$q', function($window, $q) {
  return {
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    }
  };
}])

.factory('TrackSvc', ['$localstorage','$q', function($localstorage, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tracks = $localstorage.getObject('tracklist');
  return {
    all: function() {
      return tracks;
    },
    remove: function(item) {
      tracks.splice(tracks.indexOf(item), 1);
      $localstorage.setObject('tracklist', tracks);
    },
    add: function(item) {
      for (i = 0; i < tracks.length; ++i) {
        if (tracks[i].ASIN[0] == item.ASIN[0]) {
          //alert('You\'re already tracking this item!');
          return;
        }
      }
      var clone = JSON.parse(JSON.stringify(item));
      
      tracks.push(clone);

      $localstorage.setObject('tracklist', tracks);
    },
    get: function(trackId) {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].ASIN[0] == trackId) {
          return tracks[i];
        }
      }
      return null;
    }
  };
}])

.factory('SearchSvc', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var search= {
    term: ''
  };
  var items = [];
  return {
    all: function() {
      return items;
    },
    remove: function(item) {
      items.splice(items.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].ASIN[0] == itemId) {
          return items[i];
        }
      }
      return null;
    },
    getTerm: function() {
      return search;
    },
    setTerm: function(inTerm) {
      search.Keywords = inTerm;
      var req = {
        method: 'POST',
        url: 'https://saleshunt-api.herokuapp.com/itemSearch',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "Keywords": search.Keywords
        }
      };

      $http(req).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        items.splice(0,items.length);
        var toAdd = response.data;
        for (i = 0; i < toAdd.length; ++i) {
          items.push(toAdd[i]);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

      //call api.then update items
      //items.clear()
      //for results, items.push(result)
      return null;
    }
  };
});
