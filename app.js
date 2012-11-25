
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

var Connection = require('tedious').Connection;

  var config = {
    userName: 'sa',
    password: 'masterkey',
    server: '192.168.1.86',
  };

  var connection = new Connection(config);

  connection.on('connect', function(err) {
    // If no error, then good to go...
      //executeStatement();
      //executeSPEI();
    }
  );

  var TYPES = require('tedious').TYPES;
    var Request = require('tedious').Request;
/*
  function executeStatement() {
    request = new Request("select 42, 'hello world'", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
    });

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });

    connection.execSql(request);
  }

*/
function executeSPEI() {
	console.log('Ejecutando SPEI..');
	var sql = 'use dbspei; select * from historico_envio where folio =10';
    var request = new Request(sql, function(err,rowCount) {
    
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
    });
    request.on('row', function(columns) {
      console.log(columns.NOMBRE_ORDENANTE.value);
      columns.forEach(function(column) {
        //console.log('[' +column.value+']');
      });
    });

    connection.execSql(request);
  }

app.get('/', routes.index);
app.post('/base', function (req,res) {
	console.log('Estas en /base');
	executeSPEI();
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
