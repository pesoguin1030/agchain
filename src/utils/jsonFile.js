class JsonFile {
    GenerateJsonFileFromJsonObject(fileName,jsonObject){
        // create file in browser
        const json = JSON.stringify(jsonObject, null, 4);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }
}

const jsonFile = new JsonFile()
export default jsonFile;