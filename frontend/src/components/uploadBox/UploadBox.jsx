import react from "react";
import { FaUpload } from "react-icons/fa";
import { useRef,useState } from "react";
import "./UploadBox.css"

function UploadBox() {
    const [file,setFile]=useState(null);
    const fileInputRef=useRef(null);

    const handleFileChange =(e)=>{
       const selectedFile=e.target.files[0];
       if(selectedFile){ console.log("Selected file:", selectedFile);setFile(selectedFile);}
    }

    return (
        <div>
            <div className="connect-repo-card">

                <h3>Connect Repository</h3>
                <div className="repo-input-container">
                    <input type="url" placeholder="https://github.com/usename/repository"></input>
                    <button>ANALYSE</button>
                </div>
                <div className="or-divider">
                    <span>OR</span>
                </div>
                <input
                    type="file"
                    accept=".zip"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <div className="upload-box" onClick={() => fileInputRef.current.click()}>
                    <div className="upload-content ">
                        <div className="upload-icon"><FaUpload /></div>
                        <h4>Upload ZIP File</h4>
                        <p>Drag and drop or cick to browse</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadBox;