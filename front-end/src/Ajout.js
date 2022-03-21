import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UPLOAD_URL = "http://localhost:3017/api/analyse";

function Ajout() {
  const [files, setFiles] = useState([]);
  function onFileUpload(event) {
    event.preventDefault();
    // Get the file Id
    let id = event.target.id;
    // Create an instance of FileReader API
    let file_reader = new FileReader();
    // Get the actual file itself
    let file = event.target.files[0];
    setFiles([...files, { file_id: id, uploaded_file: file }]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userFile", files[0].uploaded_file);
    formData.append("chromosomeFile", files[1].uploaded_file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(UPLOAD_URL, formData, config)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div className="ee">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="form-group files">
              <label>Upload Your File User </label>
              <input
                type="file"
                onChange={onFileUpload}
                id={1}
                className="form-control"
              />

              <label>Upload Your File VCF </label>
              <input
                type="file"
                onChange={onFileUpload}
                id={2}
                className="form-control"
              />
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-between">
              <input
                id="envoyer"
                type="submit"
                // value="Send"
                className="btn btn-primary btn-style mt-4"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
export default Ajout;
