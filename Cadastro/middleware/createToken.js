const jwt = require('jsonwebtoken');

function gerarToken(id, usuario, email){
    return jwt.sign(
        {idusuario:id, nomeusuario:usuario, email:email},"informatica",{expiresIn:"1d"})
}
module.exports = gerarToken;