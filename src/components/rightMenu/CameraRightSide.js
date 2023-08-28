import Axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import SelectAnsAndQuestion from '../selectAnsAndQuestion';
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useStateContext } from '../../contexts/contextProvider';
import useSelectedAnswer from "../../customHooks/useSelectedAnswers";

function CameraRightSide() {
  const [selectedType, setSelectedType] = useState('')
  const [addedAns, setAddedAns] = useState([])
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [searchParams] = useSearchParams();
  const { setConfirmRemove, confirmRemove, setIsLoading } = useStateContext()

  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  let mediaRecorder

  const camera = document.querySelector(".focussedd");
  let videoField = camera?.querySelector(".videoInput")
  let imageField = camera?.querySelector(".imageHolder")

  function openCam() {
    videoField.src = ""
    videoField.style.display = "block"
    imageField.style.display = "none"
    imageField.src = ""
    setIsCameraOn(true)
    let All_mediaDevices = navigator.mediaDevices;
    if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
      alert("Media not supported.");
      return;
    }
    All_mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
      .then(function (vidStream) {
        var video = videoField;
        if ("srcObject" in video) {
          video.srcObject = vidStream;
        } else {
          video.src = window.URL.createObjectURL(vidStream);
        }
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (e) {
        alert(e.name + ": " + e.message);
      });
  }

  const photo = () => {
    openCam();
  }

  const video = () => {
    openCam();
  }

  const snap = () => {
    let camera = document.querySelector(".focussedd");
    let canvas = camera?.querySelector(".cameraImageInput")
    let video = camera?.querySelector(".videoInput")
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    let context = canvas.getContext('2d')
    //Take a snap
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    //Stop streaming
    const mediaStream = video.srcObject
    const tracks = mediaStream.getTracks()
    tracks[0].stop()
    tracks[1].stop()
    video.remove()
    let dataURI = canvas.toDataURL("image/jpeg")
    let urlToFile = (url) => {
      let arr = url.split(",")
      let mime = arr[0].match(/:(.*?);/)[1]
      let data = arr[1]
      let dataStr = atob(data)
      let n = dataStr.length
      let dataArr = new Uint8Array(n)
      while (n--) {
        dataArr[n] = dataStr.charCodeAt(n)
      }
      let file = new File([dataArr], `'${decoded.details.update_field.document_name}'.jpg`, {type: mime})
      console.log(file)
      return file
      //console.log(data)
    }

    let imageFile = urlToFile(dataURI)
    const formData = new FormData()
    formData.append('image', imageFile)
    setIsLoading(true);
    Axios.post("https://dowellfileuploader.uxlivinglab.online/uploadfiles/upload-image-to-drive/",
      formData).then((res) => {
        setIsLoading(false);
        console.log(res)
        console.log(res.data.file_url)
        canvas.remove()
        const imageLink = res.data.file_url
        if (imageLink.length) {
          let imageLinkHolder = camera?.querySelector(".imageLinkHolder")
          imageLinkHolder.textContent = res.data.file_url
          console.log(imageLinkHolder)
          let videoLinkHolder = camera?.querySelector(".videoLinkHolder")
          videoLinkHolder.textContent = "video_link"
          imageField.src = imageLinkHolder.textContent
          imageField.style.display = "block"
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRecord = () => {
    let recordBtn = document.getElementById("recordBtn")
    switch (recordBtn.textContent) {
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
    if (video.srcObject === null) {
      video.srcObject = window.stream
    }
    mediaRecorder = new MediaRecorder(video.srcObject, { mimeType: 'video/webm;codecs=vp9,opus' })
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordVideo
  }

  const recordVideo = (event) => {
    let camera = document.querySelector(".focussedd");
    let video = camera?.querySelector(".videoInput")
    let videoLinkHolder = camera?.querySelector(".videoLinkHolder")
    if (event.data && event.data.size > 0) {
      video.srcObject = null
      let vidUrl = event.data
      let file = new File([vidUrl], `'${decoded.details.update_field.document_name}'.mp4`, { type: 'video/webm;codecs=vp9,opus' })
      console.log(file)
      const formData = new FormData()
      formData.append('video', file)
      setIsLoading(true);
      Axios.post("https://dowellfileuploader.uxlivinglab.online/uploadfiles/upload-video-to-drive/",
        formData
      ).then((res) => {
        setIsLoading(false);
        console.log(res)
        console.log(res.data.file_url)
        videoLinkHolder.textContent = res.data.file_url
        video.src = ""
        video.src = res.data.file_url
        if (videoLinkHolder) {
          videoLinkHolder.textContent = res.data.file_url
        }
        console.log(videoLinkHolder)
        let imageLinkHolder = camera?.querySelector(".imageLinkHolder")
        imageLinkHolder.textContent = "image_link"
      })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
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
    tracks[1].stop()
  }

  function removeCamera() {
    const focusseddElmnt = document.querySelector(".focussedd");
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {isCameraOn ? 
         <Button
         variant="primary"
         className="px-5"
         style={{ marginBottom: "30px" }}
         onClick={snap}
       >
         Capture
       </Button>:
      <Button
        variant="primary"
        className="px-5"
        style={{ marginBottom: "30px" }}
        onClick={photo}
        disabled = {decoded.details.action === "template" ? true : false}
        >
          Photo
        </Button>}
        { isCameraOn ? 
        <Button
        id="recordBtn"
        variant="primary"
        className="px-5"
        style={{ marginBottom: "30px" }}
        onClick={handleRecord}
      >
        Record
      </Button> : 
      <Button
      id="recordBtn"
      variant="primary"
      className="px-5"
      style={{ marginBottom: "30px" }}
      onClick={video}
      disabled = {decoded.details.action === "template" ? true : false}
    >
      Video
    </Button>}
        <div>
          <SelectAnsAndQuestion
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setAddedAns={setAddedAns}
            addedAns={addedAns} />
          <br />
        </div>
        <Button
          variant="secondary"
          // className="remove_button"
          className="remove_button"
          // onClick={removeCamera}
          onClick={() => setConfirmRemove(!confirmRemove)}
          disabled = {decoded.details.action === "document" ? true : false}
        >
          Remove Camera
        </Button>
      </div>
    </div>
  )
}

export default CameraRightSide
