function verifierChamp(balise){
    if(balise.value === ""){
        balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
    } else {
        balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
    }
}


function verifierEmail(balise){
    let emailRegExp = new RegExp("[a-zA-Z._-]+@[a-zA-Z._-]+\\.[a-z]+")

    if (emailRegExp.test(balise.value)){
        balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
    } else {
        balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
    }
}


function clickconnection(){

    const emailLogin = document.getElementById("emailLogin")
    const passWord = document.getElementById("passWord")
    const connection = document.getElementById("connection")

    connection.addEventListener("click", (event) =>{
        event.preventDefault()
       
        verifierChamp(emailLogin)
        verifierEmail(emailLogin)
        
        verifierChamp(passWord)
    })
}



clickconnection()

