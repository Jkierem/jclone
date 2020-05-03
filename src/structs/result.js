const Ok = (val) => {
    return {
        match(cases){
            return cases["Ok"](val)
        },
        get(){ return val; },
        map(f){ return Ok(f(val)) },
        open(f){ return f(val) },
        onError(f){ return val },
        isOk(){ return true },
        isErr(){ return false },
        concat(...x){ return Ok([val,x].flat())}
    }
}
const Err = (err) => {
    return {
        match(cases){
            return cases["Err"](err)
        },
        get(){ return err; },
        map(f){ return this },
        open(f){ return f(err) },
        onError(f){ return f(err) },
        isOk(){ return false },
        isErr(){ return true },
        concat(...e){ return Err([ err, e.map(r => r.get())].flat())}
    }
}

const Result = {
    Ok,Err,
    fromFalsy: val => val ? Ok(val) : Err(val),
    fromError: val => val instanceof Error ? Err(val) : Ok(val),
    try: f => {
        try {
            return Ok(f())
        } catch(e) {
            return Err(e)
        }
    }
}

module.exports = Result;