const Success = v => ({
    match(cases){
        return cases["Success"](v);
    },
    get: () => v,
    map: f => Success(f(v)),
    chain: f => f(v),
    catch: () => v,
    onFailure: () => v,
    isSuccess: () => true,
    isFailure: () => false,
})

const Failure = e => ({
    match(cases){
        return cases["Failure"](e);
    },
    get: () => e,
    map: f => Failure(f(e)),
    chain: f => f(e),
    catch: f => f(e),
    onFailure: f => f(e),
    isSuccess: () => false,
    isFailure: () => true,
})

const Try = {
    from: f => { 
        try { 
            return Success(f()) 
        } catch(e) { 
            return Failure(e) 
        } 
    },
    fromResult: r => r.match({ Ok: Success , Err: Failure })
}

module.exports = Try