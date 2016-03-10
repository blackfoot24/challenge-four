var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var faker = require('faker');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/challangeFour');

var Person = require('./models/person');

var peopleRouter = require('./routes/people');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'));


app.set('view engine', 'ejs');

var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  Person.find(function(err, data){
    if(err){
      console.log(err)
    } else {
      res.render('index', {index: data})
    }
  })
});


app.use('/api', peopleRouter);


app.listen(port, function(){
  console.log('app listening on ' + port);
});