var http = require("http");

/* Create an HTTP server to handle responses */

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
    console.log(request, response)
}).listen(8888);

var my_client_id = 'aae181ff8f3b4139867cdd9c3809b2c8'; 
var client_secret = 'b2f2b0943d224c948e42edcdf89da630'; 

app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });