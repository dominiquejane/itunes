var app = angular.module('itunes'); 
 
app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

    this.getArtist = function(artist, type) {
    	var deferred = $q.defer();
      if(type == 'all' || type === undefined) {
        $http({
        method: 'JSONP',
        url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      })
        .then(function(result){
        var songData = result.data.results;
        var songFilter = function(songData) {
          var songArray = [];
          for (var i = 0; i < songData.length; i++){ 
            var obj = {};
            obj.AlbumArt = songData[i].artworkUrl100;
            obj.Artist = songData[i].artistName;
            obj.Collection = songData[i].collectionName;
            obj.CollectionPrice = songData[i].collectionPrice;
            obj.Play = songData[i].previewUrl;
            obj.Type = songData[i].kind;
            songArray.push(obj);
          };
          return songArray;
         }
         // console.log(result.data.results);
        var artistResponse = songFilter(result.data.results);
        //console.log(artistResponse);
        deferred.resolve(artistResponse);
      })
      return deferred.promise;
    }
      
      else{
    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK&entity=' + type,
    	})
    	.then(function(result){
        var songData = result.data.results;
        var songFilter = function(songData) {
          var songArray = [];
          for (var i = 0; i < songData.length; i++){ 
            var obj = {};
            obj.AlbumArt = songData[i].artworkUrl100;
            obj.Artist = songData[i].artistName;
            obj.Collection = songData[i].collectionName;
            obj.CollectionPrice = songData[i].collectionPrice;
            obj.Play = songData[i].previewUrl;
            obj.Type = songData[i].kind;
            songArray.push(obj);
          };
          return songArray;
         }
         // console.log(result.data.results);
        var artistResponse = songFilter(result.data.results);
        //console.log(artistResponse);
    		deferred.resolve(artistResponse);
    	})
    	return deferred.promise;
    }
  }

    
});
