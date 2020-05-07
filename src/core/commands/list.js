const Command = require('../../structs/command');
const Maybe = require('../../structs/maybe');
const Github = require('../../middleware/github');

const list = Command("list",'<username> [page] [perPage]',(username,page=1,perPage=30) => {
    Maybe.fromFalsy(username)
    .map(async username => {
        const res = await Github.repos(username,page,perPage);
        res.map(reps => console.log(reps.map(r => r.name)))
        .onError(e => console.error("Error retrieving repos:", e))
    }).onNone(() => {
        console.error(
            "Please supply a username",
            `Usage: \n`,
            `   jclone list <username> [page] [perPage]\n`
        )

    })
})

module.exports = list;