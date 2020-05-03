const parseArgs = (argv) => {
    const [,, command , ...arguments] = argv;
    return {
        command,
        arguments
    }
}

module.exports = parseArgs