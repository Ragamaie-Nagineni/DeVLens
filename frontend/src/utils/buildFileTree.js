function buildFileTree(files){
    const tree={};

    files.forEach(({file})=>{
        const parts=file.split("/");
        let current=tree;
        parts.forEach((part,index)=>{
            const isFile=index===parts.length-1;
            if(!current[part]){
                current[part] = isFile ? null : {};
            }
            if(!isFile){
                current=current[part];
            }
        })
    })
    return tree;
}
export default buildFileTree;