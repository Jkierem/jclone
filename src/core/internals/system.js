const path = require("path");
const file = require("./file");
const Result = require("../../structs/result");

const DATA = path.join(__dirname,"/data.json");
const readData = () => {
    return file.read(DATA)
        .chain(raw => Result.try(() => JSON.parse(raw)))
        .onError(() => {
            console.log("Saved data could not be loaded. Settings reset.");
            return {}
        })
}

const saveData = (data) => {
    return Result.try(() => JSON.stringify(data))
            .chain(str => file.write(DATA,str))
            .onError(e => {
                console.error("Error writing to file:",e);
                return false;
            })
}

module.exports = {
    readData,
    saveData
}