const Command = require('../../structs/command');
const Maybe = require('../../structs/maybe');
const Github = require('../../middleware/github');
const System = require('../../core/internals/system');

const list = Command("list",'<username> [page] [perPage]',(username,page=1,perPage=30) => {
    Maybe.fromFalsy(username)
    .chain(m => {
        if( m === "auto" ){
            const data = System.readData()
            data["username"] === undefined && 
            console.error("No saved username. Try 'jclone config set username <username>'");
            return Maybe.fromFalsy(data["username"])
        } else {
            return Maybe.None()
        }
    })
    .map(async username => {
        const res = await Github.repos(username,page,perPage);
        res.map(reps => {
            console.log(`Repos of user ${username}...`)
            console.log(reps.map(r => r.name))
        })
        .onError(e => console.error("Error retrieving repos:", e))
    }).onNone(() => {
        console.error(
            "Please supply a username",
            `Usage: \n`,
            `   jclone list <username | "auto"> [page] [perPage]\n`
        )

    })
})

module.exports = list;