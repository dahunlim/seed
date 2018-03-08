module.exports = (err, req, res, next) => {
    res.json({"code": err.code, "msg": err.msg, "data": err.data});
}