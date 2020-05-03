const list = require("./commands/list")
const noop = require("./commands/noop")

const getCommand = ({ command, arguments:args }) => {
    switch(command){
        case "list":
            return list(...args);
        default:
            return noop(command);
    }
}

module.exports = getCommand