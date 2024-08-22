import axios from "axios";
import { GlobalContext } from "../Context/global-context";
import { useContext } from "react";


class UploadFilesService {
  upload(content, onUploadProgress) {
    let formData = new FormData();
   
    const {file,sectionId}= content
    formData.append("file", file);
    formData.append("sectionId", sectionId);
    formData.append("type", 'video');

    return axios.post("http://localhost:3006/api/v1/course/upload-content", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get("http://localhost:3006/api/v1/course/files");
  }
}

export default new UploadFilesService();