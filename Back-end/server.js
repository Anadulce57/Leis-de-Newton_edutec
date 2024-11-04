/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

/* Cria o servidor WEB */
const app = express();

// middlewares
app.use( bodyParser.json() );
app.use(cors());

/*Cria conexão com banco de dados */
const con = mysql.createConnection({
    host: 'sql10.freesqldatabase.com', // O host do banco. Ex: localhost
    user: 'sql10741352', // Um usuário do banco. Ex: user 
    password: 'C2DBZpI9aM', // A senha do usuário. Ex: user123
    database: 'sql10741352', // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    port: 3306
});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})

/** Cria uma função do tipo POST para a rota '/api/login' */
app.post('/api/login', (req, res) =>{
    const {email, password} = req.body;
    con.query('SELECT * FROM usuario WHERE email = ?', [email], (err, rows)=>{
        if(err) res.status(401).send('Usuário ou Senha inválidos');

        if(password == rows[0].senha){
            res.status(201).send('Autenticado');
            return;
        }

        res.status(401).send('Usuário ou Senha inválidos');
    });
})

app.post('/api/register-user', (req, res) =>{
    const {name, email, password, password_confirmation} = req.body;

    // Validar se todos os campos foram preenchidos. Se não, recusar o cadastro.

    // Validar se senha (password) e confirmação de senha (password_confirmation)
    // são iguais. Se não, informar o usuário

    // Se as validações acima passarem, INSERIR no banco de dados


    con.query('SELECT * FROM usuario WHERE email = ?', [email], (err, rows)=>{
        if(err) res.status(401).send('Usuário ou Senha inválidos');

        if(password == rows[0].senha){
            res.status(201).send('Autenticado');
            return;
        }

        res.status(401).send('Usuário ou Senha inválidos');
    });
})

app.get('/api/profile/:id_usuario', (req, res) => {
    const {id_usuario} = req.params;
    con.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario], (err, rows)=>{
        if(err) res.status(401).send('Usuário ou Senha inválidos');

        if(rows.length == 0){
            res.status(404).send('Usuário não encontrado');
            return;
        }

        res.status(200).send(rows[0]);
    });
});

app.listen(5000, () =>{
    console.log('Servidor em execução!');
});