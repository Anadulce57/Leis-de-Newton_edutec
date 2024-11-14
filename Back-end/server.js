
/* Importa as dependências */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require("jsonwebtoken")

/* Cria o servidor WEB */
const app = express();

// middlewares
app.use( bodyParser.json() );
app.use(cors());
app.use(express.json()) // receber informações do frontend

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
            
        }
    })
})

app.get("/", (request, response) => {
    response.json({message:"Hello World!"})
})

app.listen(3000, () =>{
    console.log('Servidor em execução na porta 3000!');
});