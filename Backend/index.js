
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
        const galleryPhoto = document.getElementById("galleryPhoto")
        const photosGallery = document.querySelector(".photos")
        const photoAdd = document.getElementById("photoAdd")

        const clickModif = document.querySelector(".divModif")
        const clickAddProjet = document.querySelector(".addPhoto")
        const clickClose1 = document.getElementById("close1")
        const clickClose2 = document.getElementById("close2")
        const clickUnder = document.querySelector(".fa-arrow-left")
        
        console.log(popUpGallery.style)
        function generationPhotos(travaux){

            for (let i = 0; i < travaux.length; i++){

                const divPhoto = document.createElement("div")
                divPhoto.style.backgroundImage = "url(" + travaux[i].imageUrl + ")"
                photosGallery.appendChild(divPhoto)

                const icoDelete = document.createElement("i")
                icoDelete.className = "fa-solid fa-trash-can"
                divPhoto.appendChild(icoDelete)

            }
        }
   
        clickModif.addEventListener("click", () =>{
            popUpGallery.style.display = "flex"
            galleryPhoto.style.display = "flex"
            photosGallery.innerHTML = ""
            generationPhotos(travaux)
        })

        clickClose1.addEventListener("click", () =>{
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
        })

        clickAddProjet.addEventListener("click", () =>{
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "flex"
        })

        clickUnder.addEventListener("click", () =>{
            galleryPhoto.style.display = "flex"
            photoAdd.style.display = "none"
        })

        clickClose2.addEventListener("click", () =>{
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
        })

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

