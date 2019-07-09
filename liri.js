require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var os = require("os");
var moment = require("moment");
var keys = require("./keys.js");

var Where = process.argv[2];
// var where is to know what information we will pulling

var info = process.argv.slice(3).join(" ");
// var info I splice process.argv so if user uses spaces it will be one word because of .join(" ")

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

    axios.get(link).then( (res) => {

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

    axios.get(link).then( (res) => {
        
        var all = res.data;

        if ( all.length == 0 ){
            return console.log("There are no upcomming concerts")
        }

        for ( e in all ){
            console.log(`Name of location: ${all[e].venue.name}`);
            console.log(`Where: ${all[e].venue.city}, ${all[e].venue.region}, ${all[e].venue.country}`);
            console.log(`When: ${moment(all[e].datetime).format("MM-DD-YYYY")}`)
            console.log("");
        }

    }).catch(function(err){
        console.log(err)
    })
}

function getsong() {

    var spotify = new Spotify(keys.spotify);

    spotify.search({type: "track", query: info}, (err, data) => {
        if (err){
            return console.log('Error: ' + err);
        }

        // all of the info i needeed was in here
        var better = data.tracks.items

        // making an object to send to spotifyInfo.txt
        var sendToFile = {
            one: one,
            two: two,
            three, three
        }

        // getting all results that var better gives us plus filtering it some more
        for (e in better){
            var one = `Artist Name: ${better[e].album.artists[0].name}`;
            var two = `Album Name: ${better[e].album.name}`;
            var three = `Released date: ${moment(better[e].album.release_date).format("MM-DD-YYYY")}`;    
            console.log(`Artist Name: ${better[e].album.artists[0].name}`);
            console.log(`Album Name: ${better[e].album.name}`);
            console.log(`Released date: ${moment(better[e].album.release_date).format("MM-DD-YYYY")}`);
            console.log("");
            var sendToFile = {
                one: one,
                two: two,
                three, three
            }
        }

        // adds first result to spotifyInfo.txt 
        fs.appendFile("spotifyInfo.txt", JSON.stringify(sendToFile)+os.EOL, (err) => {

            if (err){
                return console.log(err);
            }

            console.log(`first response got send to spotifyInfo.txt`);
        })

    })
}