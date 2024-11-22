const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require("jsonwebtoken")

const app = express();

const {DB_HOST, DB_NAME, DB_USER, DB_PASSWORD} = process.env;
const { SECRET_KEY } = process.env

// middlewares
app.use( bodyParser.json() );
app.use(cors());
app.use(express.json()) // receber informações do frontend

//Cria conexão com banco de dados 
const db = mysql.createPool({
    connectionLimit: 10, // Essa linha pra baixo dados do mysql
    host: DB_HOST,
    database:DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD 
})

app.post('/api/register', (req, response) =>{
    const user = req.body.user

    console.log(user)

    const searchCommand = `
        SELECT * FROM Users
        WHERE email = ?
    `
    db.query(searchCommand, [user.userEmail], (error, data) => {
        if(error){
            console.log(error)
            return
        }

        if(data.length !== 0){
            response.json({message: "Já existe um usuário cadastrado com esse e-mail. Tente outro e-mail", userExists: true})
            return
        }

        const insertComand = `
             INSERT INTO Users(name, email, password)
             VALUES(?, ?, ?)
        `

        db.query(insertComand, [user.userName, user.userEmail, user.userPassword], (error) => {
            if(error){
                console.log(error)
                return
            }

            response.json({message: "Usuário cadastrado com sucesso!"})
        })
    })
}); 

app.listen(3000, () =>{
    console.log('Servidor em execução na porta 3000!');
});