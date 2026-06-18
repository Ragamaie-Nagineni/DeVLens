import react from "react";
import { FaUpload } from "react-icons/fa";
import { useRef,useState } from "react";
import "./UploadBox.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadBox() {

    const [repoUrl, setRepoUrl] = useState("");
    const [file,setFile]=useState(null);
    const fileInputRef=useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange =(e)=>{
       const selectedFile=e.target.files[0];
       if(!selectedFile){return;}
       if(!validateZipFile(selectedFile)){alert("only zip files are allowed");return;}
       if(selectedFile){ console.log("Selected file:", selectedFile);setFile(selectedFile);}
    }

    const handleRepoAnalysis= async()=>{
        if(!repoUrl.trim()){alert("please enter a repo url");return;}
        if(!validateGithubUrl(repoUrl)){alert("please enter a valid github repository url");return;}
        try{
            const response=await axios.post("http://localhost:3000/api/repository",{repoUrl});
            //console.log(response.data);
            navigate("/repository",{
                state:{graph:response.data.graph},

            })
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
        if(!droppedFile){return;}
        if(!validateZipFile(droppedFile)){alert("only zip files are allowed");return;}
        if(droppedFile){
            console.log("drpped file:",droppedFile);
            setFile(droppedFile);
        }
    }

    const validateGithubUrl=(url)=>{
        try{
            const parsedUrl=new URL(url);
            return(
                parsedUrl.hostname==="github.com" && parsedUrl.pathname.split("/").length >=3
            );
        }catch{return false;}
    }
    const validateZipFile=(file)=>{
        if(!file){return false;}
        const filename=file.name.toLowerCase();
        return filename.endsWith(".zip");
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