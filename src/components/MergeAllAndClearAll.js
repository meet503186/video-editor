import React, { useState } from "react";
import "../CSS/MergeAllAndClearAll.css";
import mergeAllVideo from "../functions/mergeAllVideo";

function MergeAllAndClearAll({ videoFilesPath, videoFilesPath1 }) {
  const onMergeAll = () => {
    document.querySelector(".merge-all-btn").textContent = "Merging...";
    mergeAllVideo(
      videoFilesPath,
      videoFilesPath1,

      ".merge-all-btn"
    );
  };

  return (
    <div className="merge-clear-all-container">
      <button className="clear-all-btn" onClick={() => window.location.reload()}>
        Clear All
      </button>
      <button className="merge-all-btn" onClick={() => onMergeAll()}>
        Merge All
      </button>
    </div>
  );
}

export default MergeAllAndClearAll;
