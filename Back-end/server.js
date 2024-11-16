
/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require("jsonwebtoken")

/* Cria o servidor WEB */
const app = express();

const { SECRET_KEY } = process.env

// middlewares
app.use( bodyParser.json() );
app.use(cors());
app.use(express.json()) // receber informações do frontend

//Cria conexão com banco de dados 
const db = mysql.createPool({
    connectionLimit: 10, // Essa linha pra baixo dados do mysql
    host: "sql10.freesqldatabase.com",
    database:"sql10744660",
    user: "sql10744660" ,
    password: "37B5iMEzu4" 
})

/* Cria uma função do tipo post para a rota '/api/register' */
app.post('/api/register', (req, res) =>{
    const user = req.body.user

    console.log(user)
    
}); 

app.post("/login", (request, response) => {
    const user = request.body.user

    const searchCommand = `
        SELECT * FROM Users
        WHERE email = ?
    `

    db.query(searchCommand, [user.email], (error, data) => {
        if(error) {
            console.log(error)
            return
        }

        if(data.length === 0) {
            response.json({ message: "Não existe nenhum usuário cadastrado com esse e-mail!" })
            return
        }

        if(user.password === data[0].password) {
            const email = user.email
            const id = data[0].id

            const token = jwt.sign({ id, email }, SECRET_KEY, { expiresIn: "1h" })
            response.json({ token, ok: true })
            return
        }

        response.json({ message: "Credenciais inválidas! Tente novamente" })
    })
})

app.get("/", (request, response) => {
    response.json({message:"Hello World!"})
})

app.listen(3000, () =>{
    console.log('Servidor em execução na porta 3000!');
});