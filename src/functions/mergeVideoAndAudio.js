import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const mergeVideoAndAudio = async (
  videoFilesPath,
  audioFilesPath,
  setVideoFilesPath1,
  curr_elem_id,
  setPlayVideo,
  index,
  videoFilesPath1
) => {
  try {
    let res = await axios({
      method: "post",
      url: BaseUrl + "/merge_video_and_audio",
      data: {
        video_file_path: videoFilesPath[index],
        audio_file_path: audioFilesPath[index],
      },
    });

    let videoFilePath = await res.data.video_file_path;

    let newVideoFilesPath = [...videoFilesPath1];

    newVideoFilesPath[index] = videoFilePath;

    console.log(BaseUrl + "/" + videoFilePath);

    setVideoFilesPath1(newVideoFilesPath);

    document.querySelectorAll(curr_elem_id)[index].textContent = "Merged";

    setPlayVideo(true);
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    document.querySelectorAll(curr_elem_id)[index].textContent = "Merge Image + Audio";
  }, 2000);
};

export default mergeVideoAndAudio;
