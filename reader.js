var fs=require("fs")

var g_fd//file descriptor
var interval

function start(socket){
	console.log("==>start readed....")
//var path="./frag_bunny.mp4"
var path="./360.webm"

fs.stat(path,function(err,stats){
if(err){console.log("err: "+err);return}
console.dir(stats)



fs.open(path, 'r', function(err, fd) {
  if(err){console.log("==Can't open file: "+err);return}
  	g_fd=fd
  console.log("==>opened file: "+path)
  	
  	var length=1024*5
	var buff=new Buffer(length)
	var bytes=0
	var percent=0
	var time=0//~how much seconds readed
	
	interval=setInterval(function(){
	fs.read(fd,buff,0,length,null,function(err,bytesRead,data){
		if(err){console.log(err);socket.emit({err:"Cant read file."});return}
		if(bytesRead==0){
			clearInterval(interval)
			console.log("==>read file end!")
			socket.emit("stream_end",{data:"stream end"})
			return
			fs.close(fd)
		}//read ends
		bytes+=bytesRead
		percent=bytes*100/stats.size
		time=60*percent/100
		console.log("==>file readed, bytes: "+bytes+"/"+bytesRead+", percent: "+percent.toFixed(2)+", sec: "+time.toFixed(2))
		socket.emit("nal_packet",data)
		//socket.emit("stream_end",{data:"stream end"})
	})  //read

},100)//setInterval




})//openfile
})//stats

socket.on("stop_stream",function(data){
	console.log("==>stop_stream")
	clearInterval(interval)
	fs.close(g_fd)
	socket.emit("stream_end",{data:"stream end"})
})//start stream

}//start

exports.start=start