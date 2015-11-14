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
  console.log(tracks);
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
        if (tracks[i].ASIN[0] === item.ASIN[0]) {
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
        if (tracks[i].Item === parseInt(trackId)) {
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
  var macbook = [{
    Item: 0,
    ASIN:
    [ 'B00VSB1RZC' ],
    ListPrice:
    [ { Amount: [ '129900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,299.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Apple-MacBook-MK4M2LL-12-Inch-Display/dp/B00VSB1RZC%3Fpsc%3D1%26SubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VSB1RZC' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51YT7P31N-L._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51YT7P31N-L._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51YT7P31N-L.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Apple' ],
        Color: [ 'Gold' ],
        EAN: [ '0690443768645' ],
        EANList: [ [Object] ],
        Feature:
         [ '1.1 GHz Dual-Core Intel Core M Processor (Turbo Boost up to 2.4 GHz) with 4 MB shared L3 cache',
           '8 GB of 1600 MHz LPDDR3 RAM; 256 GB PCIe-based onboard flash storage',
           '12-Inch IPS LED-backlit Display; 2304-by-1440 Resolution',
           'Intel HD Graphics 5300',
           'OS X Yosemite; USB-C Port Only. PEASE NOTE: This MacBook has a single USB-C port (a new version of USB) which handles power and connectivity to all peripherals.  An accessory adapter can be purchased to connect standard USB devices to this MacBook.' ],
        HardwarePlatform: [ 'Mac' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Apple Computer' ],
        Languages: [ [Object] ],
        LegalDisclaimer: [ 'Manufacturers warranty applies' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Apple Computer' ],
        Model: [ 'MK4M2LL/A' ],
        MPN: [ 'MK4M2LL/A' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Mac OS X' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'MK4M2LL/A' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Apple Computer' ],
        Size: [ '256 GB' ],
        Studio: [ 'Apple Computer' ],
        Title: [ 'Apple MacBook MK4M2LL/A 12-Inch Laptop with Retina Display (Gold, 256 GB)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '888462323772' ],
        UPCList: [ [Object] ] } ]
    },
    {
      Item: 1,
      ASIN:
      [ 'B00VJ1P7TS' ],
      ListPrice:
      [ { Amount: [ '99999' ],
          CurrencyCode: [ 'USD' ],
          FormattedPrice: [ '$999.99' ] } ],
      DetailPageURL:
      [ 'http://www.amazon.com/Apple-MacBook-MJVE2LL-13-inch-Laptop/dp/B00VJ1P7TS%3FSubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VJ1P7TS' ],
      SmallImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/316sl-SZw1L._SL75_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      MediumImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/316sl-SZw1L._SL160_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      LargeImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/316sl-SZw1L.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      ItemAttributes:
      [ { Binding: [ 'Personal Computers' ],
          Brand: [ 'Apple' ],
          Color: [ 'Silver' ],
          EAN: [ '0736649735408' ],
          EANList: [ [Object] ],
          Feature:
           [ '1.6 GHz Intel Core i5 (Broadwell) 4GB of 1600 MHz LPDDR3 RAM',
             '128GB PCIe-Based Flash Storage Integrated Intel HD Graphics 6000',
             '13.3" LED-Backlit Glossy Display 1440 x 900 Native Resolution',
             '802.11ac Wi-Fi, Bluetooth 4.0 USB 3.0, Thunderbolt 2',
             '720p FaceTime HD Camera, SDXC Card Slot Mac OS X 10.10 Yosemite' ],
          HardwarePlatform: [ 'Mac' ],
          IsEligibleForTradeIn: [ '1' ],
          ItemDimensions: [ [Object] ],
          Label: [ 'Apple Computer' ],
          LegalDisclaimer: [ 'No returns' ],
          ListPrice: [ [Object] ],
          Manufacturer: [ 'Apple Computer' ],
          Model: [ 'MJVE2LL/A' ],
          MPN: [ 'MJVE2LL/A' ],
          OperatingSystem: [ 'Mac OS X' ],
          PackageDimensions: [ [Object] ],
          PackageQuantity: [ '1' ],
          PartNumber: [ 'MJVE2LL/A' ],
          ProductGroup: [ 'Personal Computer' ],
          ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
          Publisher: [ 'Apple Computer' ],
          Size: [ '13 inch' ],
          Studio: [ 'Apple Computer' ],
          Title: [ 'Apple MacBook Air MJVE2LL/A 13-inch Laptop (1.6 GHz Intel Core i5,4GB RAM,128 GB SSD Hard Drive, Mac OS X)' ],
          TradeInValue: [ [Object] ],
          UPC: [ '736649735408' ],
          UPCList: [ [Object] ] } ]
    },
    {
      Item: 2,
      ASIN:
      [ 'B00VSB0CB2' ],
      ListPrice:
      [ { Amount: [ '129900' ],
          CurrencyCode: [ 'USD' ],
          FormattedPrice: [ '$1,299.00' ] } ],
      DetailPageURL:
      [ 'http://www.amazon.com/Apple-MacBook-MJY32LL-12-Inch-Display/dp/B00VSB0CB2%3Fpsc%3D1%26SubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VSB0CB2' ],
      SmallImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/51mcx0W5UrL._SL75_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      MediumImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/51mcx0W5UrL._SL160_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      LargeImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/51mcx0W5UrL.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      ItemAttributes:
      [ { Binding: [ 'Personal Computers' ],
          Brand: [ 'Apple' ],
          Color: [ 'Space Gray' ],
          EAN: [ '0888462181235' ],
          EANList: [ [Object] ],
          Feature:
           [ '1.1 GHz Dual-Core Intel Core M Processor (Turbo Boost up to 2.4 GHz) with 4 MB shared L3 cache',
             '8 GB of 1600 MHz LPDDR3 RAM; 256 GB PCIe-based onboard flash storage',
             '12-Inch IPS LED-backlit Display; 2304-by-1440 Resolution',
             'Intel HD Graphics 5300',
             'OS X Yosemite; USB-C Port Only' ],
          HardwarePlatform: [ 'Mac' ],
          IsEligibleForTradeIn: [ '1' ],
          ItemDimensions: [ [Object] ],
          Label: [ 'Apple Computer' ],
          Languages: [ [Object] ],
          LegalDisclaimer: [ 'No returns on this item.' ],
          ListPrice: [ [Object] ],
          Manufacturer: [ 'Apple Computer' ],
          Model: [ 'MJY32LL/A' ],
          MPN: [ 'MJY32LL/A' ],
          NumberOfItems: [ '1' ],
          OperatingSystem: [ 'Mac OS X' ],
          PackageDimensions: [ [Object] ],
          PackageQuantity: [ '1' ],
          PartNumber: [ 'MJY32LL/A' ],
          ProductGroup: [ 'Personal Computer' ],
          ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
          Publisher: [ 'Apple Computer' ],
          Size: [ '256 GB' ],
          Studio: [ 'Apple Computer' ],
          Title: [ 'Apple MacBook MJY32LL/A 12-Inch Laptop with Retina Display (Space Gray, 256 GB)' ],
          TradeInValue: [ [Object] ],
          UPC: [ '888462181235' ],
          UPCList: [ [Object] ] } ]
    },
    {
      Item: 3,
      ASIN:
      [ 'B004FG793G' ],
      ListPrice:
      [ { Amount: [ '149900' ],
          CurrencyCode: [ 'USD' ],
          FormattedPrice: [ '$1,499.00' ] } ],
      DetailPageURL:
      [ 'http://www.amazon.com/Apple-13-Inch-MacBook-T7200-Processor/dp/B004FG793G%3FSubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB004FG793G' ],
      SmallImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/21rRNlbdbnL._SL75_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      MediumImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/21rRNlbdbnL._SL160_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      LargeImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/21rRNlbdbnL.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      ItemAttributes:
      [ { Binding: [ 'Personal Computers' ],
          Brand: [ 'Apple' ],
          Color: [ 'white' ],
          EAN: [ '0885909127887' ],
          EANList: [ [Object] ],
          Feature: [ '1 GB DDR2 RAM, 160 GB hard drive' ],
          HardwarePlatform: [ 'Mac' ],
          IsEligibleForTradeIn: [ '1' ],
          ItemDimensions: [ [Object] ],
          Label: [ 'Apple Computer' ],
          LegalDisclaimer: [ '30 days return or refund.  Thank you' ],
          ListPrice: [ [Object] ],
          Manufacturer: [ 'Apple Computer' ],
          Model: [ 'MA254LL/A' ],
          MPN: [ 'MA254LL/A' ],
          OperatingSystem: [ 'Apple Mac OS X 10.6 (Snow Leopard)' ],
          PackageDimensions: [ [Object] ],
          PackageQuantity: [ '1' ],
          PartNumber: [ 'MA254LL/A' ],
          ProductGroup: [ 'Personal Computer' ],
          ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
          Publisher: [ 'Apple Computer' ],
          Size: [ '13' ],
          Studio: [ 'Apple Computer' ],
          Title: [ 'Apple 13-Inch MacBook T7200 2.0 GHz Intel Core 2 Duo Processor, White' ],
          TradeInValue: [ [Object] ],
          UPC: [ '885909127887' ],
          UPCList: [ [Object] ] } ]
    },
    {
      Item: 4,
      ASIN:
      [ 'B001P05NKG' ],
      ListPrice:
      [ { Amount: [ '109900' ],
          CurrencyCode: [ 'USD' ],
          FormattedPrice: [ '$1,099.00' ] } ],
      DetailPageURL:
      [ 'http://www.amazon.com/Apple-MacBook-MB990LL-13-3-Inch-Laptop/dp/B001P05NKG%3Fpsc%3D1%26SubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB001P05NKG' ],
      SmallImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/51zsbCWiufL._SL75_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      MediumImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/51zsbCWiufL._SL160_.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      LargeImage:
      [ { URL: [ 'http://ecx.images-amazon.com/images/I/51zsbCWiufL.jpg' ],
          Height: [ [Object] ],
          Width: [ [Object] ] } ],
      ItemAttributes:
      [ { Binding: [ 'Personal Computers' ],
          Brand: [ 'Apple' ],
          Color: [ 'Silver' ],
          EAN: [ '0885909298594' ],
          EANList: [ [Object] ],
          Feature:
           [ 'Intel Core 2 Duo Processor 2.26GHz',
             '2GB DDR3 RAM',
             '160GB 5400RPM Hard Drive',
             '13.3-Inch Screen, NVIDIA GeForce 9400M',
             'Apple Mac OS X 10.7 Mountain Lion' ],
          HardwarePlatform: [ 'Mac' ],
          IsAutographed: [ '0' ],
          IsEligibleForTradeIn: [ '1' ],
          IsMemorabilia: [ '0' ],
          ItemDimensions: [ [Object] ],
          Label: [ 'Apple Computer' ],
          LegalDisclaimer: [ 'Startup discs are not available but all necessary drivers and original OS have been installed.' ],
          ListPrice: [ [Object] ],
          Manufacturer: [ 'Apple Computer' ],
          Model: [ 'MB990LL/A' ],
          MPN: [ 'MB990LL/A' ],
          NumberOfItems: [ '1' ],
          OperatingSystem: [ 'Apple Mac OS X 10.6' ],
          PackageDimensions: [ [Object] ],
          PackageQuantity: [ '1' ],
          PartNumber: [ 'MB990LL/A' ],
          ProductGroup: [ 'Personal Computer' ],
          ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
          Publisher: [ 'Apple Computer' ],
          Size: [ '13.3' ],
          Studio: [ 'Apple Computer' ],
          Title: [ 'Apple MacBook Pro MB990LL/A 13.3-Inch Laptop' ],
          TradeInValue: [ [Object] ],
          UPC: [ '885909296552' ],
          UPCList: [ [Object] ] } ]
      },
      {
        Item: 5,
        ASIN:
        [ 'B01425MCEA' ],
        ListPrice:
        [ { Amount: [ '89900' ],
            CurrencyCode: [ 'USD' ],
            FormattedPrice: [ '$899.00' ] } ],
        DetailPageURL:
        [ 'http://www.amazon.com/Apple-MJVM2LL-11-6-Inch-Integrated-Graphics/dp/B01425MCEA%3FSubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01425MCEA' ],
        SmallImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/41LAlMYM1RL._SL75_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        MediumImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/41LAlMYM1RL._SL160_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        LargeImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/41LAlMYM1RL.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        ItemAttributes:
        [ { Binding: [ 'Personal Computers' ],
            Brand: [ 'Apple' ],
            EAN: [ '6901209203459' ],
            EANList: [ [Object] ],
            ESRBAgeRating: [ 'Everyone' ],
            Feature:
             [ '1.6 GHz dual-core Intel Core i5 (Turbo Boost up to 2.7 GHz) with 3 MB shared L3 cache',
               '4 GB of 1600 MHz LPDDR3 RAM; 128 GB PCIe-based flash storage',
               '11.6-Inch (diagonal) LED-backlit Glossy Widescreen Display, 1366 x 768 resolution',
               'Intel HD Graphics 6000',
               'OS X Yosemite, Up to 9 Hours of Battery Life' ],
            Genre: [ 'Wrestling Games' ],
            HardwarePlatform: [ 'Mac' ],
            IsEligibleForTradeIn: [ '1' ],
            ItemDimensions: [ [Object] ],
            Label: [ 'Apple Computer' ],
            ListPrice: [ [Object] ],
            Manufacturer: [ 'Apple Computer' ],
            Model: [ 'MJVM2LL/A' ],
            MPN: [ 'MJVM2LL/A' ],
            OperatingSystem: [ 'Mac OS X' ],
            PackageDimensions: [ [Object] ],
            PackageQuantity: [ '1' ],
            PartNumber: [ 'MJVM2LL/A' ],
            ProductGroup: [ 'Personal Computer' ],
            ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
            Publisher: [ 'Apple Computer' ],
            Studio: [ 'Apple Computer' ],
            Title: [ 'Apple MacBook Air MJVM2LL/A 11.6-Inch laptop(1.6 GHz Intel i5, 128 GB SSD, Integrated Intel HD Graphics 6000, Mac OS X Yosemite)' ],
            TradeInValue: [ [Object] ] } ]
      },
      {
        Item: 6,
        ASIN:
        [ 'B00153XRZG' ],
        ListPrice:
        [ { Amount: [ '16300' ],
            CurrencyCode: [ 'USD' ],
            FormattedPrice: [ '$163.00' ] } ],
        DetailPageURL:
        [ 'http://www.amazon.com/Apple-MB404B-A-Black-Macbook/dp/B00153XRZG%3FSubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00153XRZG' ],
        SmallImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/51XZwj4czqL._SL75_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        MediumImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/51XZwj4czqL._SL160_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        LargeImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/51XZwj4czqL.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        ItemAttributes:
        [ { Binding: [ 'Electronics' ],
            Brand: [ 'Apple' ],
            CatalogNumberList: [ [Object] ],
            Color: [ 'black' ],
            EAN: [ '0885909218561' ],
            EANList: [ [Object] ],
            Feature: [ 'Apple 13.3" MacBook Intel Core 2 Duo' ],
            HardwarePlatform: [ 'Mac' ],
            IsEligibleForTradeIn: [ '1' ],
            ItemDimensions: [ [Object] ],
            Label: [ 'Apple' ],
            LegalDisclaimer: [ 'Must live within the continental US.' ],
            Manufacturer: [ 'Apple' ],
            Model: [ 'MB404B/A' ],
            MPN: [ 'MB404B/A' ],
            OperatingSystem: [ 'Apple Mac OS X v10.5 Leopard' ],
            PackageDimensions: [ [Object] ],
            PackageQuantity: [ '1' ],
            PartNumber: [ 'MB404B/A' ],
            ProductGroup: [ 'Personal Computer' ],
            ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
            Publisher: [ 'Apple' ],
            Size: [ '13"' ],
            Studio: [ 'Apple' ],
            Title: [ 'Apple Black Macbook' ],
            TradeInValue: [ [Object] ],
            UPC: [ '885909218561' ],
            UPCList: [ [Object] ] } ]
      },
      {
        Item: 7,
        ASIN:
        [ 'B002C744K6' ],
        ListPrice:
        [ { Amount: [ '159900' ],
            CurrencyCode: [ 'USD' ],
            FormattedPrice: [ '$1,599.00' ] } ],
        DetailPageURL:
        [ 'http://www.amazon.com/Apple-MacBook-MC118LL-15-4-Inch-Laptop/dp/B002C744K6%3Fpsc%3D1%26SubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB002C744K6' ],
        SmallImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/41Cxmc27C7L._SL75_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        MediumImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/41Cxmc27C7L._SL160_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        LargeImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/41Cxmc27C7L.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        ItemAttributes:
        [ { Binding: [ 'Personal Computers' ],
            Brand: [ 'Apple' ],
            Color: [ 'silver' ],
            EAN: [ '0885909315710' ],
            EANList: [ [Object] ],
            Feature:
             [ 'Intel Core 2 Duo Processor 2.53GHz',
               '4GB DDR3 RAM',
               '250GB 5400RPM Hard Drive',
               '15.4-Inch Screen, GeForce',
               'Apple Mac OS X v10.6 Snow Leopard, 7 hours Battery Life' ],
            HardwarePlatform: [ 'Mac' ],
            HazardousMaterialType: [ 'Unknown' ],
            IsAutographed: [ '0' ],
            IsEligibleForTradeIn: [ '1' ],
            IsMemorabilia: [ '0' ],
            ItemDimensions: [ [Object] ],
            Label: [ 'Apple Computer' ],
            LegalDisclaimer: [ '90 day warranty on all parts excluding battery. Batteries ship out with a good working charge, but are consumable items and are not covered under the hardware warranty. 30 days to request any refunds. Refunds are charged a 15% re-stocking fee. We are experts in mac refurbishing and guarantee to provide you with a great working mac.' ],
            ListPrice: [ [Object] ],
            Manufacturer: [ 'Apple Computer' ],
            Model: [ 'MC118LL/A' ],
            MPN: [ 'MC118LL/A' ],
            NumberOfItems: [ '1' ],
            OperatingSystem: [ 'Apple Mac OS X v10.6 Snow Leopard' ],
            PackageDimensions: [ [Object] ],
            PackageQuantity: [ '1' ],
            PartNumber: [ 'MC118LL/A' ],
            ProductGroup: [ 'Personal Computer' ],
            ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
            Publisher: [ 'Apple Computer' ],
            Size: [ '15.4-inch' ],
            Studio: [ 'Apple Computer' ],
            Title: [ 'Apple MacBook Pro MC118LL/A 15.4-Inch Laptop' ],
            TradeInValue: [ [Object] ],
            UPC: [ '885909315710' ],
            UPCList: [ [Object] ] } ]
      },
      {
        Item: 8,
        ASIN:
        [ 'B003H05K14' ],
        ListPrice:
        [ { Amount: [ '74900' ],
            CurrencyCode: [ 'USD' ],
            FormattedPrice: [ '$749.00' ] } ],
        DetailPageURL:
        [ 'http://www.amazon.com/Apple-MacBook-13-3-Inch-MB403LL-Processor/dp/B003H05K14%3FSubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB003H05K14' ],
        SmallImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/517%2BbC0jxkL._SL75_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        MediumImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/517%2BbC0jxkL._SL160_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        LargeImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/517%2BbC0jxkL.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        ItemAttributes:
        [ { Binding: [ 'Electronics' ],
            Brand: [ 'Apple' ],
            Color: [ 'White' ],
            EAN: [ '5027631070818' ],
            EANList: [ [Object] ],
            Feature: [ '2 GB RAM, 160 GB Hard Drive)' ],
            HardwarePlatform: [ 'Mac' ],
            IsEligibleForTradeIn: [ '1' ],
            ItemDimensions: [ [Object] ],
            Label: [ 'Apple Computer' ],
            LegalDisclaimer: [ 'good laptop with nice performance' ],
            ListPrice: [ [Object] ],
            Manufacturer: [ 'Apple Computer' ],
            Model: [ 'MB403LL/A' ],
            MPN: [ 'MC374B/A' ],
            OperatingSystem: [ 'Mac OS X' ],
            PackageDimensions: [ [Object] ],
            PackageQuantity: [ '1' ],
            PartNumber: [ 'MC374B/A' ],
            ProductGroup: [ 'Personal Computer' ],
            ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
            Publisher: [ 'Apple Computer' ],
            Size: [ '13"' ],
            Studio: [ 'Apple Computer' ],
            Title: [ 'Apple MacBook 13.3-Inch Laptop MB403LL/A, 2.4 GHz Intel Core 2 Duo Processor, White' ],
            TradeInValue: [ [Object] ],
            UPC: [ '885909358724' ],
            UPCList: [ [Object] ] } ]
      },
      {
        Item: 9,
        ASIN:
        [ 'B00UGEBB94' ],
        ListPrice:
        [ { Amount: [ '99900' ],
            CurrencyCode: [ 'USD' ],
            FormattedPrice: [ '$999.00' ] } ],
        DetailPageURL:
        [ 'http://www.amazon.com/Apple-MacBook-MJVE2LL-13-3-Inch-VERSION/dp/B00UGEBB94%3Fpsc%3D1%26SubscriptionId%3DAKIAITJQLXMWIJEFANNA%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00UGEBB94' ],
        SmallImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/51SNX0afDML._SL75_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        MediumImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/51SNX0afDML._SL160_.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        LargeImage:
        [ { URL: [ 'http://ecx.images-amazon.com/images/I/51SNX0afDML.jpg' ],
            Height: [ [Object] ],
            Width: [ [Object] ] } ],
        ItemAttributes:
        [ { Binding: [ 'Personal Computers' ],
            Brand: [ 'Apple' ],
            Color: [ 'Silver' ],
            EAN: [ '0736649735408' ],
            EANList: [ [Object] ],
            Feature:
             [ '1.6 GHz dual-core Intel Core i5 (Turbo Boost up to 2.7 GHz) with 3 MB shared L3 cache',
               '4 GB of 1600 MHz LPDDR3 RAM; 128 GB PCIe-based flash storage',
               '13.3-Inch (diagonal) LED-backlit Glossy Widescreen Display, 1440 x 900 resolution',
               'Intel HD Graphics 6000',
               'OS X Yosemite, Up to 12 Hours of Battery Life' ],
            HardwarePlatform: [ 'Mac' ],
            IsEligibleForTradeIn: [ '1' ],
            ItemDimensions: [ [Object] ],
            Label: [ 'Apple Computer' ],
            LegalDisclaimer: [ 'Brand N/E/W. Sealed' ],
            ListPrice: [ [Object] ],
            Manufacturer: [ 'Apple Computer' ],
            Model: [ 'MJVE2LL/A' ],
            MPN: [ 'MJVE2LL/A' ],
            NumberOfItems: [ '1' ],
            OperatingSystem: [ 'Mac OS X' ],
            PackageDimensions: [ [Object] ],
            PackageQuantity: [ '1' ],
            PartNumber: [ 'MJVE2LL/A' ],
            ProductGroup: [ 'Personal Computer' ],
            ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
            Publisher: [ 'Apple Computer' ],
            Size: [ '128 GB' ],
            Studio: [ 'Apple Computer' ],
            Title: [ 'Apple MacBook Air MJVE2LL/A 13.3-Inch Laptop (128 GB) NEWEST VERSION' ],
            TradeInValue: [ [Object] ],
            UPC: [ '888462109765' ],
            UPCList: [ [Object] ] } ]
      }
   ];
  var xps =[{
    Item: 0,
    ASIN:
    [ 'B00RY4X8A4' ],
    ListPrice:
    [ { Amount: [ '139999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,399.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Dell-XPS13-9343-13-3-inch-Ultrabook-Processor/dp/B00RY4X8A4%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00RY4X8A4' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51vQxoCGyuL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51vQxoCGyuL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51vQxoCGyuL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        Color: [ 'Silver' ],
        EAN: [ '0884146543924' ],
        EANList: [ [Object] ],
        Feature:
         [ 'The World\'s Frst Infinity Display of 13.3" Full HD (1920 x 1080) Backlit WLED Screen',
           '5th Generation Broadwell Intel Core i5-5200U 2.20 GHz with Turbo Boost Technology up to 2.70 GHz',
           '4GB Dual Channel DDR3L-RS 1600Mhz/ 128GB SSD / Intel HD Graphics 5500',
           'Backlit Keyboard; 2 x USB 3.0; Bluetooth 4.0; HDMI; Exceptionally Long-Lasting Battery Life up to 15 hrs',
           'Windows 8.1 (64-bit), light weight only 2.6 lbs' ],
        HardwarePlatform: [ 'PC' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Computers' ],
        LegalDisclaimer: [ 'THC' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Computers' ],
        Model: [ 'XPS13-9343' ],
        MPN: [ 'XPS13' ],
        OperatingSystem: [ 'Windows 8;' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'XPS13' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell Computers' ],
        Studio: [ 'Dell Computers' ],
        Title: [ 'Dell XPS13 XPS13-9343 13.3-inch Ultrabook Computer (2.2 GHz Intel Core i5 Processor, 4 GB DDR3 SDRAM, 128 GB Solid State Hard Drive, Windows 8)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '884146543924' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 1,
    ASIN:
    [ 'B015PYYPFG' ],
    ListPrice:
    [ { Amount: [ '139999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,399.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Dell-XPS9350-4007SLV-Touchscreen-Generation-Microsoft/dp/B015PYYPFG%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB015PYYPFG' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41%2Bt2BscAjL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41%2Bt2BscAjL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41%2Bt2BscAjL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        Color: [ 'Machined Aluminum' ],
        EAN: [ '0884116204275' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Intel Dual Core i5-6200U 2.3 GHz Processor',
           '8 GB LPDDR3',
           '256 GB SSD Storage; Optical Drive Not included',
           '13.3 Inch QHD+ (3200 x 1800 pixels) LED-lit Truelife Touchscreen',
           'Windows 10 Operating System; Machined Aluminum Chassis' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Marketing USA, LP' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Marketing USA, LP' ],
        Model: [ 'XPS9350-4007SLV' ],
        MPN: [ 'XPS9350-4007SLV' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 10' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'XPS9350-4007SLV' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell Marketing USA, LP' ],
        Studio: [ 'Dell Marketing USA, LP' ],
        Title: [ 'Dell XPS9350-4007SLV 13.3 Inch QHD+ Touchscreen Laptop (6th Generation Intel Core i5, 8 GB RAM, 256 GB SSD) Microsoft Signature Edition' ],
        UPC: [ '884116204275' ],
        UPCList: [ [Object] ],
        Warranty: [ '1 Year Mail In Service' ] } ],
      },{
    Item: 2,
    ASIN:
    [ 'B00VWC2NBO' ],
    ListPrice:
    [ { Amount: [ '129900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,299.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Dell-13-3-Inch-Ultrabook-Generation-Refurbished/dp/B00VWC2NBO%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VWC2NBO' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51dzW5BdffL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51dzW5BdffL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51dzW5BdffL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        EAN: [ '0788679075139' ],
        EANList: [ [Object] ],
        Feature:
         [ 'This Certified Refurbished product is manufacturer refurbished, shows limited or no wear, and includes all original accessories plus a 180 day warranty.',
           'The World\'s Frst Infinity Display of 13.3 inch Full HD (1920 x 1080) Backlit WLED Screen',
           '5th Generation Broadwell Intel Core i5-5200U 2.20 GHz with Turbo Boost Technology up to 2.70 GHz',
           '4GB DDR3 RAM / 128GB SSD / Intel HD Graphics 5500',
           'Windows 8.1 (64-bit), light weight only 2.6 lbs' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Computers' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Computers' ],
        Model: [ 'DELL XPS 9343' ],
        MPN: [ 'DELL XPS 13' ],
        OperatingSystem: [ 'Windows 8;' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'DELL XPS 13' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'COMPUTER' ],
        Publisher: [ 'Dell Computers' ],
        Studio: [ 'Dell Computers' ],
        Title: [ 'Dell XPS13 13.3-Inch Full HD WLED Backlit Infinity Display Ultrabook (2.2GHz 5th Generation Intel Core i5-5200U Processor, 4GB DDR3 RAM, 128GB SSD, Windows 8.1) (Certified Refurbished)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '788679075139' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 3,
    ASIN:
    [ 'B010DODC66' ],
    ListPrice:
    [ { Amount: [ '139999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,399.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Dell-Touchscreen-Laptop-Microsoft-Signature/dp/B010DODC66%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB010DODC66' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51EfIH6gyqL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51EfIH6gyqL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51EfIH6gyqL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        EAN: [ '0884116167938' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Intel Core i5 5200U 2.2 GHz Processor',
           '8 GB DDR3L SDRAM',
           '256 GB SSD Storage; No Optical Drive',
           '13.3 Inch WQXGA+ (3200x1800) LED-lit Infinity Touchscreen',
           'Windows 10 Operating System; Silver Chassis' ],
        HardwarePlatform: [ 'Unknown' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Marketing USA, LP' ],
        Languages: [ [Object] ],
        LegalDisclaimer: [ 'All warranties, expressed and/or implied, are form the manufacturer. We do not manufacture the products and are not liable for any warranty issues, Please contact the manufacturer for any warranty issues and/or questions.' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Marketing USA, LP' ],
        Model: [ 'XPS9343-6365SLV' ],
        MPN: [ 'XPS9343-6365SLV' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 10' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'XPS9343-6365SLV' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell Marketing USA, LP' ],
        ReleaseDate: [ '2015-07-29' ],
        Studio: [ 'Dell Marketing USA, LP' ],
        Title: [ 'Dell XPS 13 QHD 13.3 Inch Touchscreen Laptop (Intel Core i5 5200U, 8 GB RAM, 256 GB SSD, Silver) Microsoft Signature Image' ],
        TradeInValue: [ [Object] ],
        UPC: [ '884116167938' ],
        UPCList: [ [Object] ],
        Warranty: [ '1Yr In-Home Warranty' ] } ],
      },{
    Item: 4,
    ASIN:
    [ 'B00VWC2U1C' ],
    ListPrice:
    [ { Amount: [ '149900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,499.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Newest-Model-Dell-Ultrabook-Computer/dp/B00VWC2U1C%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VWC2U1C' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413Q%2BwiDPmL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413Q%2BwiDPmL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413Q%2BwiDPmL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        EAN: [ '0788679075146' ],
        EANList: [ [Object] ],
        Feature:
         [ 'This Certified Refurbished product is manufacturer refurbished, shows limited or no wear, and includes all original accessories plus a 90 day warranty.',
           'The World\'s Frst Infinity Display of 13.3 inch Full HD (1920 x 1080) Backlit WLED Screen',
           '5th Generation Broadwell Intel Core i5-5200U 2.20 GHz with Turbo Boost Technology up to 2.70 GHz',
           '8GB DDR3 RAM / 128GB SSD / Intel HD Graphics 5500',
           'Windows 8.1 (64-bit), light weight only 2.6 lbs' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'DELL' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'DELL' ],
        Model: [ 'XPS13-9343-8128' ],
        MPN: [ 'DELL XPS 13' ],
        OperatingSystem: [ 'Windows 8;' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'DELL XPS 13' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'COMPUTER' ],
        Publisher: [ 'DELL' ],
        Studio: [ 'DELL' ],
        Title: [ '2015 Newest Model Dell XPS13 Ultrabook Computer - the World\'s First 13.3" FHD WLED Backlit Infinity Display, 5th Gen Intel Core i5-5200U Processor 2.2GHz / 8GB DDR3 / 128GB SSD / Windows 8.1 (Certified Refurbished)' ],
        UPC: [ '788679075146' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 5,
    ASIN:
    [ 'B016RH3DSA' ],
    ListPrice:
    [ { Amount: [ '149900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,499.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Newest-Dell-Ultrabook-Windows-Operating/dp/B016RH3DSA%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB016RH3DSA' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51B57%2BdnFmL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51B57%2BdnFmL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51B57%2BdnFmL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        EAN: [ '0788679078680' ],
        EANList: [ [Object] ],
        Feature:
         [ 'The World\'s First Infinity Display of 13.3" Full HD (1920 x 1080) Backlit WLED Screen with integrated 1MP 720p webcam, 5th Generation Broadwell Intel Core i5-5200U 2.20 GHz with Turbo Boost Technology up to 2.70 GHz',
           '5th Generation Broadwell Intel Core i5-5200U 2.20 GHz with Turbo Boost Technology up to 2.70 GHz',
           '4GB Dual Channel DDR3L-RS 1600Mhz/ 128GB SSD / Intel HD Graphics 5500',
           'Backlit Keyboard; 2 x USB 3.0; Bluetooth 4.0; HDMI; Exceptionally Long-Lasting Battery Life up to 15 hrs',
           'Windows 10 Home, 64- bit' ],
        HardwarePlatform: [ 'PC' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Computers' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Computers' ],
        Model: [ 'XPS13-9343' ],
        MPN: [ 'DELL XPS 13' ],
        OperatingSystem: [ 'other' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'DELL XPS 13' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell Computers' ],
        Studio: [ 'Dell Computers' ],
        Title: [ 'Newest Dell XPS13 Ultrabook Windows 10 Home Operating System - the World\'s First 13.3 inch FHD Infinity Display, Intel i5-5200U Processor 2.2GHz / 4GB DDR3 RAM / 128GB SSD' ],
        UPC: [ '788679078680' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 6,
    ASIN:
    [ 'B00W4LBHE6' ],
    ListPrice:
    [ { Amount: [ '126125' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,261.25' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Dell-9343-2727SLV-Signature-Edition-Laptop/dp/B00W4LBHE6%3FSubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00W4LBHE6' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/31BiyeZvc6L._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/31BiyeZvc6L._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/31BiyeZvc6L.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell Consumer' ],
        Color: [ 'Silver' ],
        EAN: [ '0884116165118' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Screen Size:13.3"',
           'Processor Type:Core i5',
           'Standard Memory:4 GB' ],
        HardwarePlatform: [ 'Unknown' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell' ],
        Model: [ 'XPS9343-2727SLV' ],
        MPN: [ 'XPS9343-2727SLV' ],
        OperatingSystem: [ 'Unknown' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'XPS9343-2727SLV' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell' ],
        Studio: [ 'Dell' ],
        Title: [ 'Dell XPS 13 9343-2727SLV Core i5 128GB Signature Edition Laptop' ],
        UPC: [ '884116165118' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 7,
    ASIN:
    [ 'B00VWCUBDG' ],
    ListPrice:
    [ { Amount: [ '99900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$999.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Newest-Model-Dell-Ultrabook-Computer/dp/B00VWCUBDG%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VWCUBDG' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51b7yDKI3lL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51b7yDKI3lL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/51b7yDKI3lL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        EAN: [ '0788679075160' ],
        EANList: [ [Object] ],
        Feature:
         [ 'This Certified Refurbished product is manufacturer refurbished, shows limited or no wear, and includes all original accessories plus a 180 day warranty.',
           'The World\'s Frst Infinity Display of 13.3" Full HD (1920 x 1080) Backlit WLED Screen',
           '5th Generation Broadwell Intel Core i3-5010U 2.10 GHz',
           '4GB DDR3 RAM / 128GB SSD / Intel HD Graphics 5500',
           'Windows 8.1 (64-bit), light weight only 2.6 lbs' ],
        HardwarePlatform: [ 'PC' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Computers' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Computers' ],
        Model: [ 'XPS13-9343' ],
        MPN: [ 'DELL XPS 13' ],
        OperatingSystem: [ 'Windows 8;' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'DELL XPS 13' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'COMPUTER' ],
        Publisher: [ 'Dell Computers' ],
        Studio: [ 'Dell Computers' ],
        Title: [ '2015 Newest Model Dell XPS13 Ultrabook Computer - the World\'s First 13.3" FHD WLED Backlit Infinity Display, 5th Gen Intel Core i3-5010U Processor 2.1GHz / 4GB DDR3 / 128GB SSD / Windows 8.1 (Certified Refurbished)' ],
        UPC: [ '788679075160' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 8,
    ASIN:
    [ 'B00SYEP70C' ],
    ListPrice:
    [ { Amount: [ '119999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,199.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/XPS13-9343-Ultrabook-Computer-Bluetooth/dp/B00SYEP70C%3FSubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00SYEP70C' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41mVtQg6bTL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41mVtQg6bTL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41mVtQg6bTL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'XPS' ],
        EAN: [ '0883246265651' ],
        EANList: [ [Object] ],
        Feature:
         [ 'The World\'s Frst Infinity Display of 13.3',
           '5th Generation Broadwell Intel Core i5-5200U 2.20 GHz with Turbo Boost Technology up to 2.70 GHz',
           '4GB DDR3 RAM / 128GB SSD / Intel HD Graphics 5500',
           'Exceptionally Long-Lasting Battery Life up to 15 hrs',
           'Windows 8.1 Professional (64-bit), light weight only 2.6 lbs' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Computers' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Computers' ],
        Model: [ 'XPS13 9343' ],
        OperatingSystem: [ 'Windows 8 Pro' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell Computers' ],
        Studio: [ 'Dell Computers' ],
        Title: [ '2015 Newest Model Dell XPS13 9343 Ultrabook Computer / the World\'s First 13.3" FHD WLED Backlit Infinity Display / 5th Gen Intel Core i5-5200U / 4GB DDR3 / 128GB SSD / Windows 8.1 Pro / Backlit Keyboard / Bluetooth' ],
        UPC: [ '883246265651' ],
        UPCList: [ [Object] ] } ],
      },{
    Item: 9,
    ASIN:
    [ 'B015PYYO0C' ],
    ListPrice:
    [ { Amount: [ '149999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,499.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Dell-XPS9350-5340SLV-Touchscreen-Generation-Microsoft/dp/B015PYYO0C%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB015PYYO0C' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41%2Bt2BscAjL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41%2Bt2BscAjL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41%2Bt2BscAjL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { AspectRatio: [ '16:9' ],
        Binding: [ 'Personal Computers' ],
        Brand: [ 'Dell' ],
        Color: [ 'Machined Aluminum' ],
        EAN: [ '0884116204282'] ,
        EANList: [ [Object] ],
        Feature:
         [ 'Intel Dual Core i7-6500U 2.5 GHz Processor',
           '8 GB LPDDR3',
           '256 GB SSD Storage; Optical Drive Not included',
           '13.3 Inch QHD+ (3200 x 1800 pixels) LED-lit Truelife Touchscreen',
           'Windows 10 Operating System; Machined Aluminum Chassis' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Dell Marketing USA, LP' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Dell Marketing USA, LP' ],
        Model: [ 'XPS9350-5340SLV' ],
        MPN: [ 'XPS9350-5340SLV' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 10' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'XPS9350-5340SLV' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Dell Marketing USA, LP' ],
        Studio: [ 'Dell Marketing USA, LP' ],
        Title: [ 'Dell XPS9350-5340SLV 13.3 Inch QHD+ Touchscreen Laptop (6th Generation Intel Core i7, 8 GB RAM, 256 GB SSD) Microsoft Signature Edition' ],
        UPC: [ '884116204282' ],
        UPCList: [ [Object] ],
        Warranty: [ '1 Year Mail In Service' ] } ],
      }
   ];
  var surfacepro = [{
    Item: 0,
    ASIN:
    [ 'B01606KJ6C' ],
    ListPrice:
    [ { Amount: [ '99900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$999.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Pro-Intel-Core/dp/B01606KJ6C%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01606KJ6C' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'No' ],
        EAN: [ '0889842014259' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Surface Pro 4 powers through everything you need to do, while being lighter than ever before',
           'The 12.3" PixelSense screen has extremely high contrast and low glare so you can work through the day without straining your eyes',
           'Go from tablet to laptop in a snap with the multi-position Kickstand and improved keyboard.' ],
        HardwarePlatform: [ 'PC' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft PC' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft PC' ],
        Model: [ 'CR5-00001' ],
        MPN: [ 'CR5-00001' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 10 Pro' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'CR5-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft PC' ],
        ReleaseDate: [ '2015-10-26' ],
        Size: [ '128 GB' ],
        Studio: [ 'Microsoft PC' ],
        Title: [ 'Microsoft Surface Pro 4 (128 GB, 4 GB RAM, Intel Core i5)' ],
        UPC: [ '889842014259' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 1,
    ASIN:
    [ 'B00KHR4T8U' ],
    ListPrice:
    [ { Amount: [ '99900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$999.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Intel-Core-Windows/dp/B00KHR4T8U%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00KHR4T8U' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41q1DCc5uyL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41q1DCc5uyL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41q1DCc5uyL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'Silver' ],
        EAN: [ '0885370757903' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Intel 4th Generation Core i5 Processor',
           '12-Inch HD (2160 x 1440) Touchscreen Display',
           '4 GB RAM; 128 GB Storage Capacity (97 GB Available)',
           'Windows 8.1 Pro',
           '36W Power Supply and Surface Pen Included; Keyboard sold separately' ],
        HardwarePlatform: [ 'PC' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft' ],
        Languages: [ [Object] ],
        LegalDisclaimer: [ 'Brand New in Retail Packing! Tax Free Anywhere!' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft' ],
        Model: [ 'MQ2-00001' ],
        MPN: [ 'MQ2-00001' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 8.1 Pro' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'MQ2-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft' ],
        Size: [ 'Without Dock' ],
        Studio: [ 'Microsoft' ],
        Title: [ 'Microsoft Surface Pro 3 (128 GB, Intel Core i5, Windows 8.1) - Free Windows 10 Upgrade' ],
        TradeInValue: [ [Object] ],
        UPC: [ '885370757903' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 2,
    ASIN:
    [ 'B00FF6J532' ],
    ListPrice:
    [ { Amount: [ '44900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$449.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-2-32-GB/dp/B00FF6J532%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00FF6J532' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41wmWZMMucL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41wmWZMMucL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41wmWZMMucL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'Magnesium' ],
        EAN: [ '0885370620467' ],
        EANList: [ [Object] ],
        Feature:
         [ 'NVIDIA Tegra 4, 2Gb System Memory 32GB Hard Drive',
           'SD Card Slot, 1 x USB 3.0, HDMI Output, Windows RT 8.1, Touchscreen, Internal Speakers',
           '10.6" High-definition widescreen 5-point multitouch with ClearType technology (1920 x 1080)',
           'Front Facing 2.5MP camera, Rear Facing 5.0MP Camera' ],
        HardwarePlatform: [ 'PC' ],
        IsAutographed: [ '0' ],
        IsEligibleForTradeIn: [ '1' ],
        IsMemorabilia: [ '0' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft Surface' ],
        Languages: [ [Object] ],
        LegalDisclaimer: [ 'The seal is open, but it is new.' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft Surface' ],
        Model: [ 'P3W-00001' ],
        MPN: [ 'P3W-00001' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows RT 8.1' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'P3W-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft Surface' ],
        Size: [ '32 GB' ],
        Studio: [ 'Microsoft Surface' ],
        Title: [ 'Microsoft Surface 2 (32 GB)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '602963000006' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 3,
    ASIN:
    [ 'B01606IDL0' ],
    ListPrice:
    [ { Amount: [ '129900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,299.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Pro-Intel-Core/dp/B01606IDL0%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01606IDL0' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'No' ],
        EAN: [ '0889842014389' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Surface Pro 4 powers through everything you need to do, while being lighter than ever before',
           'The 12.3" PixelSense screen has extremely high contrast and low glare so you can work through the day without straining your eyes',
           'Go from tablet to laptop in a snap with the multi-position Kickstand and improved keyboard.' ],
        HardwarePlatform: [ 'PC' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft PC' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft PC' ],
        Model: [ 'CR3-00001' ],
        MPN: [ 'CR3-00001' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 10 Pro' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'CR3-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft PC' ],
        ReleaseDate: [ '2015-10-26' ],
        Size: [ '256 GB' ],
        Studio: [ 'Microsoft PC' ],
        Title: [ 'Microsoft Surface Pro 4 (256 GB, 8 GB RAM, Intel Core i5)' ],
        UPC: [ '889842014389' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 4,
    ASIN:
    [ 'B00MGXZ4TQ' ],
    ListPrice:
    [ { Amount: [ '99999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$999.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Tablet-Dual-Core-Windows/dp/B00MGXZ4TQ%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00MGXZ4TQ' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413RWb02oVL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413RWb02oVL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413RWb02oVL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'Dark Titanium' ],
        EAN: [ '0727908818888' ],
        EANList: [ [Object] ],
        Feature:
         [ 'This product is manufacturer refurbished, shows limited or no wear, and includes all original accessories plus a 90-day warranty',
           '<br> IMPORTANT NOTE: </br> Please read the instructions on the box clearly to learn the working functinality of the product </br> Intel i5-3317U processor with Intel HD Graphics 4000',
           'Two 720p HD cameras, front and rear-facing, Wi-Fi (802.11a/b/g/n), Bluetooth 4.0',
           '10.6 inch ClearType HD Display, 1920 x 1080, 16:9 (widescreen), 10-point multi-touch',
           'Windows 8 Pro, 128 GB Internal Memory, 4GB Ram Memory' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft' ],
        Model: [ '9UR-00001RB' ],
        MPN: [ '9UR-00001RB' ],
        OperatingSystem: [ 'Windows 8 Pro' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ '9UR-00001RB' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft' ],
        Studio: [ 'Microsoft' ],
        Title: [ 'Microsoft Surface Pro 1 Tablet (128 GB Hard Drive, 4 GB RAM, Dual-Core i5, Windows 8 Pro) - Dark Titanium (Certified Refurbished)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '727908818888' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 5,
    ASIN:
    [ 'B00BDS3N1G' ],
    ListPrice:
    [ { Amount: [ '89999' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$899.99' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Tablet-Windows-Wi-Fi/dp/B00BDS3N1G%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00BDS3N1G' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413RWb02oVL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413RWb02oVL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/413RWb02oVL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'Dark Titanium' ],
        EAN: [ '0885370525564' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Intel Core i5 (3rd Gen) 3317U / 1.7 GHz Max Turbo Speed: 2.6 GHz (Dual-Core)',
           '4GB DDR3 SDRAM Memory',
           '16:9 Widescreen with 10-Point multi-touch touchscreen and Intel HD Graphics 4000',
           'Dual Cameras: 1.2 Megapixel (back), 1.2 Megapixel (front)',
           'Stylus Included - USB 3.0, Mini DisplaPort, Headphone output, MicroSDXC reader' ],
        HardwarePlatform: [ 'PC' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft' ],
        LegalDisclaimer: [ 'Microsoft Surface Pro with 64GB Memory\n\nIt\'s time for a tablet that\'s more than meets the eye. A feat of engineering and a work of art, Surface is a revolutionary new tablet from Microsoft. With casing made from ultra-light and highly durable magnesium, Surface will change the way you work and play.\n\nOperating System: Windows 8 Pro. Runs apps you are currently using on Windows 7 and can be managed by your enterprise IT group.\nProcessor: 3rd generation Intel Core i5 Processor with Intel HD Graphics 4000\nMemory: 4GB RAM-Dual Channel Memory\nStorage: 64 GB (approximately 29 GB available for user content), System software uses significant storage space. Available storage is subject to change based on system software updates and apps usage. 1 GB = 1 billion bytes.\nDisplay Screen: 10.6" ClearType HD Display, Resolution: 1920x1080, Aspect Ratio: 16:9 (widescreen), Touch: 10-point multi-touch Pen input: Pen input and Pen (included with purchase)\nWarranty: 1-year limited hardware warranty' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft' ],
        Model: [ '9SR-00001' ],
        MPN: [ '9SR-00001' ],
        OperatingSystem: [ 'Windows 8 professional' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ '9SR-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft' ],
        Size: [ '64' ],
        Studio: [ 'Microsoft' ],
        Title: [ 'Microsoft Surface Pro 64GB Tablet (4GB, Windows 8 Pro, Wi-Fi)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '885370525564' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 6,
    ASIN:
    [ 'B00N9ERISQ' ],
    ListPrice:
    [ { Amount: [ '44900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$449.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Windows-Certified-Refurbished/dp/B00N9ERISQ%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00N9ERISQ' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41UcIt6CrjL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41UcIt6CrjL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41UcIt6CrjL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'Black' ],
        EAN: [ '0616639936353' ],
        EANList: [ [Object] ],
        Feature:
         [ 'This Certified Refurbished product is manufacturer refurbished, shows limited or no wear, and includes all original accessories plus a 90 days limited hardware warranty.',
           'Surface 2 is powerful, yet ultra-thin and lightweight, weighs less than 1.5 pounds, 8.9mm thin.',
           'Comes preinstalled with Windows 8.1 and Microsoft Office 2013 RT, so you get Outlook, Word, Excel, PowerPoint, and OneNote right out of the box.',
           'Multiple ports. A microSDXC card reader lets you add up to 64GB of extra storage, video out port, full-size USB 3.0 port and Bluetooth 4.0.',
           'With an up to 10-hour battery that keeps you charged through the day. 7-15 days idle life, Charges in 2-4 hours with included power supply.' ],
        HardwarePlatform: [ 'Blank' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft' ],
        Model: [ 'P6W-00001' ],
        MPN: [ 'P6W-00001' ],
        OperatingSystem: [ 'Blank' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'P6W-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft' ],
        Size: [ '32 GB' ],
        Studio: [ 'Microsoft' ],
        Title: [ 'Microsoft Surface 2 32GB 10.6" Tablet Windows RT 8.1 (Certified Refurbished)' ],
        TradeInValue: [ [Object] ],
        UPC: [ '616639936353' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 7,
    ASIN:
    [ 'B00VGNZ4PG' ],
    ListPrice:
    [ { Amount: [ '49900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$499.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Tablet-10-8-Inch-Windows/dp/B00VGNZ4PG%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00VGNZ4PG' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41-3injGVRL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41-3injGVRL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41-3injGVRL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        Color: [ 'Silver' ],
        EAN: [ '0885370890457' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Windows 8.1, 10.8 iches Display',
           'Quad Core Intel® Atom(TM) x7-Z8700 processor (2MB Cache, 1.6GHz with Intel Burst(TM) technology up to 2.4GHz)',
           '2 GB RAM Memory, 64 GB Flash Memory (37 GB Available)',
           '1.37 pounds' ],
        HardwarePlatform: [ 'Unknown' ],
        IsEligibleForTradeIn: [ '1' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft PC' ],
        LegalDisclaimer: [ 'Seller not responsible for any warranty or IT issues.' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft PC' ],
        Model: [ '7G5-00001' ],
        MPN: [ '7G5-00001' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 8.1' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ '7G5-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft PC' ],
        ReleaseDate: [ '2015-05-05' ],
        Size: [ '64 GB' ],
        Studio: [ 'Microsoft PC' ],
        Title: [ 'Microsoft Surface 3 Tablet (10.8-Inch, 64 GB, Intel Atom, Windows 8.1) - Free Windows 10 Upgrade' ],
        TradeInValue: [ [Object] ],
        UPC: [ '885370890457' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 8,
    ASIN:
    [ 'B01605ZRBK' ],
    ListPrice:
    [ { Amount: [ '159900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$1,599.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Pro-Intel-Core/dp/B01605ZRBK%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB01605ZRBK' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/41bUyh9JvYL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'No' ],
        EAN: [ '0889842014518' ],
        EANList: [ [Object] ],
        Feature:
         [ 'Surface Pro 4 powers through everything you need to do, while being lighter than ever before',
           'The 12.3" PixelSense screen has extremely high contrast and low glare so you can work through the day without straining your eyes',
           'Go from tablet to laptop in a snap with the multi-position Kickstand and improved keyboard.' ],
        HardwarePlatform: [ 'PC' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft PC' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft PC' ],
        Model: [ 'CQ9-00001' ],
        MPN: [ 'CQ9-00001' ],
        NumberOfItems: [ '1' ],
        OperatingSystem: [ 'Windows 10 Pro' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ 'CQ9-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'TABLET_COMPUTER' ],
        Publisher: [ 'Microsoft PC' ],
        ReleaseDate: [ '2015-10-26' ],
        Size: [ '256 GB' ],
        Studio: [ 'Microsoft PC' ],
        Title: [ 'Microsoft Surface Pro 4 (256 GB, 8 GB RAM, Intel Core i7e)' ],
        UPC: [ '889842014518' ],
        UPCList: [ [Object] ] } ]
      },
      {
    Item: 9,
    ASIN:
    [ 'B00NPTS75I' ],
    ListPrice:
    [ { Amount: [ '79900' ],
        CurrencyCode: [ 'USD' ],
        FormattedPrice: [ '$799.00' ] } ],
    DetailPageURL:
    [ 'http://www.amazon.com/Microsoft-Surface-Tablet-Drive-Windows/dp/B00NPTS75I%3Fpsc%3D1%26SubscriptionId%3DAKIAIVPA5GTUYJPWZSHQ%26tag%3D799721652307%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00NPTS75I' ],
    SmallImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/419dX3Z1zpL._SL75_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    MediumImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/419dX3Z1zpL._SL160_.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    LargeImage:
    [ { URL: [ 'http://ecx.images-amazon.com/images/I/419dX3Z1zpL.jpg' ],
        Height: [ [Object] ],
        Width: [ [Object] ] } ],
    ItemAttributes:
    [ { Binding: [ 'Personal Computers' ],
        Brand: [ 'Microsoft' ],
        CatalogNumberList: [ [Object] ],
        Color: [ 'Dark Titanium - English' ],
        EAN: [ '0885370525571' ],
        EANList: [ [Object] ],
        Feature: [ 'Microsoft Srface Pro Tablet 128 GB Hard Drive, 4 GB RAM, Windows 8 Pro' ],
        HardwarePlatform: [ 'PC' ],
        IsAutographed: [ '0' ],
        IsEligibleForTradeIn: [ '1' ],
        IsMemorabilia: [ '0' ],
        ItemDimensions: [ [Object] ],
        Label: [ 'Microsoft' ],
        LegalDisclaimer: [ 'NO RETURNS' ],
        ListPrice: [ [Object] ],
        Manufacturer: [ 'Microsoft' ],
        MPN: [ '9UR-00001' ],
        OperatingSystem: [ 'Windows 8 professional' ],
        PackageDimensions: [ [Object] ],
        PackageQuantity: [ '1' ],
        PartNumber: [ '9UR-00001' ],
        ProductGroup: [ 'Personal Computer' ],
        ProductTypeName: [ 'NOTEBOOK_COMPUTER' ],
        Publisher: [ 'Microsoft' ],
        Size: [ '128' ],
        Studio: [ 'Microsoft' ],
        Title: [ 'Microsoft Surface Pro Tablet 128 GB Hard Drive, 4 GB RAM, Windows 8 Pro - ENGLISH' ],
        TradeInValue: [ [Object] ],
        UPC: [ '885370525571' ],
        UPCList: [ [Object] ] } ]
      }];


  return {
    all: function() {
      return items;
    },
    remove: function(item) {
      items.splice(items.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].Item === parseInt(itemId)) {
          return items[i];
        }
      }
      return null;
    },
    getTerm: function() {
      return search;
    },
    setTerm: function(inTerm) {
      search.term = inTerm;

      var req = {
        method: 'POST',
        url: 'https://saleshunt-api.herokuapp.com/itemSearch',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "Keyword": search.term
        }
      };

      $http(req).then(function successCallback(response) {
        console.log(response);
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
