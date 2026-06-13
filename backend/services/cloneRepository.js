import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const git=simpleGit();

async function cloneRepository(repoUrl) {
    const jobID=crypto.randomUUID();
    const clonePath=path.join(
        process.cwd(),"temp","repositories",jobID
    )
    await fs.mkdir(clonePath,{recursive:true});
    await git.clone(repoUrl,clonePath);
    return(jobID,clonePath);
}

export default cloneRepository;