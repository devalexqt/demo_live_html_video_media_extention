//var socket = new WebSocket("ws://" + document.location.host)
//	socket.binaryType = "arraybuffer"
console.log(document.location.host)
var socket 
var video
var fps_display

var frame_list=[]
var frame_num=0//fps counter
var nal_packet_num=0
var first_picure=false

var mediaSource
var sourceBuffer//buffer to push packets
var stream_end=false


function initPage(){
	console.log("==> initPage")
	fps_display=document.getElementById("fps_id")
	video=document.getElementById("video_id")

	socket= io("http://"+document.location.host)
	
	socket.on("data",function(data){
		console.log("message: "+JSON.stringify(data))
	})//message

	socket.emit("data",{data:"Hi from client!"})




	socket.on("nal_packet",function(data){//nal_packet//message
		nal_packet_num++
		//frame_list.push(data)
		//sourceBuffer.appendBuffer(new Uint8Array(data))
			//player.decode(new Uint8Array(data),{frame:frame_num++})//frame_list.pop()
			//frame_list.push(data)
			//console.log("readyState: "+mediaSource.readyState);
			sourceBuffer.appendBuffer(new Uint8Array(data))
			console.log("chunk: "+nal_packet_num)

	})//nal_packet

	socket.on("stream_end",function(data){
		console.log("message: "+JSON.stringify(data))
		stream_end=true
		//mediaSource.endOfStream()
		//video.play()
	})//message

doit()
//requestAnimationFrame(test)
}//initPage
// function test(){
// 	console.log("==>test")
// 	//do anything
// 	requestAnimationFrame(test)
// }

function doit(){
///video
//'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
//'video/webm; codecs="vorbis,vp8"'
var mimeCodec = 'video/webm; codecs="vorbis,vp8"'
//var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
// bunny 42E01E //work
//360.mp4 42C01E
//video_sockets avc1.428028
//out_omx.mp4 428028

  mediaSource = new MediaSource;
  //console.log("readyState: "+mediaSource.readyState);
  video.src = URL.createObjectURL(mediaSource);
console.log("==>is isTypeSupported: "+MediaSource.isTypeSupported(mimeCodec))



  mediaSource.addEventListener('sourceopen', sourceOpen);



function sourceOpen () {
  console.log("==>sourceOpen... add buffer obj")
  console.log("readyState: "+mediaSource.readyState);
  sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  //sourceBuffer.appendBuffer(new Uint8Array(frame_list.shift()))

// onabort
// onerror
// onupdate
// onupdateend
// onupdatestart

sourceBuffer.addEventListener('abort', function (e) {
  	console.log("onabort...")
  	//console.dir(e)
  })

sourceBuffer.addEventListener('error', function (e) {
  	console.log("onerror... "+video.error)
  	console.dir(video.error)
  })

// sourceBuffer.addEventListener('update', function (e) {
//   	console.log("onupdate...")
//   	//console.dir(e)
//   })

// sourceBuffer.addEventListener('updateend', function (e) {
//   	console.log("onupdateend...")
//   	//console.dir(e)
//   })

// sourceBuffer.addEventListener('updatestart', function (e) {
//   	console.log("onupdatestart...")
//   	//console.dir(e)
//   })




  // sourceBuffer.addEventListener('updateend', function (_) {
  // 	console.log("updateend...");
  // 	//sourceBuffer.appendBuffer(new Uint8Array(frame_list.shift()))
  // 	//mediaSource.endOfStream();
  // 	      //video.play();
  //   // mediaSource.endOfStream();
  //   // video.play();
  // console.log("readyState: "+mediaSource.readyState);
  // });


  }//sourceOpen
console.dir(sourceBuffer)
}//doit

function startVideo(){
	console.log("==>startVideo..")
	socket.emit("start_stream",{action:"start_stream"})
	// setInterval(function(){
	// 	//console.log(frame_list.length)
	// 	if(frame_list.length>0){
	// 		//if(mediaSource.readyState=="open"){//||mediaSource.readyState=="ended"
	// 			sourceBuffer.appendBuffer(new Uint8Array(frame_list.shift()))
	// 			console.log("frame: "+frame_num++)
	// 		//}
	// 	}//if length
	// },500)



	// setTimeout(function(){
	// 	console.log("start pushing data...")

	// 	sourceBuffer.addEventListener('updateend', function (e) {
	// 	  	console.log("onupdateend...")
	// 	  	//console.dir(e)
	// 	  	if(!stream_end||frame_list.length>0){
	// 	  		var chunk=new Uint8Array(frame_list.shift())
	// 	  		if(chunk){
	// 	  			console.log("==> chunk to appendBuffer")
	// 	  			sourceBuffer.appendBuffer(chunk)
	// 	  		}//if chunk
	// 	  		else{
	// 	  			console.log("==>chunk empty")
	// 	  		}
	// 	  	}
	// 	  	else{
	// 	  		console.log("==>>>>>>>>>>>>>>>finish received data!")
	// 	  		mediaSource.endOfStream()
	// 	  		//video.paly()
	// 	  	}
	// 	  })//event
	// 	sourceBuffer.appendBuffer(new Uint8Array(frame_list.shift()))

	// },300)
}//startVideo

function stopVideo(){
	console.log("==>stopVideo")
	socket.emit("stop_stream",{action:"stop_stream"})
}//stopVideo