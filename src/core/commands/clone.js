const { spawn } = require("child_process");
const Command = require('../../structs/command');
const System = require('../internals/system');
const Maybe = require("../../structs/maybe");

const getURL = (user,repo) => `https://github.com/${user}/${repo}`;

const clone = Command("clone","clone <repository> <cloneOptions>", (repo,...rest) => {
    Maybe.fromFalsy(repo)
    .map( repo => {
        const data = System.readData();
        Maybe.fromFalsy(data.username)
            .map( user => getURL(user,repo))
            .map( url => {
                const proc = spawn("git",["clone", url, ...rest], { stdio: ["inherit","pipe","inherit"]})
                proc.stdout.pipe(process.stdout);
                proc.once("exit", (code) => {
                    process.exit(code)
                })
            })
            .onNone(() => {
                console.error("No saved username. Try 'jclone config set username <username>'");
            })
    }).onNone(() => {
        console.error(`No repo name supplied.`)
    })
})

module.exports = clone