async function register() {
    const userName = document.querySelector('#nome').value
    const userEmail = document.querySelector('#email').value
    const userPassword = document.querySelector('#senha').value
    const passwordConfirmation = document.querySelector('#senhaConfirmada').value

    if (userName == "" || userEmail == "" || userPassword == "" || passwordConfirmation == ""){
        alert("Preencha todas as informações!")
        return
    }

    if (userPassword !== passwordConfirmation){
        alert("As senhas não conferem! Digite as senhas novamente!")
        document.querySelector("#senha").value = ""
        document.querySelector("#senhaConfirmada").value = ""
        return
    }

    const user = {
        userName,
        userEmail,
        userPassword

    }

    //enviar o objeto user para o back-end
}

const button = document.querySelector("form button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})