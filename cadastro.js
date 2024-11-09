
async function register() {
    const userName = docuument.querySelector('#nome').value
    const userEmail = docuument.querySelector('#email').value
    const userPassword = docuument.querySelector('#senha').value
    const passwordConfirmation = document.querySelector('#senhaConfirmada').value

    if (userName == "" || userEmail == "" || userPassword == "" || passwordConfirmation == ""){
        alert("Preencha todas as informações!")
        return
    }

    if (userPassword !== passwordConfirmation){
        alert("As senhas não conferem!")
        return
    }

    const user = {
        userName,
        userEmail,
        userPassword

    }

    const resposta = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body:JSON.stringify({
            user
        })
    }).then(response => response.json())

    console.log(resposta)
}

const button = document.querySelector("form button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})