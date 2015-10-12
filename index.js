/**
 * simple example on how to POST data from
 * frontend to backend
 * this example writes an image see
 * http://stackoverflow.com/questions/5867534/how-to-save-canvas-data-to-file
 */
fs = require('fs'); //
var express = require('express'); // lets use express
var app = express(); // make the app
var bodyParser = require('body-parser'); // to parse the content of the POST
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var server = require('http').createServer(app); // create the server
var port = 3000;// this is our oort
// setup basic routing
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});
// this is the gist
// if the user hits save in the frontend this route is called
// and the data from the form gets posted
app.post('/save',function(req, res){
  console.log(req.body); // let us see what is in our whole body
  // replace the data:image thing with nothing
  var data = req.body.data.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64'); // new buffer with data
  // write the file async
  fs.writeFile(__dirname + '/public/images/image.png', buf, function(err){
    if(err === null){
      // if there is no error redirect the user to the root
      console.log('wrote file to /public/images/image.png'); // log what we have done
      // you could also show the image like this
      // res.send('Message received from <img src="/images/image.png">');
        res.redirect('/'); // redirect to the root
    }else{
      // log if we had an error
      console.error(err);
      res.send("Error writing file");
    }
  });
});
console.log("Server listening on port %s", port);
server.listen(port);
