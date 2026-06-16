import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const git=simpleGit();

async function cloneRepository(repoUrl) {
    const jobId=crypto.randomUUID();
    const clonePath=path.join(
        process.cwd(),"temp","repositories",jobId
    )
    await fs.mkdir(clonePath,{recursive:true});
    await git.clone(repoUrl,clonePath);
    return {jobId,clonePath};
}

export default cloneRepository;