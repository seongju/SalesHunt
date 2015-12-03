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

.factory('TrackSvc', ['$localstorage','$q', '$http', function($localstorage, $q, $http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tracks = $localstorage.getObject('tracklist');
  var username = "Bob";
  return {
    all: function() {
      return tracks;
    },
    remove: function(item) {
      var req = {
        method: 'POST',
        url: 'https://saleshunt-api.herokuapp.com/removeItem',
        headers: {
          'Content-Type': 'application/json'
        },
        data:
        {
          "username": username,
          "ASIN": item.ASIN[0]
        }
      };

      $http(req).then(
        function successCallback(response) {
          tracks.splice(tracks.indexOf(item), 1);
          $localstorage.setObject('tracklist', tracks);
          alert("The item was removed from your tracklist.");
        },
        function errorCallback(response) {
          alert("There was an error removing the item. Please check your network connection.");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
    },
    add: function(item) {
      for (i = 0; i < tracks.length; ++i) {
        if (tracks[i].ASIN[0] == item.ASIN[0]) {
          alert('You\'re already tracking this item!');
          return;
        }
      }
      var req = {
        method: 'POST',
        url: 'https://saleshunt-api.herokuapp.com/addItem',
        headers: {
          'Content-Type': 'application/json'
        },
        data:
        {
          "username": username,
          "item": {
            "ASIN": item.ASIN[0],
            "brand": item.ItemAttributes[0].Brand[0],
            "lastPriceAmount": item.ItemAttributes[0].ListPrice[0].Amount[0],
            "lastPriceFormatted": item.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
            "pictureLink": item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0],
            "setPriceAmount": item.ItemAttributes[0].ListPrice[0].Amount[0],
            "setPriceFormatted": item.ItemAttributes[0].ListPrice[0].FormattedPrice[0],
            "title": item.ItemAttributes[0].Title[0]
          }
       }

      };

      $http(req).then(
        function successCallback(response) {
          var clone = JSON.parse(JSON.stringify(item));
          tracks.push(clone);
          $localstorage.setObject('tracklist', tracks);
          alert("The item was added to your tracklist! We'll notify you when the price drops!");
        },
        function errorCallback(response) {
          alert("There was an error adding the item. Please check your network connection.");
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
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
  var sort = {};
  var items = [];
  function sortItems(_sort) {
    sort = _sort;
    if  (sort.id == 1) {
      items.sort(priceDescSort);
    }
    else if (sort.id == 2) {
      items.sort(priceAscSort);
    }
    else {
      items.sort(defaultSort);
    }
  }
  function defaultSort(a,b) {
    return a.itemId - b.itemId;
  }
  function priceDescSort(a,b) {
    return a.ItemAttributes[0].ListPrice[0].Amount[0] - b.ItemAttributes[0].ListPrice[0].Amount[0];
  }
  function priceAscSort(a,b) {
    return b.ItemAttributes[0].ListPrice[0].Amount[0] - a.ItemAttributes[0].ListPrice[0].Amount[0];
  }
  function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    var toAdd = response.data;
    for (i = 0; i < toAdd.length; ++i) {
      toAdd[i].itemId = i;
      //add data for list price
      //this will affect sort order, but it makes it work
      if (toAdd[i].ItemAttributes[0].ListPrice === undefined) {
        toAdd[i].ItemAttributes[0].ListPrice =[
        { Amount: [ '0' ],
          CurrencyCode: [ 'USD' ],
          FormattedPrice: [ 'Price Data Unavailable' ] }
          ];
      }
      items.push(toAdd[i]);
    }
    sortItems(sort);
  }
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
    sortItems: sortItems,
    getTerm: function() {
      return search;
    },
    setTerm: function(inTerm, _sort) {
      sort = _sort;
      temp = items;
      items.splice(0,items.length);
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

      $http(req).then(successCallback,
        function errorCallback(response) {
        alert("There was an error searching. Please check your network connection.");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      return null;
    }
  };
});
