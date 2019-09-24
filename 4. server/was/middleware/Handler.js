const Response = require('../core/Response');

module.exports = {

    request: (promise, params, isJson) =>
        async (req, res, next) => {
            const boundParams = params ? params(req, res, next) : [];
            try {
                const result = await promise(...boundParams);
                
                if (typeof isJson === 'undefined' || isJson) {
                    res.json({"code": Response.type.SUCCESS.code, "msg": '', "data": result});
                } else {
                    res.send(result);
                }
            } catch (error) {
                next(error);
            }
        },

    /**
     * Cross-Domain Request Settings
     */
    response: () =>
        (req, res, next) => {
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            next();
        },

    error: () =>
        (err, req, res, next) => res.json(err)
}
