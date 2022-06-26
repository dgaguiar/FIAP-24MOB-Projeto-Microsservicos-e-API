const jwt = require("jsonwebtoken")
const cfg = require("../config/config")

const create_token = (id, user) => {
    return jwt.sign({id:id, user:user},cfg.jwt_key,{expireIn:cfg.jwr_expires})
}

module.exports = create_token;