const Command = (name,usage,fn) => {
    return (...args) => ({
        name,
        usage,
        arguments: args,
        unsafeRun(){
            return fn(...args)
        }
    })
}

module.exports = Command;