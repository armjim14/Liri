var axios = require("axios");
var Spotify = require('node-spotify-api');

var Where = process.argv[2];
var info = process.argv.slice(3).join(" ");

switch(Where){
    case "movie":
        getmovie();
        break
    case "concert":
        getconcert();
        break
    case "song":
        getsong();
        break;
    default: break
}

function getmovie(){

    var link = "https://www.omdbapi.com/?t=" + info + "&apikey=trilogy"

    axios.get(link).then(function (res){

        var all = res.data;
        var title = all.Title;
        var year = all.Released;
        var genre = all.Genre;
        var actors = all.Actors;
        var time = all.Runtime;
        var plot = all.Plot;
        console.log(`Title: ${title}`);
        console.log(`Released on: ${year}`);
        console.log(`Genre: ${genre}`);
        console.log(`Actors: ${actors}`);
        console.log(`Runtime: ${time}`);
        console.log(`plot: ${plot}`);

    }).catch(function(err){
        console.log(err)
    })
}

function getconcert(){

    var link = "https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp"

    axios.get(link).then(function (res){
        
        var all = res.data;

        if ( all.length == 0 ){
            return console.log("There are no upcomming concerts")
        }

        for ( e in all ){
            console.log(`Name of location: ${all[e].venue.name}`);
            console.log(`Where: ${all[e].venue.city}, ${all[e].venue.region}, ${all[e].venue.country}`);
            console.log(`When: ${all[e].datetime}`)
            console.log("");
        }

    }).catch(function(err){
        console.log(err)
    })
}

function getsong() {
    var spotify = new Spotify({
        id: "aae181ff8f3b4139867cdd9c3809b2c8",
        secret: "b2f2b0943d224c948e42edcdf89da630"
      });

    spotify.search({type: "track", query: info}, function(err, data){
        if (err){
            return console.log('Error occurred: ' + err);
        }
        var better = data.tracks.items

        for (e in better){
        console.log(`Artist Name: ${better[e].album.artists[0].name}`);
        console.log(`Album Name: ${better[e].album.name}`);
        console.log(`Sporify URL: ${better[e].album.external_urls.spotify}`);
        console.log(`Released date: ${better[e].album.release_date}`);
        console.log("");
        }
    })
}