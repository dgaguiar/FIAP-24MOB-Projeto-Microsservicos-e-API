const { status } = require("express/lib/response")
const jwt = require("jsonwebtoken")
const cfg = require("../config/config")

const auth = (req, res, next) => {
    const token_created = req.headers.token
    console.log(`TOKEN: ${token_created}`)
    if(!token_created){
        return res.status(400).send({output: 'Access denied'})
    }
    jwt.verify(token_created, cfg.jwt_key, (error,data)=> {
        console.log(`DATA: ${data.user}`)
        console.log(`ERRO: ${data.id}`)
        if(error){
            return res.status(401).send({output: 'Access denied'});
        }
        req.content = {
            id:data.id,
            user: data.user
        }
        console.log(`NEXT: ${data}`)
        return next();
    });
    
}

module.exports = auth;