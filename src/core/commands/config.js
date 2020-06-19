const Command = require('../../structs/command');
const System = require('../internals/system');
const Maybe = require('../../structs/maybe');

const usage = `<action> [key] [value] \n\nFor more info on config actions run "jclone config help"`

const config = Command("config",usage,(...args) => {
    const [action, key, value] = args;
    if( action === "set" ){
        Maybe.fromArrayOfFalsy([ key, value ])
            .map(([ key, value]) => {
                const data = System.readData()
                data[key] = value;
                System.saveData(data);
            })
            .onNone(() => {
                console.error(`Missing arguments for action "set". Usage "set <key> <value>"`)
            })
    }else
    if( action === "get" ){
        Maybe.fromFalsy(key)
            .map(key => {
                const data = System.readData()
                console.log(data[key] !== undefined ? `${key}: ${data[key]}` : `${key} is not set`);
            })
            .onNone(() => {
                console.error(`Missing arguments for action "get". Usage "get <key>"`)
            })
    }else
    if( action === "list" ){
        const data = System.readData()
        Maybe.fromArray(Object.entries(data))
        .map( (arr) => {
            arr.map(([key,value]) => console.log(key, ":" , value))
        })
        .onNone(() => console.log(`No defined configuration keys`))
    }else
    if( action === "unset" ){
        Maybe.fromFalsy(key)
            .map((key) => {
                const data = System.readData()
                Maybe.fromNullish(data[key])
                .match({
                    Just: () => {
                        delete data[key];
                        console.log(`deleted "${key}"`)
                        System.saveData(data);
                    },
                    None: () => {
                        console.log(`"${key}" is not set on configuration`)
                    }
                })
            })
            .onNone(() => {
                console.error(`Missing arguments for action "unset". Usage "unset <key> "`)
            })
    }else
    if (action == "help"){
        console.log(
            `Available actions:\n`,
            `    list\n`,
            `    get <key>\n`,
            `    set <key> <value>\n`,
            `    unset <key>\n`
        )
    }
    else{
        console.error(`Action "${action}" not defined. Available actions: set, get, unset, list`)
    }
})

module.exports = config;