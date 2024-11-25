export async function verifyToken(url) {
    const token = localStorage.getItem("token")

    if(!token) {
        window.location.href = "./login/login.html"
        return
    }

    //verificar se o token é valido
    const response = await fetch("http://localhost:3000/verify", {
        headers: {
            "Authorization": token
        }
    }).then(response => response.json())

    if(!response.ok) {
        alert(response.message)
        window.location.href = "./login/login.html"
    }
}