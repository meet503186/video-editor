import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const createAudio = async (textFilesPath, setAudioFilesPath, curr_elem_id, index, audioFilesPath) => {
  try {
    let res = await axios({
      method: "post",
      url: BaseUrl + "/text_file_to_audio",
      data: {
        file_path: textFilesPath[index],
      },
    });

    let audioFilePath = await res.data.audio_file_path;

    let newAudioFilesPath = [...audioFilesPath];
    newAudioFilesPath[index] = audioFilePath;

    setAudioFilesPath(newAudioFilesPath);

    document.querySelectorAll(curr_elem_id)[index].textContent = "Created";

    window.open(BaseUrl + "/" + audioFilePath, "_blank");
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    document.querySelectorAll(curr_elem_id)[index].textContent = "Create Audio";
  }, 2000);
};

export default createAudio;
