const fs = require("fs");
const Result = require("../../structs/result");

const read = (path) => Result.try(() => fs.readFileSync(path));
const write = (path,data) => Result.try(() => { 
    fs.writeFileSync(path,data)
    return data
})

module.exports = {
    read, write
}