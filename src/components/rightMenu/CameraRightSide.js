import Axios  from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap'

function CameraRightSide() {

  let mediaRecorder
  const snap = () =>{
    let camera = document.querySelector(".focussedd");
    let canvas = camera?.querySelector(".cameraImageInput")
    let video = camera?.querySelector(".videoInput")
    let imageHolder = camera?.querySelector(".imageHolder")
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
    let dataURI = canvas.toDataURL("image/jpeg")
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
      let file = new File([dataArr], 'myPic9.jpg', {type: mime})
      console.log(file)
      return file
      //console.log(data)
    }

    let imageFile = urlToFile(dataURI)
    const formData = new FormData()
    formData.append('image', imageFile)
    Axios.post("http://67.217.61.253/uploadfiles/upload-image-to-drive/",
    formData).then((res)=>{
      console.log(res)
      console.log(res.data.file_url)
      canvas.remove()
      imageHolder.src = `${res.data.file_url}`
      imageHolder.style.display = "block"
      imageHolder.style.width = "100%"
      imageHolder.style.height = "100%"
      const imageLink = res.data.file_url
      if (imageLink.length) {
        let imageLinkHolder = camera?.querySelector(".imageLinkHolder")
        imageLinkHolder.textContent = res.data.file_url
        console.log(imageLinkHolder)
      }
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
      default:
        return ""
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
    let videoLinkHolder = camera?.querySelector(".videoLinkHolder")
    if(event.data && event.data.size > 0) {
      video.srcObject = null
      let vidUrl = event.data
      let file = new File([vidUrl], 'video.mp4', {type: 'video/webm;codecs=vp9,opus'})
      console.log(file)
      const formData = new FormData()
      formData.append('video', file)
      Axios.post("http://67.217.61.253/uploadfiles/upload-video-to-drive/", 
      formData
       ).then((res)=>{
      console.log(res)
      console.log(res.data.file_url)
      videoLinkHolder.textContent = res.data.file_url
      video.src = ""
      video.src = res.data.file_url
      if (videoLinkHolder) {
        videoLinkHolder.textContent = res.data.file_url
      }
      console.log(videoLinkHolder)
    })
    .catch((err) => {
      console.log(err);
    });
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

  function removeCamera() {
    const focusseddElmnt = document.querySelector(".focussedd");
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
    }
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
                style={{ marginBottom: "30px"  }}
                onClick={handleRecord}
              >
                Record
              </Button>
              <Button
                variant="secondary"
                // className="remove_button"
                className="remove_button"
                onClick={removeCamera}
              >
                Remove Camera
              </Button>
              </div>
    </div>
  )
}

export default CameraRightSide
