import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const mergeAllVideo = async (
  videoFilesPath,
  videoFilesPath1,
  curr_elem
) => {
  try {

    let allVideo = [...videoFilesPath, ...videoFilesPath1];

    console.log(allVideo);

    let res = await axios({
      method: "post",
      url: BaseUrl + "/merge_all_video",
      data: {
        video_file_path_list: allVideo
      },
    });

    let videoFilePath = await res.data.video_file_path;


    let curr_link_elem = document.createElement('a');

    curr_link_elem.href = `https://video-editor-api.herokuapp.com/download_file?file_path=${videoFilePath}`;

    curr_link_elem.click();


    document.querySelector(curr_elem).textContent = "Merged";

  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    document.querySelector(curr_elem).textContent = "Merge All";
  }, 2000);
};

export default mergeAllVideo;
