import Axios  from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap'

function CameraRightSide() {

  let mediaRecorder
  const snap = () =>{
    let camera = document.querySelector(".focussedd");
    let canvas = camera?.querySelector(".imageInput")
    let video = camera?.querySelector(".videoInput")
    let linkHolder = camera?.querySelector(".link_holder")
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    let context = canvas.getContext('2d')
    //Take a snap
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    //Stop streaming
    const mediaStream = video.srcObject
    const tracks = mediaStream.getTracks()
    tracks[0].stop()
    video.remove()
    let dataURI = canvas.toDataURL("image/jpeg", 98)
    let urlToFile = (url) =>{
      let arr = url.split(",")
      let mime = arr[0].match(/:(.*?);/)[1]
      let data = arr[1]
      let dataStr = atob(data)
      let n = dataStr.length
      let dataArr = new Uint8Array(n)
      while(n--){
        dataArr[n] = dataStr.charCodeAt(n)
      }
      let file = new File([dataArr], 'image.jpg', {type: mime})
      console.log(file)
      return file
      //console.log(mime)
      //console.log(data)
    }
    let imageFile = urlToFile(dataURI)
    console.log(imageFile.name)
    const formData = new FormData()
    formData.append('image', imageFile)
    console.log(linkHolder)
    Axios.post("http://67.217.61.253/uploadfiles/upload-image-to-drive/",
    formData).then((res)=>{
      console.log(res)
      console.log(res.data.file_url)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleRecord = () => {
    let recordBtn = document.getElementById("recordBtn")
    switch(recordBtn.textContent) {
      case 'Record':
        recordBtn.textContent = 'Stop'
        startRecording();
        break;
      case 'Stop':
        recordBtn.textContent = 'Record';
        stopRecording();
        break;
    }
  }

  const startRecording = () => {
    let camera = document.querySelector(".focussedd");
    let video = camera?.querySelector(".videoInput")
    if(video.srcObject === null) {
      video.srcObject = window.stream
    }
    mediaRecorder = new MediaRecorder(video.srcObject, {mimeType: 'video/webm;codecs=vp9,opus'})
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordVideo
  }

  const recordVideo = (event) => {
    let camera = document.querySelector(".focussedd");
    let video = camera?.querySelector(".videoInput")
    if(event.data && event.data.size > 0) {
      video.srcObject = null
      let vidUrl = event.data
      var reader = new FileReader();
      reader.readAsDataURL(vidUrl); 
      reader.onloadend = function() {
      var base64data = reader.result;                
      video.src = base64data
      console.log(video.src)
      let name = "myVid"
      Axios.post("http://67.217.61.253/uploadfiles/upload-video-to-drive/", {
        'video_data': base64data,
        'name': name
      }
       ).then((res)=>{
      console.log(res)
      console.log(res.data.file_url)
    })
    .catch((err) => {
      console.log(err);
    });
      }
    }
  }

  const stopRecording = () => {
    let camera = document.querySelector(".focussedd");
    let video = camera?.querySelector(".videoInput")
    mediaRecorder.stop()
    const mediaStream = video.srcObject
    const tracks = mediaStream.getTracks()
    tracks[0].stop()
  }

  return (
    <div>
       <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <Button
                variant="primary"
                className="px-5"
                style={{ marginBottom: "30px" }}
                onClick = {snap}
              >
                Capture
              </Button>
              <Button
                id="recordBtn"
                variant="primary"
                className="px-5"
                style={{ marginRight: "" }}
                onClick={handleRecord}
              >
                Record
              </Button>
              </div>
    </div>
  )
}

export default CameraRightSide
