const Command = (name,fn) => {
    return (...args) => ({
        name,
        arguments: args,
        unsafeRun(){
            return fn(...args)
        }
    })
}

module.exports = Command;