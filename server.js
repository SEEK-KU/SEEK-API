var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userDatabaseModel') //create and model loading
  Order = require('./api/models/orderDatabaseModel')
  bodyParser = require('body-parser');

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


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/seekRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);