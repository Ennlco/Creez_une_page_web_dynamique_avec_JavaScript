
// Récupération des travaux depuis l'API
fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then (travaux => {

    // Récupération de l'élément du DOM qui accueillera les fichiers
    const divGallery = document.querySelector(".gallery")
    const photosGallery = document.querySelector(".photos")

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
    console.log(fltTous)

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
        const clickCross = document.querySelector(".fa-xmark")

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

        clickCross.addEventListener("click", () =>{
            popUpGallery.style.display = "none"
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

