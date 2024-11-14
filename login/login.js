async function login() {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#senha").value

    if(email === "" || password ==="") {
        alert("Preencha todos os campos!")
        return
    }

    const user = {
        email,
        password
    }

    const response = await fetch("https://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    }).then(response => response,json())

    if(response.ok) {
        console.log(response.token)
        localStorage.setItem(("token", response.token))
        window.location.href = "../index.html"
        return
    }

    alert(response.message)
    window.location.reload()
}

const button = document.querySelector("form button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    login()
})







/* function verifyToken(){
    const token = localStorage.getItem("token")

    if(!token) {
        window.location.href = "./login/login.html"
    }
}

verifyToken() */