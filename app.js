var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'customers'
});

connection.connect(function(err){
	if(err) console.log(err);
	console.log('Connected to database...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var server = app.listen(3000, "127.0.0.1", function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s:%s", host, port)
});

app.get('/customers', function(req,res){
	connection.query('select * from customer', function(error, results,fields){
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});

app.get('/customers/:id', function(req,res){
	console.log(req);
	connection.query('select * from customer where id=?',[req.params.id], function(error,results,fields){
		if(error) throw error;
		res.end(JSON.stringify(results));
	});
});

app.post('/customers', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO customer SET ?', postData, function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

app.put('/customers', function (req, res) {
   connection.query('UPDATE `customer` SET `customer_name`=? where `id`=?', [req.body.customer_name], function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
});

app.delete('/customers',function(req,res){
	console.log(req.body);
	connection.query('DELETE FROM `customer` WHERE `id`=?',[req.body.id],function(error,results,fields){
		if(error) throw error;
		res.end('Deleted')
	});
});



