const RES_CODE = require('../core/Response').code;

module.exports = (promise, params) => {
    return async (req, res, next) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            const result = await promise(boundParams);
            res.json({"code": RES_CODE.SUCCESS, "msg": '', "data": result});
        } catch (error) {
            next(error);
        }
    }
}