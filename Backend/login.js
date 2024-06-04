//fetch("http://localhost:5678/api/users/login")
//.then(reponse => reponse.json())
//.then (login => {
//    console.log(login)

    const email = "sophie.bluel@test.tld"
    const password = "S0phie"

    function verifierChamp(balise){
        if(balise.value === ""){
            balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
        } else {
            balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
        }
    }
    
    
    function verifierEmail(balise){
        let emailRegExp = new RegExp("[a-zA-Z._-]+@[a-zA-Z._-]+\\.[a-z]+")
    
        if (emailRegExp.test(balise.value) && balise.value === email){
            balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
        } else {
            balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
        }
    }

    function verifierPassWord(balise){

        if(balise.value === password){
            balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
        } else {
            balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
        }
    }
    
    
    function clickconnection(){
    
        const emailLogin = document.getElementById("emailLogin")
        const passWordLogin = document.getElementById("passWord")
        const connection = document.getElementById("connection")

        const divMessage = document.querySelector(".message")

    
        connection.addEventListener("click", (event) =>{
            event.preventDefault()

            if (emailLogin.value === email && passWordLogin.value === password){

                verifierChamp(emailLogin)
            
                verifierChamp(passWordLogin)
               
                if(divMessage.style.display === "flex"){

                    divMessage.innerHTML = ""

                    divMessage.style.display = "flex"
                    const textElement = document.createElement("p")
                    textElement.innerText = "Tout est bon!"

                    divMessage.appendChild(textElement)

                    console.log("bip!")
                } else {

                    divMessage.style.display = "flex"
                    const textElement = document.createElement("p")
                    textElement.innerText = "Tout est bon!"

                    divMessage.appendChild(textElement)
                }
            
            } else {

                verifierChamp(emailLogin)
            
                verifierChamp(passWordLogin)

                if(divMessage.style.display === "flex"){

                    divMessage.innerHTML = ""

                    divMessage.style.display = "flex"
                    const textElement = document.createElement("p")
                    textElement.innerText = "Le mail et le mot de passe est incorrect"
    
                    divMessage.appendChild(textElement)

                    console.log("boup!")
                } else {

                    divMessage.style.display = "flex"
                    const textElement = document.createElement("p")
                    textElement.innerText = "Le mail et le mot de passe est incorrect"
    
                    divMessage.appendChild(textElement)
                }

            }
           

        })
    }
    
    
    
    clickconnection()
//})

