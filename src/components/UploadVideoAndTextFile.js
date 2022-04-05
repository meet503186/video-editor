import React, { useEffect, useState } from "react";
import VideoImage from "../Images/vid_Img.png";
import "../CSS/UploadVideoAndTextFile.css";
import uploadToServer from "../functions/uploadToServer";
import createAudio from "../functions/createAudio";
import mergeVideoAndAudio from "../functions/mergeVideoAndAudio";
import VideoPlayer from "./VideoPlayer";

function UploadVideoAndTextFile({ videoFilesPath1, setVideoFilesPath1 }) {


  const [previewImages, setPreviewImages] = useState([VideoImage]);
  const [videoFilesPath, setVideoFilesPath] = useState([]);  
  const [textFilesPath, setTextFilesPath] = useState([]);
  const [audioFilesPath, setAudioFilesPath] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(-1);

  const selectVideo = (index) => {
    document.querySelectorAll("#input-upload-video1")[index].click();
  };

  const selectTextFile = (index) => {
    document.querySelectorAll("#input-upload-text-file1")[index].click();
  };

  const onVideoSelected = (event, index) => {
    const file = event.target.files[0];

    if (
      file.type === "video/mp4"
    ) {
      document.querySelectorAll(".upload-video-btn1")[index].textContent =
        "Uploading...";
      uploadToServer(
        file,
        ".upload-video-btn1",
        videoFilesPath,
        "Upload Video",
        index
      );
    } else {
      alert("Please select only video of type mp4");
    }
  };

  const onTextFileSelected = (event, index) => {
    const file = event.target.files[0];

    console.log(file);

    if (file.type === "text/plain") {
      document.querySelectorAll(".upload-text-file-btn1")[index].textContent =
        "Uploading...";

      uploadToServer(
        file,
        ".upload-text-file-btn1",
        textFilesPath,
        "Upload Transcript",
        index
      );
    } else {
      alert("Please select text file only of type txt.");
    }
  };

  const onCreateAudio = (index) => {
    if (textFilesPath[index]) {
      document.querySelectorAll("#create-audio-btn1")[index].textContent =
        "Creating...";
      createAudio(
        textFilesPath,
        setAudioFilesPath,
        "#create-audio-btn1",
        index,
        audioFilesPath
      );
    } else {
      alert("Please upload transcript file first.");
    }
  };

  const onMergeVideoAndAudio = (index) => {
    if (videoFilesPath[index] && audioFilesPath[index]) {
      document.querySelectorAll("#merge-image-and-audio-btn1")[
        index
      ].textContent = "Merging...";

      mergeVideoAndAudio(
        videoFilesPath,
        audioFilesPath,
        setVideoFilesPath1,
        "#merge-image-and-audio-btn1",
        setPlayVideo,
        index,
        videoFilesPath1
      );

      setCurrentVideo(index);
    } else {
      alert("Please upload image and create audio first");
    }
  };

  const onAddMoreVideo = () => {
    let newPreviewImages = [...previewImages, VideoImage];

    setPreviewImages(newPreviewImages);
  }

  return (
    <div id="upload-image-and-text-file-container">
      {previewImages.map((elem, index) => {
        return (
          <div className="container1" key={index}>
            <div className="preview-vid1">
              <img src={VideoImage} alt="preview video" />
            </div>

            <div className="upload-data1">
              <div className="upload-video1">
                <input
                  type="file"
                  hidden
                  id="input-upload-video1"
                  onChange={(event) => onVideoSelected(event, index)}
                />
                <button
                  className="upload-video-btn1"
                  onClick={() => selectVideo(index)}
                >
                  Upload Video
                </button>
              </div>
              <div className="upload-text-file1">
                <input
                  type="file"
                  hidden
                  id="input-upload-text-file1"
                  onChange={(event) => onTextFileSelected(event, index)}
                />
                <button
                  className="upload-text-file-btn1"
                  onClick={() => selectTextFile(index)}
                >
                  Upload Transcript
                </button>
              </div>
              <button
                id="create-audio-btn1"
                onClick={() => onCreateAudio(index)}
              >
                Create Audio
              </button>
              <button
                id="merge-image-and-audio-btn1"
                onClick={() => onMergeVideoAndAudio(index)}
              >
                Merge Video + Audio
              </button>
            </div>
            <div
              className="preview-video1"
              onClick={() => {
                if (videoFilesPath[index]) {
                  setPlayVideo(true);
                  setCurrentVideo(index);
                }
              }}
            >
              <img src={VideoImage} alt="preview video" />
            </div>
          </div>
        );
      })}
      <div className="add-more-video-btn-container">
        <button className="add-more-video-btn1" onClick={() => onAddMoreVideo()}>
          Add More Video
        </button>
      </div>
      {playVideo ? (
        <VideoPlayer
          videoFilePath={videoFilesPath1[currentVideo]}
          setPlayVideo={setPlayVideo}
        />
      ) : null}
    </div>
  );
}

export default UploadVideoAndTextFile;
