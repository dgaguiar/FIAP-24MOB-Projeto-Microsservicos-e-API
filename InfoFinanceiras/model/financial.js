const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const urldb = "mongodb+srv://daianne:Daianne123@cluster0.zl8x3wf.mongodb.net/?retryWrites=true&w=majority"; // nao criado :(
mongoose.connect(urldb,{useNewUrlParser: true, useUnifiedTopology: true});

const table = new mongoose.Schema({
    nome_banco: {type: String},
    tipo_conta: {type: String},
    nome_titular: {type: String},
    limite_cartao: {type: String}
});

table.pre('save', function(next){
    let user = this
    if(user.isModified('senha'))return next()
    bcrypt.hash(user.senha, 10,(erro, hashpass) => {
        user.senha = hashpass
        return next()
    })
})

const Financial = mongoose.model("financeiro",table);

module.exports = Financial

