import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const uploadToServer = async (file, curr_elem_class_name, paths, text, index) => {
  try {
    let formdata = new FormData();
    formdata.append("my_file", file);
    let res = await axios({
      method: "post",
      url: BaseUrl + "/upload_file",
      data: formdata,
      headers: {
        Accept: "multipart/form-data",
      },
    });

    let filePath = await res.data.file_path;

    // setPath(filePath);
    paths.push(filePath);

    document.querySelectorAll(curr_elem_class_name)[index].textContent = "Uploaded";
    console.log(res);
  } catch (error) {
    console.log(error);
    document.querySelectorAll(curr_elem_class_name)[index].textContent = "Not Uploaded";
  }

  setTimeout(() => {
    document.querySelectorAll(curr_elem_class_name)[index].textContent = text;
  }, 2000);
};

export default uploadToServer;
