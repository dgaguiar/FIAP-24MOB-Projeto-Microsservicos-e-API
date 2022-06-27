const { status } = require("express/lib/response")
const jwt = require("jsonwebtoken")
const cfg = require("../config/config")

const auth = (req, res, next) => {
    const token_created = req.headers.token

    if(!token_created){
        return res.status(401).send({output: 'Não há token. realize o processo de autenticação'})
    }
    jwt.verify(token_created, cfg.jwt_key, (error,data)=> {
        if(error) return res.status(403).send({output:`Problemas com o token -> ${error}`})

        req.content = {
            id:data.id,
            user: data.user
        }
        return next();
    });
}

module.exports = auth;