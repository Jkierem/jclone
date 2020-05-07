const https = require("https");
const Result = require("../structs/result");
const Maybe = require("../structs/maybe");
const Try = require("../structs/try");

const url = "https://api.github.com";
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'

const UnexpectedError = e => Result.Err({
    type: "Unexpected Error",
    error: e
})

const ParseError = e => Result.Err({
    type: "Parse Error",
    error: e,
})

const ContentTypeError = x => Result.Err({
    type: "Unsupported Content Type",
    contentType: x,
})

const StatusCodeNot200 = x => Result.Err({
    type: "Status Code Not 200",
    statusCode: x
})

const github = {
    repos(username,page=1,perPage=30){
        return new Promise(
            (resolve) => {
                https.get(`${url}/users/${username}/repos?per_page=${perPage}&page=${page}`,{
                    headers: {
                        'User-Agent' : userAgent
                    }
                },(res) => {
                    const errors = []
                    
                    if(res.statusCode !== 200){
                        errors.push(StatusCodeNot200(res.statusCode));
                    }

                    const contentType = res.headers["content-type"]
                    if(!/^application\/json/.test(contentType)){
                        errors.push(ContentTypeError(contentType))
                    }
                    
                    const maybeError = Maybe.fromArray(errors);

                    const body = []
                    const pushToBody = x => body.push(x);
                    res.on("data", pushToBody)
                    res.on("end", () => {
                        Try.from(() => {
                            const parsedBody = JSON.parse(Buffer.concat(body).toString());
                            maybeError.match({
                                Just: (e) => {
                                    const errs = e.map(e => e.get())
                                    resolve(Result.Err({
                                        statusCode: res.statusCode,
                                        contentType,
                                        body: parsedBody,
                                        errors: errs.map(x => x.type),
                                    }))
                                },
                                None: () => {
                                    resolve(Result.Ok(parsedBody))
                                }
                            })
                        }).catch(e => resolve(ParseError(e)))
                    })
                }).on("error", e => resolve(UnexpectedError(e)))
            }
        )
    }
}

module.exports = github