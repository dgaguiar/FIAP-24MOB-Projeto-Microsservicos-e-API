const express = require('express');
const router = express.Router();
const verificaToken = require("../middleware/jwt_verify");
const Financial = require('../model/financial');

router.post("/cadastroFinanceiro", verificaToken,(req,res) => {
    const dados = Financial(req.body);
    console.log(`DADOS: ${dados}`)
    dados.save().then((info, error)=>{
        res.status(201).send({output:`Dados Financeiros cadastrados`,payload:info});
    }).catch((erro)=>res.status(400).send({erro:`Erro ao tentar cadastrar ${erro}`}));
});

router.put("atualizar/:id", verificaToken, (req, res) => {
    if (error) {
        console.error(`Mongo error -> ${error}`);

        return res
            .status(400)
            .send({ message: 'Ocorreu um erro ao tentar atualizar estes dados financeiros!' });
    }
    Financial.findOneAndUpdate(req.params.id,req.body,{new:true},(erro,dados)=>{
        if(erro) res.status(400).send({output:`Erro ao tentar atualizar ${erro}`});
        res.status(200).send({output:`Atualizado`,payload:dados});
    });
});


router.get("contasCadastradas", verificaToken, (req, res) => {
    
});

module.exports = router;