const config = require("./commands/config")
const list = require("./commands/list")
const clone = require("./commands/clone")
const noop = require("./commands/noop")
const help = require("./commands/help")

const getCommand = ({ command, arguments:args }) => {
    switch(command){
        case "help":
            return help(...args);
        case "list":
            return list(...args);
        case "config":
            return config(...args);
        case "clone":
            return clone(...args);
        default:
            return noop(command);
    }
}

module.exports = getCommand