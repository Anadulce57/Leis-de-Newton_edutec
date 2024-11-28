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

app.post("/login", (request, response)  => {
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
        response.json({message:"Não existe nenhum usuário cadastrado com esse e-mail!"})
        return
    }

    if(user.password === data[0].password) {
        const email = user.email
        const id = data[0].id
        const token = jwt.sign({ id, email }, SECRET_KEY, {expiresIn: "1h"})
        response.json({token, ok: true})
        return;
    }

    response.json({ message: "Credêdncias invalidas! Tente novamente"})
   })
})

app.get("/verify", (request, response) => {
    const token = request.headers.authorization

    jwt.verify(token, SECRET_KEY,  (error) => {
        if (error) {
            response.json({ message: "Token inválido! Efetue o login novamente."})
            return
        }

        response.json({ ok: true })
    })
})

app.post('/api/score', (request, response) => {
    const user = req.body.user

    console.log(user)

    const insertComand = `
        INSERT INTO Score(score)
        VALUES(?)
    `
    db.query(insertComand, [user.userScore], (error) => {
        if(error){
            console.log(error)
            return
        }

        response.json({message: "Salvo com sucesso!"})
    })
        
});

app.post('api/ranking', (request, response) => {
    const searchCommand = `
    SELECT * FROM Score
    WHERE score = ?
    ORDER BY score DESC
    LIMIT 5
   `

   db.query(searchCommand, [user.email])
})

app.listen(3000, () =>{
    console.log('Servidor em execução na porta 3000!');
});