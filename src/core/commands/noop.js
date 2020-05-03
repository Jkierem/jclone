const Command = require('../../structs/command');

const noop = Command("No Op", (command) => {
    console.log(`Invalid Command: "${command}" not available. Use "help" for list of available commands`)
})

module.exports = noop;