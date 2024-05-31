// Récupération des travaux depuis l'API
const travaux = fetch("http://localhost:5678/api/works").then(travaux => travaux.json())


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
        imgElement.src = travaux[i].image
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
    console.log("tous")
})

const fltObjets = document.getElementById("choixObjets")

fltObjets.addEventListener("click",  function(){
    const objetsFiltrees = travaux.filter( function (travaux){
    return travaux.categoryId = 1
   })
   document.querySelector(".gallery").innerHTML = ""
   generationTravaux(objetsFiltrees)
})

const fltAppart = document.getElementById("choixAppartements")

fltAppart.addEventListener("click",  function(){
    const appartFiltrees = travaux.filter( function (travaux){
        return travaux.categoryId = 2
    })
    document.querySelector(".gallery").innerHTML = ""
   generationTravaux(appartFiltrees)
})

const fltHotelRest = document.getElementById("choixHotels_Restaurants")

fltHotelRest.addEventListener("click",  function(){
    const hotelRestoFiltrees = travaux.filter( function (travaux){
        return travaux.categoryId = 3
    })
    document.querySelector(".gallery").innerHTML = ""
   generationTravaux(hotelRestoFiltrees)
})