const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const auth = require('./middleware/jwt_verify');

const app = express();
app.use(express.json());

const cx = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fiap",
    port: "3306"
});

cx.connect((error, data) => {
    if(error) {
        console.error('Conection server is fail -> ${error.stack}} ');
        return;
    }
    console.log('Conection Information -> ${cx.threadId}');
})

app.post("/api/user/add", auth, (req, res)=> {
    cx.query("insert into tbclient set?", req.body, (error, results, fields) => {
        if (error) {
            res
            .status(400)
            .send({output: 'nao foi possivel'});
        }

        res.status(200).send({output: results});
    })
});

app.listen(5532, () => console.log("Servidor online na porta 5532"));
