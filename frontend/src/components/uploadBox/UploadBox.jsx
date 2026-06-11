import react from "react";
import { FaUpload } from "react-icons/fa";
import { useRef,useState } from "react";
import "./UploadBox.css"
import axios from "axios";

function UploadBox() {

    const [repoUrl, setRepoUrl] = useState("");
    const [file,setFile]=useState(null);
    const fileInputRef=useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange =(e)=>{
       const selectedFile=e.target.files[0];
       if(selectedFile){ console.log("Selected file:", selectedFile);setFile(selectedFile);}
    }

    const handleRepoAnalysis= async()=>{
        try{
            const response=await axios.post("http://localhost:3000/api/repository",{repoUrl});
            console.log(response.data);
        }catch(e){
            console.error(e);
        }
    }

    const handleDragOver=(e)=>{e.preventDefault();}
    const handleDragEnter=(e)=>{e.preventDefault();setIsDragging(true);}
    const handleDragLeave=(e)=>{e.preventDefault();setIsDragging(false);}
    const handleDrop=(e)=>{
        e.preventDefault();
        setIsDragging(false);
        const droppedFile=e.dataTransfer.files[0];
        if(droppedFile){
            console.log("drpped file:",droppedFile);
            setFile(droppedFile);
        }
    }

    return (
        <div>
            <div className="connect-repo-card">

                <h3>Connect Repository</h3>
                <div className="repo-input-container">
                    <input type="url" value={repoUrl} onChange={(e)=>setRepoUrl(e.target.value)} placeholder="https://github.com/usename/repository"></input>
                    <button onClick={handleRepoAnalysis}>ANALYSE</button>
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
                <div 
                   className={`upload-box ${isDragging?"dragging":""}`}
                   onClick={() => fileInputRef.current.click()}
                   onDragOver={handleDragOver}
                   onDragEnter={handleDragEnter}
                   onDragLeave={handleDragLeave}
                   onDrop={handleDrop}

                >
                    <div className="upload-content ">
                        <div className="upload-icon"><FaUpload /></div>
                        <h4>Upload ZIP File</h4>
                        <p>{file? file.name:"Drag and drop or click to browse"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadBox;