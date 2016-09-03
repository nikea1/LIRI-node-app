//get twitter keys and twitter request
var twitterkeys = require("./keys.js");
keys = twitterkeys.twitterKeys;
//var TwitterRequest = require("TwitterRequest");
var TwitterTest = require("twitter");
var oAuth = {
	// Mandatory
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,

	// Optional
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
}

console.log(oAuth.consumer_key);
console.log(oAuth.consumer_secret);
console.log(oAuth.access_token_key);
console.log(oAuth.access_token_secret);


//get request functions
var request = require("request");
var spotifyWebApi = require("spotify-web-api-node");



var command = process.argv[2];
var search = process.argv[3];

function run(command, search){
	switch(command){
		case "my-tweets":
			//insert reponse logic here
			//var twitter = new TwitterRequest(oAuth);
			var twitter = new TwitterTest(oAuth);

			twitter.get("statuses/user_timeline",{count: 20}, function(error, tweets, response){

				if(error) {
					console.log(error);
					return;
				}
				for(var i = 0; i < tweets.length; i++){
  					console.log(tweets[i].text);  // The favorites. 
  					console.log("---------------------------------------");
  				}
  				//console.log(response);  // Raw response object. 

			});

			console.log("im inside", command);

			break;
		case "spotify-this-song":

			var song = search;
			if(song == undefined) 
				song = "The Sign";
			//insert reponse logic here
			//console.log("im inside", command, "with", song);
			var spotify = new spotifyWebApi();

			spotify.searchTracks("track:"+song, { limit : 1, offset : 1 }).then(function(data){

				console.log('\n -------------------------------------------------------------------------\n');
				console.log('Artist:', JSON.stringify(data.body.tracks.items[0].artists[0].name, null, 2));
				console.log('Song:', JSON.stringify(data.body.tracks.items[0].name, null, 2));
				console.log('Preview Link', JSON.stringify(data.body.tracks.items[0].preview_url, null, 2));
				console.log('Album:', JSON.stringify(data.body.tracks.items[0].album.name, null, 2));
				console.log('\n -------------------------------------------------------------------------\n');

			}, function(err) {
    			console.log('Something went wrong!', err);
  			})
			
			break;

		case "movie-this":

			var movie = search;
			if(movie == undefined) 
				movie = "Mr. Nobody";
			
			//insert reponse logic here
			//console.log("im inside", command, "with", movie);
			var queryUrl = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=short&tomatoes=true&r=json';
			request(queryUrl, function(err, response, body){

				if(!err && response.statusCode == 200){
					movieInfo = JSON.parse(body);
					//console.log(movieInfo);
					
					console.log(movieInfo['Title']);
					console.log(movieInfo['Year']);
					console.log(movieInfo['Rated']);
					console.log(movieInfo['Country']);
					console.log(movieInfo['Language']);
					console.log(movieInfo['Plot']);
					console.log(movieInfo['Actors']);
					console.log(movieInfo['tomatoRating']);
					console.log(movieInfo['tomatoURL']);
				}
				else{
					console.log('query failed');
				}

			});

			break; //end of movie-this
		case "do-what-it-says":
			console.log("im inside", command);
			var fs = require("fs");
			fs.readFile('random.txt', 'utf-8', function(err, data){
				if(err){
					return console.log(err);
				}

				dataArr = data.trim().split(',');
				dataArr[1] = dataArr[1].replace(/"/g, "");
				console.log(dataArr);
				run(dataArr[0], dataArr[1]);
			});
			break;
		default:
			console.log("I'm sorry, I cannot recognize your command.");
			break;
	}

}

run(command, search);