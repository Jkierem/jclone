const Just = x => ({
    match(cases){ return cases["Just"](x) },
    get(){ return x },
    map(f){ return Just(f(x)) },
    chain(f){ return f(x) },
    onNone(f){ return this },
    isJust(){ return true },
    isNone(){ return false }
})

const _None = {
    match(cases){ return cases["None"]() },
    get(){ return undefined },
    map(f){ return this },
    chain(f){ return f() },
    onNone(f){ return f() },
    isJust(){ return false },
    isNone(){ return true }
}

const Maybe = {
    Just,
    None: () => _None,
    fromFalsy: x => x ? Just(x) : _None,
    fromArray: x => x.length === 0 ? _None : Just(x),
    fromNullish: x => x === null || x === undefined ? _None : Just(x),
}

module.exports = Maybe