const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const urldb = "mongodb+srv://daianne:Daianne123@cluster0.v354wrt.mongodb.net/?retryWrites=true&w=majority"; // nao criado :(
mongoose.connect(urldb,{useNewUrlParser: true, useUnifiedTopology: true});

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

const Cliente = mongoose.model("user",table);

module.exports = Cliente