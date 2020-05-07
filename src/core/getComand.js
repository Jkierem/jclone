const list = require("./commands/list")
const noop = require("./commands/noop")
const help = require("./commands/help")

const getCommand = ({ command, arguments:args }) => {
    switch(command){
        case "help":
            return help(...args);
        case "list":
            return list(...args);
        default:
            return noop(command);
    }
}

module.exports = getCommand