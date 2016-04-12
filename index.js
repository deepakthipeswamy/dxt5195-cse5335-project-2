var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

var pg = require('pg');
var URL = "postgres://gepdnmtuztnrzl:Eg7HB4IM-AmQOYVNXCzqxHgCov@ec2-54-163-254-231.compute-1.amazonaws.com:5432/d3ir38jim2n0iq?ssl=true";

app.get('/db', function (request, response, done) {
  var d = request.query.ranking
  pg.connect(URL, function(err, client, done) {
  	client.query('SELECT * FROM world_popul where ranking = ' +d, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
       	//response.render('pages/db', {results: result.rows} ); 
       	finalRes = JSON.stringify(result.rows);
       	return response.send(finalRes);
       }
    });
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


