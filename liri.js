var twitterkeys = require("./keys.js");
keys = twitterkeys.twitterKeys
//console.log(keys);

var command = process.argv[2];
var search = process.argv[3];
function run(command, search){
	switch(command){
		case "my-tweets":
			//insert reponse logic here
			console.log("im inside", command);
			break;
		case "spotify-this-song":
			var song = search;
			if(song == undefined) 
				song = "The Sign";
			//insert reponse logic here
			console.log("im inside", command, "with", song);
			break;
		case "movie-this":
			var movie = search;
			if(movie == undefined) 
				movie = "Mr. Nobody";
			//insert reponse logic here
			console.log("im inside", command, "with", movie);
			break;
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