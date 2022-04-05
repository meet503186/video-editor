import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const mergeImageAndAudio = async (
  imagesPath,
  audioFilesPath,
  setVideoFilesPath,
  curr_elem_id,
  setPlayVideo,
  index,
  videoFilesPath
) => {
  try {
    let res = await axios({
      method: "post",
      url: BaseUrl + "/merge_image_and_audio",
      data: {
        image_file_path: imagesPath[index],
        audio_file_path: audioFilesPath[index],
      },
    });

    let videoFilePath = await res.data.video_file_path;

    let newVideoFilesPath = [...videoFilesPath];

    newVideoFilesPath[index] = videoFilePath;

    console.log(BaseUrl + "/" + videoFilePath);

    setVideoFilesPath(newVideoFilesPath);

    document.querySelectorAll(curr_elem_id)[index].textContent = "Merged";

    setPlayVideo(true);
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    document.querySelectorAll(curr_elem_id)[index].textContent = "Merge Image + Audio";
  }, 2000);
};

export default mergeImageAndAudio;
