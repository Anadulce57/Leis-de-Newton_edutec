import { verificarTema, trocarTema } from "../../helpers/tema-helper.js";


const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")
const botaoJogarNovamente = document.querySelector(".botoes button")
const botaoSalve = document.querySelector(".botoes #salve")

const token = localStorage.getItem("token")
const pontos = localStorage.getItem("points")

async function post() {

    const post = await fetch("https://3000-anadulce57-leisdenewton-ymjir8fiilv.ws-us117.gitpod.io/api/score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ pontos })
    }).then(response => response.json())
}


botaoJogarNovamente.addEventListener("click", jogarNovamente)
botaoSalve.addEventListener("click", () => {
    post()
})

function inserirResultado() {
    const sectionPontuacao = document.querySelector(".titulo")
    const divAssunto = document.querySelector(".assunto")
    

    sectionPontuacao.innerHTML = `
                <h1>Parabéns!</h1>
    
                <h2>Você acertou ${pontos} de 8 questões!</h2>
        
                <p>Quer tentar o quiz novamente, ou voltar para o home?</p>
    `
}

function jogarNovamente() {
    localStorage.removeItem("points")
    localStorage.removeItem("assunto")

    window.location.href = "../index.html"
}

inserirResultado()