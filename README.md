##Demo of MediaSource Extention for html5 video

It use html Media Source Extension for push data to buffer and then play decoded frames.   

##Implementation 
Add standart video element to html page.
```
<video id="video_id" controls autoplay ></video><p>
```
Create video MediaSource and listen to open buffer event.
```
var mimeCodec = 'video/webm; codecs="vorbis,vp8"'
//var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

  mediaSource = new MediaSource;
    video.src = URL.createObjectURL(mediaSource);
	console.log("==>is isTypeSupported: "+MediaSource.isTypeSupported(mimeCodec))
	mediaSource.addEventListener('sourceopen', sourceOpen);

```
Ready for open input buffer and push data to it.
```
function sourceOpen () {
  sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  }
```

Push received data to input buffer for decode frame.
```
socket.on("packet",function(data){
		sourceBuffer.appendBuffer(new Uint8Array(data))
		console.log("chunk: "+packet_num++)
})//data_packet
```
##Usage
Can't play low latency video (less 1s). Still buffering...  
Not support all codecs and formats what support standart html video element.  
In  Chrome Version 55.0.2883.87 m it still limited to numbers of codecs and very buggy.
```
GPU stats chrome://gpu/
```
