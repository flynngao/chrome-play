
/**
 * Module dependencies.
 */

var express = require('express')
  , rotats = require('./routes/play')
  , checkin = require('./routes/checkin')
  , http = require('http')
  , path = require('path')
  ;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



app.get('/rotats', rotats.index);
app.use(express.static(__dirname + '/public'));
 app.get('/checkin', checkin.checkin);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
// socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection',function (socket) {

        socket.emit('news',{"stat":404});
        socket.on('feedback',function(data){
          // 现在是广播某个特定时间
          console.log(data);
           io.sockets.emit('news'+data.uuid ,data);
           console.log(data);
        });
});
