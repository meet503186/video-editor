import React, { useState } from "react";
import UploadImageAndTextFile from "./components/UploadImageAndTextFile";
import "./App.css";
import Header from "./components/Header";
import UploadVideoAndTextFile from "./components/UploadVideoAndTextFile";
import MergeAllAndClearAll from "./components/MergeAllAndClearAll";

function App(props) {

  const [videoFilesPath, setVideoFilesPath] = useState([]);
  const [videoFilesPath1, setVideoFilesPath1] = useState([]);

  return (
    <div className="app">
      <Header />
      <div>
        <UploadImageAndTextFile videoFilesPath={videoFilesPath} setVideoFilesPath={setVideoFilesPath} />
        <UploadVideoAndTextFile videoFilesPath1={videoFilesPath1} setVideoFilesPath1={setVideoFilesPath1} />
        <MergeAllAndClearAll videoFilesPath={videoFilesPath} videoFilesPath1={videoFilesPath1} />
      </div>
    </div>
  );
}

export default App;
