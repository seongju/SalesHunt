var generateQueryString = require('./utils').generateQueryString,
  request = require('request'),
  parseXML = require('xml2js').parseString;

var runQuery = function (credentials, method) {

  return function (query, cb) {
    var url = generateQueryString(query, method, credentials);

    if (typeof cb === 'function') {
      request(url, function (err, response, body) {

        if (err) {
          cb(err);
        } else if (!response) {
          cb("No response (check internet connection)");
        } else if (response.statusCode !== 200) {
          parseXML(body, function (err, resp) {
            if (err) {
              cb(err);
            } else {
              cb(resp[method + 'ErrorResponse']);
            }
          });
        } else {
          parseXML(body, function (err, resp) {
            if (err) {
              cb(err);
            } else {
              var respObj = resp[method + 'Response'];
              if (respObj.Items && respObj.Items.length > 0) {
                // Request Error
                if (respObj.Items[0].Request && respObj.Items[0].Request.length > 0 && respObj.Items[0].Request[0].Errors) {
                  cb(respObj.Items[0].Request[0].Errors);
                } else if (respObj.Items[0].Item) {
                  //Got back an item
                  cb(null, respObj.Items[0].Item);
                }
              } else if (respObj.BrowseNodes && respObj.BrowseNodes.length > 0 && respObj.BrowseNodes[0].BrowseNode) {
                cb(null, respObj.BrowseNodes[0].BrowseNode);
              }
            }
          });
        }
      });
      return;
    }
  };
};

var createClient = function (credentials) {
  return {
    itemSearch: runQuery(credentials, 'ItemSearch'),
    itemLookup: runQuery(credentials, 'ItemLookup'),
    browseNodeLookup: runQuery(credentials, 'BrowseNodeLookup')
  };
};

exports.createClient = createClient;