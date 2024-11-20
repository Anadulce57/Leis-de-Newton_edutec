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

    const response = await fetch("https://3000-anadulce57-leisdenewton-4lz9f1sa346.ws-us116.gitpod.io/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({user})
    }).then(response => response.json())

    alert(response.message)

    if(response.userExist) {
        window.location.reload()
        return
    }

    window.location.href = "../login/login.html"
}

const button = document.querySelector("form button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})