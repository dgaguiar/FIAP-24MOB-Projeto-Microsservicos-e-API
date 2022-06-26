const express = require('express');
const router = express.Router();
const create_token = require('../utils/token');
const verificaToken = require("../middleware/auth");
const Cliente = require("../model/user")
const User = require('../model/user');
const ManagerUser = require('../model/manageruser');

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

    console.log('${us} - ${ps}')
    
    User.findOne({username:us}, (erro, data) => {
        console.log(data)
        if(erro) return res.status(400).send({output: 'Find user error'});
        if(!data) return res.status(404).send({output: 'Not Found'});

        bcrypt.compare(ps, data.password, (error, same)=> {
            if(!same) return res.status(400).send({output: 'Wrong Password'});
            const token = create_token(data._id, data.user);
            const info = new ManagerUser({userid: data._id, username: data.nomeusuario, information: req.headers});
            info.save();
            res.status(200).send({output: 'Authenticated', payload: data, token:token});
        })
    })
})
// Function to send user data to record on DB
router.post("/cadastro",(req,res) => {
    const dados = Cliente(req.body);
    dados.save().then((info)=>{
        res.status(201).send({output:`Dados cadastrados`,payload:info})
    }).catch((erro)=>res.status(400).send({erro:`Erro ao tentar cadastrar ${erro}`}));
});
// Function to update user data on DB
router.put("/atualizar/:id",verificaToken,(req,res)=>{
    Cliente.findOneAndUpdate(req.params.id,req.body,{new:true},(erro,dados)=>{
        if(erro) res.status(400).send({output:`Erro ao tentar atualizar ${erro}`});
        res.status(200).send({output:`Atualizado`,payload:dados});
    });
});
// Function to delete user data on DB
router.delete("/apagar/:id",verificaToken,(req,res)=>{
    Cliente.findByIdAndDelete(req.params.id,(erro,dados)=>{
        if(erro) return res.status(400).send({output:`Erro ao tentar apagar ${erro}`})
        res.status(204).send({output:`Cliente apagado`})
    })
});

module.exports = router;