const RESPONSE = require('../core/Response');

module.exports = (promise, params) => {
    return async (req, res, next) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            const result = await promise(...boundParams);
            res.json({"code": RESPONSE.SUCCESS.code, "msg": '', "data": result});
        } catch (error) {
            next(error);
        }
    }
}