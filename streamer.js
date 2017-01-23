var spawn = require('child_process').spawn;
const Split = require('stream-split');
var fs=require("fs")
const NALseparator    = new Buffer([0,0,0,1]);//NAL break

function start(socket){
console.log("==>>>>>start streaming")
	var proc

// var proc=spawn("ffmpeg",[
// 						//"-s","640x360",
// 						"-re",
// 						//"-framerate","30",
// 						//"-pixel_format","yuv420p",//"yuv420p",//yuyv422 
// 						//"-f","rawvideo",
// 						//"-i","/dev/video0",
// 						// "-c:v","h264_mmal",
// 						 "-i","./frag_bunny.mp4",
// 						 "-c","copy",
// 						 //"-reset_timestamps", "1",
// 						//"-c:v","libvpx",
// 						//"-b:v","1M",
// 						//"-s","640x360",
// 						//"-keyint_min", "90",
// 						//"-g", "90",
// 						//"-c:a", "libvorbis",
// 						//"-b:a", "64K",
// 						//"-s","1920x1080",
// 						//"-an",
// 						//"-profile:v","baseline",//baseline
// 						//"-vf","drawtext='fontfile=/home/pi/ffmpeg/freefont/FreeSans.ttf:text=%{localtime\}':fontsize=50:fontcolor=yellow@1:box=1:boxcolor=red@0.9:x=(w-tw)/2:y=10",
// 						"-loglevel","error",
// 						"-stats",
// 						//"-tune","zerolatency",
// 						//"-f","webm",
// 						//"-reset_timestamps", "1",
// 						"-movflags","isml+empty_moov+faststart",//+faststart//"frag_keyframe+empty_moov",
// 						//"-fflags","nobuffer",
// 						//"-frag_duration","5",
// 						"-y",
// 						//"cam_video.mp4"
// 						"-"
// 						])
    // var proc = spawn('raspivid', [//work!
    // 					'-t', '0',
    // 					'-o', '-',
    // 					"-n", // no preview
				// 	"-fl",//flush buffer to decrease latency
				// 	//"-awb","off",
				// 	"--drc","high",
				// 	"-vf",
    // 					'-w', 640,
    // 					'-h', 360,
    // 					'-fps', 30,
    // 					'-pf', "baseline"//'baseline'
    // 					]);

	//var rawstream=proc.stdout.pipe(new Split(NALseparator))
	
	//read data from file
	//ffmpeg -i 360.mp4 -c:v h264 -vprofile baseline -b:v 1M -s 640x360 -y baseline.h264
	var readStream=fs.createReadStream("./frag_bunny.mp4")//frag_bunny.mp4 360.mp4
	//var rawstream=readStream.pipe(new Split(NALseparator))

	// rawstream.on("data",function(data){
	// 	//broadcast(Buffer.concat([NALseparator, data]))
	// 	 socket.emit("nal_packet",Buffer.concat([NALseparator, data]))
	// 	//socket.send(Buffer.concat([NALseparator, data]))
	// })



	readStream.on("data",function(data){
		//broadcast(Buffer.concat([NALseparator, data]))
		 socket.emit("nal_packet",data)
		//socket.send(Buffer.concat([NALseparator, data]))
	})
	readStream.on("end",function(){
		//broadcast(Buffer.concat([NALseparator, data]))
		 socket.emit("stream_end",{data:"stream end"})
		//socket.send(Buffer.concat([NALseparator, data]))
	})

// function broadcast(data){
// 	stream.clients.forEach(function(socket) {
// 		socket.send(data,{ binary: true})
// 	})//clients
// }//broadcast

	// proc.stdout.on("data",function(data){
	// 	//console.log("==>sdtout: "+data.toString())
	// 	socket.emit("nal_packet",data)
	// })//on error


	// proc.stderr.on("data",function(data){
	// 	console.log("==>sdterr: "+data.toString())
	// 	//socket.emit("stream_end",{data:"stream end"})
	// })//on error

	// proc.on("close",function(code){
	// 	console.log("process exit with code: "+code)
	// 	socket.emit("stream_end",{data:"stream end"})
	// })//on close

return proc
}//start

exports.start=start