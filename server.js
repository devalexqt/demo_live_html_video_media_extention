var http=require("http")
var os=require("os")
var netInt=os.networkInterfaces()
var fs=require("fs")
var streamer=require("./streamer.js")
var reader=require("./reader.js")
//var WebSocket=require("ws")

var server=http.createServer(function(req,res){
	console.log("==>new connection: "+req.connection.remoteAddress+", url: "+req.url)
	//res.end("Hi from Raspberry!")
	var filename=req.url=="/"?"/index.html":req.url
	var method=req.method.toLowerCase()
	//console.log("==>method: "+method)

if(method=="get"&&req.url!="/videostream.mp4"){
	var file=fs.createReadStream("www"+filename)
	file.on("error",function(err){
		console.log("Can't open file, err: "+err)
	})
	file.pipe(res)
}//if no videostream
	else if(method=="get"&&req.url=="/videostream.mp4"){
		console.log("==>video stream request....")
	}//videostream

}).listen(8080)

var stream

//socket.io
var io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.emit('data', { data: 'Hi from server' })

  socket.on('data', function (data) {
    console.log(data);
  })

  socket.on("start_stream",function(data){
  	console.log("==>start_stream")
  	startStream(socket)
  })//start stream

  socket.on("stop_stream",function(data){
  	console.log("==>stop_stream")
  	stopStream()
  })//start stream


})//io


function startStream(socket){
	console.log("==>starting stream...")
	//stream=new streamer.start(socket)
	stream=new reader.start(socket)

}//startStream
function stopStream(socket){
	console.log("==>stoping stream...")
	try{
		stream.kill()
	}catch(err){console.log(err)}
}//startStream
//websocket
//var wsServer=new WebSocket.Server({server})//{port:8081}
	
// 	wsServer.on("connection",function(ws){
// 		console.log("==>new ws client: ")


// 		ws.on("message",function(data){
// 			console.log("==>new ws message: "+data.toString())
// 			 	//ff_stream=new ffmpeg.start(wsServer)

// 			var j_data=JSON.parse(data.toString())
// 				if(j_data.action=="start_video"){
// 					console.log("==>starting video")
// 				ff_stream=new ffmpeg.start(wsServer)
// 				}//start video
// 				if(j_data.action=="stop_video"){
// 					console.log("==>stoping video")
// 					try{ff_stream.kill()}
// 					catch(e){console.log(e)}
// 				}//start video
// 		})//

// 		ws.on("close",function(){
// 			console.log("==>ws client closed: ")
// 		})//
	
// })//cconected socked

console.log("Server started from smb!")
console.log(netInt)
