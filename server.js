var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userDatabaseModel') //create and model loading
  Order = require('./api/models/orderDatabaseModel')
  bodyParser = require('body-parser');


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://seekku:seek123456@cluster0-sdrw5.gcp.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
  

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const URL = "mongodb+srv://seekku:seek123456@cluster0-sdrw5.gcp.mongodb.net/test?retryWrites=true";
function callback(err, result) {
  if (err) {
    throw err;
  }
}
mongoose.connect(URL, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
// mongoose.connect('mongodb://127.0.0.1:27017'); 


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/seekRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);