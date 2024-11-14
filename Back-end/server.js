
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
app.use(express.json()) // receber informações do frontend

/*Cria conexão com banco de dados */
const con = mysql.createConnection({
    host: 'sql10.freesqldatabase.com', // O host do banco. Ex: localhost
    user: 'sql10741352', // Um usuário do banco. Ex: user 
    password: 'C2DBZpI9aM', // A senha do usuário. Ex: user123
    database: 'sql10741352', // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    port: 5500,
});

con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})
/* Cria uma função do tipo post para a rota '/api/register' */
app.post('/api/register', (req, res) =>{
    const user = request.body.user

    console.log(user)
}); 

app.get("/", (request, response) => {
    response.json({message:"Hello World!"})
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

app.listen(5500, () =>{
    console.log('Servidor em execução na porta 5500!');
});