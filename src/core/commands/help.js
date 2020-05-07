const Command = require('../../structs/command');
const list = require("./list")

const version = "0.1";

const print = (...args) => console.log(...args.map(x => `${x}\n`))
const printUsage = ({ name, usage }) => print(`jclone ${name} ${usage}`);

const help = Command("help","",(command) => {
    switch(command){
        case "list":
            printUsage(list());
            break;
        default:
            print(
                `JClone cli v${version}`,
                `   Usage:`,
                `      jclone <command>`,
                ``,
                `   Available commands: help, list`
            )
            break;
    }
})

module.exports = help