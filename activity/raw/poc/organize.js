let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function isFileOrNot(src) { // same as view function
    return fs.lstatSync(src).isFile();
}
function readContent(src) { // same as view function
    return fs.readdirSync(src);
}
function copyFile(src, desFolder) {
    // console.log("I will copy");
    if (fs.existsSync(desFolder) == false) { // to check whether file  name already exist or not
        fs.mkdirSync(desFolder); // it will create the file of same name
    }
    
    let fileName = path.basename(src) // it will give name of original file
    // console.log("dest ", path.join(desFolder, fileName))
    // exis
    fs.copyFileSync(src, path.join(desFolder, fileName)); 
}
function getdestName(src) {
    let ext = src.split(".").pop(); // extract the extensions of the file
    for (let key in types) {
        for (let i = 0; i < types[key].length; i++) {
            if (ext == types[key][i]) {
                return key;
            }
        }
    }
    return "others";

}
function organize(src, dest) { // For traversing;similar to view function
    // file ->
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        // copy to organized files folder -> segregate 
        // identify 
        
        let folderName = getdestName(src); // get foldername in which i have to put my file
        // console.log(folderName, " -> ", src);
        // src/organized_files/media
        copyFile(src, path.join(dest, folderName));
    }
    else {
        // folder -> recursion
        // print
        // content read from os
        let fDirnames = readContent(src);
        // recursion 
        // console.log(fDirnames);
        for (let i = 0; i < fDirnames.length; i++) {
            let child = fDirnames[i];
            //    good practice??
            // let dirNamepath = src + "\\" + child;
            let dirNamepath = path.join(src, child);
            organize(dirNamepath, dest)
        }}}
function organizeFiles(src) {
    let destFolderPath = path.join(src, "organized_files"); // create organize file folder in src
    console.log(destFolderPath);
    if (fs.existsSync(destFolderPath) == false) {
        fs.mkdirSync(destFolderPath);
    }
    
    organize(src, destFolderPath); // deep copy all the files in organize file folder
}

organizeFiles(process.argv[2]); // path of the folder which we want to organize
// node mycli.js organize "f-path"