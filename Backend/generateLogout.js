function generationLogout(){

    const navigation = document.querySelector("nav ul")
    const portfolio = document.querySelector("section[id=portfolio] h2")

    navigation.innerHTML = ""

    const projets = document.createElement("li")
    projets.innerText = "projets"
    const contact = document.createElement("li")
    contact.innerText = "contact"
    const login = document.createElement("li")
    const loginPage = document.createElement("a")
    loginPage.innerText = "login"
    loginPage.className = "login"
    loginPage.href = "login.html"
    const insta = document.createElement("li")
    const image = document.createElement("img")
    image.src = "./assets/icons/instagram.png"
    image.alt = "Instagram"

    navigation.appendChild(projets)
    navigation.appendChild(contact)
    navigation.appendChild(login)
    login.appendChild(loginPage)
    navigation.appendChild(insta)
    insta.appendChild(image)

    portfolio.innerHTML = ""
    portfolio.innerText = "Mes Projets"

    const filtres = document.querySelector(".contentFiltrers")
    filtres.style.display = "flex"
    

}
