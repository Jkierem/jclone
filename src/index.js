const parseArgs = require("./core/parser");
const getCommand = require("./core/getComand");

// validate args
const arguments = parseArgs(process.argv);
// decide on command to run
const command = getCommand(arguments);
// run command
command.unsafeRun();