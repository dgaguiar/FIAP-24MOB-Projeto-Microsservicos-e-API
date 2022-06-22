const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const table = new mongoose.Schema({
    nomeusuario: {type: String, unique: true},
    nomecompleto: {type: String},
    email: {type: String},
    telefone: {type: String},
    senha: {type: String},
    datacadastro: {type: Date, default:Date.now}
});

table.pre('save', function(next){
    let user = this
    if(user.isModified('senha'))return next()
    bcrypt.hash(user.senha, 10,(erro, hashpass) => {
        user.senha = hashpass
        return next()
    })

})

module.exports = mongoose.model('user',table)