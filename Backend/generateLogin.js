function generationLogin(){
    const navigation = document.querySelector("nav ul")
    const modif = document.querySelector("section[id=portfolio] h2")

    navigation.innerHTML = ""

    const projets = document.createElement("li")
    projets.innerText = "projets"
    const contact = document.createElement("li")
    contact.innerText = "contact"
    const logout = document.createElement("li")
    logout.innerText = "logout"
    logout.className = "logout"
    const insta = document.createElement("li")
    const image = document.createElement("img")
    image.src = "./assets/icons/instagram.png"
    image.alt = "Instagram"

    navigation.appendChild(projets)
    navigation.appendChild(contact)
    navigation.appendChild(logout)
    navigation.appendChild(insta)
    insta.appendChild(image)

    const edit = document.createElement("p")
    edit.innerText = "modifier"
    modif.appendChild(edit)

}