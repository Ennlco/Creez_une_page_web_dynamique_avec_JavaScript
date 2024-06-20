const emailLogin = document.getElementById("emailLogin")
const passWordLogin = document.getElementById("passWord")
const btnConnection = document.getElementById("connection")

const divMessage = document.querySelector(".message")

btnConnection.addEventListener("click", (event) =>{
    event.preventDefault()

    const identifiant = {
        email: emailLogin.value,
        password: passWordLogin.value,
    }

    const chargeUtile = JSON.stringify(identifiant);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
        },
        body: chargeUtile,
    })
    .then(response => response.json())
    .then(data => {

        function verifierEmail(balise){
            let emailRegExp = new RegExp("[a-zA-Z._-]+@[a-zA-Z._-]+\\.[a-z]+")
        
            if (emailRegExp.test(balise.value)){
                balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
            } else {
                balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
            }
        }
        
        function verifierPassWord(balise){
        
            if(balise.value === ""){
                balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
            } else {
                balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
            }
        }

        verifierEmail(emailLogin)
        
        verifierPassWord(passWordLogin)
        
        if (data.token){

            const token = data.token
            const valeurToken = JSON.stringify(token)

            window.localStorage.setItem("token", valeurToken)

            document.location.href = "index.html"
        
        } else {

            if(divMessage.style.display === "flex"){

                divMessage.innerHTML = ""

                divMessage.style.display = "flex"
                const textElement = document.createElement("p")
                textElement.innerText = "Erreur dans l'identifiant ou le mot de passe"

                divMessage.appendChild(textElement)

            } else {

                divMessage.style.display = "flex"
                const textElement = document.createElement("p")
                textElement.innerText = "Erreur dans l'identifiant ou le mot de passe"

                divMessage.appendChild(textElement)
            }
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
})

