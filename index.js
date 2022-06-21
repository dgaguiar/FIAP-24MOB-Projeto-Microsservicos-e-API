const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cfg = require('./config/config');
const User = require('./model/user');
const ManagerUser = require('./model/manageruser');
const create_token = require('./utils/token');

const app = express();
app.use(express.json());
app.use(cors());

const url = database_url = "";

mongoose.connect(url,{userNewUrlParser: true, userUnifiedTopology:true});

app.get("/",(req, res)=>{
    res.send({output:req.headers});
});

app.post("/api/user/add", (req, res)=> {
    const data = new User(req.body);
    data.save().then((data) => {
        res.status(201).send({output:'New user Inserted', payload:data});
    }).catch((erro)=> res.status(400).send({output: 'Insertion Fail -> ${erro}'}))
});

app.post("/api/user/login", (req, res)=> {
    const us = req.body.user;
    const ps = req.body.password;

    console.log('${us} - ${ps}')
    
    User.findOne({username:us}, (erro, data) => {
        console.log(data)
        if(erro) return res.status(400).send({output: 'Find user error'});
        if(!data) return res.status(404).send({output: 'Not Found'});

        bcrypt.compare(ps, data.password, (error, same)=> {
            if(!same) return res.status(400).send({output: 'Find user error'});
            const token = create_token(data._id, data.user);
            const info = new ManagerUser({userid: data._id, username: data.username, information: req.headers});
            info.save();
            res.status(200).send({output: 'Authenticated', payload: data, token:token});

        })
    })
});

app.listen(4000, ()=> console.log('Servidor online in http://localhost:4000'));