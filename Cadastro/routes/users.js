const express = require('express');
const router = express.Router();
const create_token = require('../utils/token');
const verificaToken = require("../middleware/auth");
const Cliente = require("../model/user")
const User = require('../model/user');
const ManagerUser = require('../model/manageruser');
const bcrypt = require('bcrypt')

// Function to Get user from DB send ID
router.get("/",(req,res) => {
    Cliente.find((erro,dados)=>{
        if(erro){
            return res.status(500).send({output:`Ocorreu um erro duarante o processo de sua requisição ${erro}`});
        }
        res.status(200).send({output:dados});
    })
});
// Function to send user data to and login feature
router.post("/login",(req,res)=>{
    const us = req.body.user;
    const ps = req.body.password;

    console.log(`usuario e senha ${us} - ${ps} `)
    
    User.findOne({nomeusuario:us}, (erro, data) => {

        console.log(data)
        if(erro) return res.status(400).send({output: 'Find user error'});
        if(!data) return res.status(404).send({output: 'Not Found'});
        console.log(`senha do banco ${data.senha}`)
        bcrypt.compare(ps, data.senha, (error, same)=> {
            if(!same) return res.status(400).send({output: 'Wrong Password'});
            const token = create_token(data._id, data.nomeusuario);
            const info = new ManagerUser({userid: data._id, username: data.nomeusuario, information: req.headers});
            info.save();
            res.status(200).send({output: 'Authenticated', payload: data, token:token});
        })
    })
})
// Function to send user data to record on DB
router.post("/cadastro",(req,res) => {
    console.log(`Senha ${req.body.senha}`)
    bcrypt.hash(req.body.senha, 10, (error, hashpass) => {
        if (error) {
            console.error(`Bcrypt error -> ${error}`);
            return res.status(500).send({ message: 'Ocorreu um erro ao tentar criptografar a senha do usuário!' });
        }
        req.body.senha = hashpass;

        const dados = Cliente(req.body);
        dados.save().then((info)=>{
       
        res.status(201).send({output:`Dados cadastrados`,payload:info})
    }).catch((erro)=>res.status(400).send({erro:`Erro ao tentar cadastrar ${erro}`}));
    })
    
});
// Function to update user data on DB
router.put("/atualizar/:id",verificaToken,(req,res)=>{
    Cliente.findOneAndUpdate(req.params.id,req.body,{new:true},(erro,dados)=>{
        if(erro) res.status(400).send({output:`Erro ao tentar atualizar ${erro}`});
        res.status(200).send({output:`Atualizado`,payload:dados});
    });
});

module.exports = router;