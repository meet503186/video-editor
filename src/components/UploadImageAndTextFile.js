import React, { useEffect, useState } from "react";
import DefaultImage from "../Images/default.png";
import VideoImage from "../Images/vid_Img.png";
import "../CSS/UploadImageAndTextFile.css";
import uploadToServer from "../functions/uploadToServer";
import createAudio from "../functions/createAudio";
import mergeImageAndAudio from "../functions/mergeImageAndAudio";
import VideoPlayer from "./VideoPlayer";

function UploadImageAndTextFile({ videoFilesPath, setVideoFilesPath }) {
  const [previewImages, setPreviewImages] = useState([DefaultImage]);
  const [imagesPath, setImagesPath] = useState([]);
  const [textFilesPath, setTextFilesPath] = useState([]);
  const [audioFilesPath, setAudioFilesPath] = useState([]);
  const [playVideo, setPlayVideo] = useState(false);
  const [containerCount, setContainerCount] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(-1);

  const selectImage = (index) => {
    document.querySelectorAll("#input-upload-image")[index].click();
  };

  const selectTextFile = (index) => {
    document.querySelectorAll("#input-upload-text-file")[index].click();
  };

  const onImageSelected = (event, index) => {
    const file = event.target.files[0];

    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      const preview_img = URL.createObjectURL(file);
      console.log(preview_img);

      let newPreviewImages = [...previewImages];

      newPreviewImages[index] = preview_img;

      setPreviewImages(newPreviewImages);

      document.querySelectorAll(".upload-image-btn")[index].textContent =
        "Uploading...";
      uploadToServer(
        file,
        ".upload-image-btn",
        imagesPath,
        "Upload Image",
        index
      );
    } else {
      alert("Please select only image of type png, jpg or jpeg");
    }
  };

  const onTextFileSelected = (event, index) => {
    const file = event.target.files[0];

    console.log(file);

    if (file.type === "text/plain") {
      document.querySelectorAll(".upload-text-file-btn")[index].textContent =
        "Uploading...";

      uploadToServer(
        file,
        ".upload-text-file-btn",
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
      document.querySelectorAll("#create-audio-btn")[index].textContent =
        "Creating...";
      createAudio(
        textFilesPath,
        setAudioFilesPath,
        "#create-audio-btn",
        index,
        audioFilesPath
      );
    } else {
      alert("Please upload transcript file first.");
    }
  };

  const onMergeImageAndAudio = (index) => {
    if (imagesPath[index] && audioFilesPath[index]) {
      document.querySelectorAll("#merge-image-and-audio-btn")[
        index
      ].textContent = "Merging...";

      mergeImageAndAudio(
        imagesPath,
        audioFilesPath,
        setVideoFilesPath,
        "#merge-image-and-audio-btn",
        setPlayVideo,
        index,
        videoFilesPath
      );

      setCurrentVideo(index);
    } else {
      alert("Please upload image and create audio first");
    }
  };

  const onAddMoreImage = () => {
    setContainerCount(containerCount + 1);
    let newPreviewImages = [...previewImages, DefaultImage];

    setPreviewImages(newPreviewImages);
  };

  // const PlayNewVideo = () => {
  //   return (
  //     <VideoPlayer
  //         videoFilePath={videoFilesPath[currentVideo]}
  //         setPlayVideo={setPlayVideo}
  //       />
  //   )
  // }

  // useEffect(() => {
  //   PlayNewVideo();
  //   console.log('called')
  // }, [currentVideo])

  return (
    <div id="upload-image-and-text-file-container">
      {previewImages.map((elem, index) => {
        return (
          <div className="container" key={index}>
            <div className="preview-image">
              <img src={previewImages[index]} alt="preview image" />
            </div>

            <div className="upload-data">
              <div className="upload-image">
                <input
                  type="file"
                  hidden
                  id="input-upload-image"
                  onChange={(event) => onImageSelected(event, index)}
                />
                <button
                  className="upload-image-btn"
                  onClick={() => selectImage(index)}
                >
                  Upload Image
                </button>
              </div>
              <div className="upload-text-file">
                <input
                  type="file"
                  hidden
                  id="input-upload-text-file"
                  onChange={(event) => onTextFileSelected(event, index)}
                />
                <button
                  className="upload-text-file-btn"
                  onClick={() => selectTextFile(index)}
                >
                  Upload Transcript
                </button>
              </div>
              <button
                id="create-audio-btn"
                onClick={() => onCreateAudio(index)}
              >
                Create Audio
              </button>
              <button
                id="merge-image-and-audio-btn"
                onClick={() => onMergeImageAndAudio(index)}
              >
                Merge Image + Audio
              </button>
            </div>
            <div
              className="preview-video"
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
      <div className="add-more-image-btn-container">
        <button className="add-more-image-btn" onClick={() => onAddMoreImage()}>
          Add More Image
        </button>
      </div>
      {playVideo ? (
        <VideoPlayer
          videoFilePath={videoFilesPath[currentVideo]}
          setPlayVideo={setPlayVideo}
        />
      ) : null}
    </div>
  );
}

export default UploadImageAndTextFile;
