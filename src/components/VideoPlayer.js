import React from "react";
import "../CSS/VideoPlayer.css";
import { BaseUrl } from "../BaseUrl";

function VideoPlayer(props) {
  return (
    <div className="video-player-container">
      <div className="video-player">
        <div className="video-player-header">
          <button
            className="close-btn"
            onClick={() => {
              props.setPlayVideo(false);
            }}
          >
            x
          </button>
        </div>
        <video src={BaseUrl + "/" + props.videoFilePath} controls />
      </div>
      <div
        className="overlay"
        onClick={() => {
          props.setPlayVideo(false);
        }}
      ></div>
    </div>
  );
}

export default VideoPlayer;
