import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Sideebar from "./Sideebar";

function Ajout() {
  const [files1, setFiles] = useState("");
  const [files2, setFiles1] = useState("");

  const OnChange = (e) => {
    setFiles(e.target.files1);
    setFiles1(e.target.files2);
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file,file1", files1, files2);
    axios
      .post("//localhost:3016/Adduser", data)
      .then((response) => {
        toast.success("Upload Success");
        console.log(response);
      })
      .catch((e) => {
        toast.error("Upload Error");
        console.log(e);
      });
  };

  return (
    <div>
      <div className="sidebar">
        <Sideebar />
      </div>
      <div className="ee">
        <form method="post">
          <fieldset>
            <div className="form-group files">
              <label>Upload Your File User </label>
              <input type="file" onChange={OnChange} className="form-control" />

              <label>Upload Your File VCF </label>
              <input type="file" onChange={OnChange} className="form-control" />
            </div>
            <div className="d-flex align-items-center flex-wrap justify-content-between">
              <input
                id="envoyer"
                type="button"
                onClick="OnSubmit()"
                value="Send"
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
