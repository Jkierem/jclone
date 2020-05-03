const Command = require('../../structs/command');
const Github = require('../../middleware/github');

const list = Command("List", async (username,page=1) => {
    // middleware
    const res = await Github.repos(username,page);
    res.map(reps => console.log(reps.map(r => r.name)))
    .onError(e => console.error("Error retrieving repos:", e))
})

module.exports = list;