var axios = require("axios");
var Where = process.argv[2];
var info = process.argv[3];
var info2 = process.argv[4];
var info3 = process.argv[5];
var info4 = process.argv[6];

if (typeof info2 !== "undefined"){
    info = info + " " + info2;
    if (typeof info3 !== "undefined" ){
        info = info + " " + info3;
        if (typeof info4 !== "undefined" ){
            info = info + " " + info4;
        }
    } 
}

switch(Where){
    case "movie":
        getmovie();
        break
    case "concert":
        getconcert();
        break
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
        
        var all = res.data

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

// fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${userAccessToken}`     
//   }
// })
// .then(response => response.json())
// .then(({beats})) => {
//   beats.forEach((beat, index) => {
//     console.log(`Beat ${index} starts at ${beat.start}`);
//   })
// }