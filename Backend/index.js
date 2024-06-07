
// Récupération des travaux depuis l'API
fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then (travaux => {

    // Récupération de l'élément du DOM qui accueillera les fichiers
    const divGallery = document.querySelector(".gallery")

    // Fonction de création des travaux 
    function generationTravaux(travaux){
        
        for (let i = 0; i < travaux.length; i++){
            

            // Création d'une balise dédié à une pièce automobile
            const travauElement = document.createElement("figure")
            
            // On rattache la balise article à la section Fiche
            divGallery.appendChild(travauElement)
            
            // Création des balise image
            const imgElement = document.createElement("img")
            imgElement.src = travaux[i].imageUrl
            // Rattachement de la balises au DOM
            travauElement.appendChild(imgElement)
            
            // Création des balise image
            const titleElement = document.createElement("figcaption")
            titleElement.innerText = travaux[i].title
            // Rattachement de la balises au DOM
            travauElement.appendChild(titleElement)
            
        }
        
    }

    generationTravaux(travaux)

    // Gestion des filtres

    const fltTous = document.getElementById("choixTous")

    fltTous.addEventListener("click", function(){
        document.querySelector(".gallery").innerHTML = ""
        generationTravaux(travaux)
    })

    const fltObjets = document.getElementById("choixObjets")

    fltObjets.addEventListener("click",  function(){
        const objetsFiltrees = travaux.filter( function (travaux){
        return travaux.categoryId === 1
        })
        document.querySelector(".gallery").innerHTML = ""
        generationTravaux(objetsFiltrees)
    })

    const fltAppart = document.getElementById("choixAppartements")

    fltAppart.addEventListener("click",  function(){
        const appartFiltrees = travaux.filter( function (travaux){
            return travaux.categoryId === 2
        })
        document.querySelector(".gallery").innerHTML = ""
        generationTravaux(appartFiltrees)
    })

    const fltHotelRest = document.getElementById("choixHotels_Restaurants")

    fltHotelRest.addEventListener("click",  function(){
        const hotelRestoFiltrees = travaux.filter( function (travaux){
            return travaux.categoryId === 3
        })
        document.querySelector(".gallery").innerHTML = ""
        generationTravaux(hotelRestoFiltrees)
    })


    if (connection === true){

        generationLogin()


        const popUpGallery = document.querySelector(".backgroundPopUp")
        const clickModif = document.querySelector(".divModif")
        const photosGallery = document.querySelector(".photos")
        const popUp = document.querySelector(".PopUpGallery")
        

        function generationPhotos(travaux){

            for (let i = 0; i < travaux.length; i++){

                const divPhoto = document.createElement("div")
                photosGallery.appendChild(divPhoto)
                
                const imgPhoto = document.createElement("img")
                imgPhoto.src = travaux[i].imageUrl
                divPhoto.appendChild(imgPhoto)

                const icoDelete = document.createElement("i")
                icoDelete.className = "fa-solid fa-trash-can"
                divPhoto.appendChild(icoDelete)

            }
        }

        clickModif.addEventListener("click", () =>{
            popUpGallery.style.display = "flex"
            photosGallery.innerHTML = ""
            generationPhotos(travaux)
        })

        function closePopUp(){
            let clickCross = document.querySelector(".fa-xmark")
            clickCross.addEventListener("click", () =>{
                popUpGallery.style.display = "none"
                console.log("boup!")
            })
        }
        

        const clickAddProjet = document.querySelector(".addPhoto")

        clickAddProjet.addEventListener("click", () =>{
            popUp.innerHTML = ""

            const divTop = document.createElement("div")
            divTop.className = "topDiv"
            divTop.style.justifyContent = "space-between"
            popUp.appendChild(divTop)

            const back = document.createElement("i")
            back.className = "fa-solid fa-arrow-left"
            back.style.display = "flex"

            divTop.appendChild(back)

            const cross = document.createElement("i")
            cross.className = "fa-solid fa-xmark"
            divTop.appendChild(cross)

            const titlePopUp = document.createElement("h2")
            titlePopUp.innerText = "Ajout Photo"
            popUp.appendChild(titlePopUp)

            const divAdd = document.createElement("div")
            divAdd.className = "addPicture"
            popUp.appendChild(divAdd)

            const icoImage = document.createElement("i")
            icoImage.className = "fa-regular fa-image"
            divAdd.appendChild(icoImage)

            const inputAdd = document.createElement("input")
            inputAdd.type = "submit"
            inputAdd.id = "addPicture"
            inputAdd.value = "+ Ajouter photo"
            divAdd.appendChild(inputAdd)

            const textAdd = document.createElement("p")
            textAdd.innerText = "jpg, png : 4mo max"
            divAdd.appendChild(textAdd)

            const divInfo = document.createElement("div")
            divInfo.className = "divInfo"
            popUp.appendChild(divInfo)

            const titleAdd = document.createElement("label")
            titleAdd.for = "tilte"
            titleAdd.innerText = "Titre"
            divInfo.appendChild(titleAdd)

            const titleInput = document.createElement("input")
            titleInput.type = "text"
            divInfo.appendChild(titleInput)

            const categoryAdd = document.createElement("label")
            categoryAdd.for = "Categorie"
            categoryAdd.innerText = "Categorie"
            divInfo.appendChild(categoryAdd)

            const categorySelect = document.createElement("select")
            categorySelect.name = "categorySelect"
            divInfo.appendChild(categorySelect)

            const optionBase = document.createElement("option")
            optionBase.value = ""
            categorySelect.appendChild(optionBase)

            const option1 = document.createElement("option")
            option1.value = "Objet"
            option1.id = "selectObjet"
            option1.innerText = "Objet"
            categorySelect.appendChild(option1)

            const option2 = document.createElement("option")
            option2.value = "Appartements"
            option2.id = "selectAppartements"
            option2.innerText = "Appartements"
            categorySelect.appendChild(option2)

            const option3 = document.createElement("option")
            option3.value = "Hotels_Restaurants"
            option3.id = "selectHotels_Restaurants"
            option3.innerText = "Hotels & restaurants"
            categorySelect.appendChild(option3)

            const btnValidate = document.createElement("input")
            btnValidate.type = "submit"
            btnValidate.value = "Valider"
            btnValidate.id = "btnValidate"
            popUp.appendChild(btnValidate)

        })

        function goBack(){
            const clickUnder = document.querySelector(".fa-arrow-left")

            clickUnder.addEventListener("click", (event) =>{

                console.log("bip!")
                
                const cross = document.createElement("i")
                cross.className = "fa-solid fa-xmark"
                popUp.appendChild(cross)

                const titlePopUp = document.createElement("h2")
                titlePopUp.innerText = "Galerie Photo"
                popUp.appendChild(titlePopUp)

                const divAllPhoto = document.createElement("div")
                divAllPhoto.className = "photos"
                popUp.appendChild(divAllPhoto)

                generationPhotos(travaux)

                const btnAddPhoto = document.createElement("button")
                btnAddPhoto.type = "button"
                btnAddPhoto.className = "addPhoto"
                btnAddPhoto.innerText = "Ajouter une photo"
                popUp.appendChild(btnAddPhoto)
            })

        }

        goBack()
        closePopUp()
        
        function deconnection(){

            const deco = document.querySelector(".logout")

            deco.addEventListener("click", () =>{
                connection = false

                generationLogout()
            })

        }

        deconnection() 

    } else {
        
        generationLogout()

    }
})

