import { verificarTema, trocarTema } from "../../helpers/tema-helper.js";


const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")
const botaoJogarNovamente = document.querySelector(".botoes button")
const botaoSalve = document.querySelector(".botoes #salve")


botaoJogarNovamente.addEventListener("click", jogarNovamente)
botaoSalve.addEventListener("click", () => {
    
})

function inserirResultado() {
    const sectionPontuacao = document.querySelector(".titulo")
    const divAssunto = document.querySelector(".assunto")
    const pontos = localStorage.getItem("points")

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