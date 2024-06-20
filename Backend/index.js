let token = window.localStorage.getItem("token")

// Récupération de l'élément du DOM qui accueillera les fichiers
const divGallery = document.querySelector(".gallery")

const btnAddPhoto = document.getElementById("file")

function addProject(){
            
    const curFiles = btnAddPhoto.files
    const tilteProject = document.getElementById("tilteProject")
    const categorySelect = document.querySelector("option")
    const formData = new FormData()
    
    const projet = {
        title: tilteProject.value,
        image: URL.createObjectURL(curFiles[0]),
        category: categorySelect.id,
    }
        
    formData.append("image", projet.image)
    formData.append("title", projet.title)
    formData.append("category", projet.category)


    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: formData
    })

}


fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then (travaux => {
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

    if (token === null){

        generationLogout()

    } else {
            
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
        

        function generationPhotos(){


            for (let i = 0; i < travaux.length; i++){

                const divPhoto = document.createElement("div")
                divPhoto.style.backgroundImage = "url(" + travaux[i].imageUrl + ")"
                divPhoto.id = "divWork_" + [i]
                photosGallery.appendChild(divPhoto)

                const icoDelete = document.createElement("i")
                icoDelete.className = "fa-solid fa-trash-can"
                icoDelete.id = "delete_" + [i]
                divPhoto.appendChild(icoDelete)

            }
        }

        function deleteElement(){

            for (let i = 0; i < travaux.length; i++){
            
                let deleteWork = document.getElementById("delete_"+[i])
                let divWork = document.getElementById("divWork_"+[i])
                
                deleteWork.addEventListener("click", () =>{
                    const idDelete = i
                    
                    divWork.remove() 
                    
                    fetch(`http://localhost:5678/api/works/${idDelete}`, {
                        method :'DELETE', 
                        headers: {'Authorization': `Bearer ${token}`}
                    })

                    console.log(travaux)
                })
            }
        }

        function add_PreviewImage(){
                
            const previewPhoto = document.querySelector(".previewImage")
            const divFile = document.querySelector(".fileImage")

            btnAddPhoto.addEventListener("change", () =>{

                const curFiles = btnAddPhoto.files

                if (curFiles.length > 0){

                    previewPhoto.innerHTML = ""

                    const imgPreview = document.createElement("img")
                    imgPreview.src = URL.createObjectURL(curFiles[0])
                    imgPreview.style.width = "100%"
                    previewPhoto.appendChild(imgPreview)
                    
                    btnAddPhoto.style.display = "none"
                    divFile.style.display = "none"
                    previewPhoto.style.display = "flex"

                }
            })
        }

        const btnValiderAdd = document.getElementById("btnValidate")

        btnValiderAdd.addEventListener("click", (event) =>{
            
            event.preventDefault()
            addProject()

            galleryPhoto.style.display = "flex"
            photoAdd.style.display = "none"
            photosGallery.innerHTML = ""
            
            generationPhotos(travaux)
            deleteElement()

            console.log("j'ajoute la photo")
            console.log(travaux)
        })
        
        clickModif.addEventListener("click", () =>{
            popUpGallery.style.display = "flex"
            galleryPhoto.style.display = "flex"
            photosGallery.innerHTML = ""
            generationPhotos(travaux)
            deleteElement()
        })

        clickClose1.addEventListener("click", () =>{
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
            divGallery.innerHTML = ""
            generationTravaux(travaux)
        })

        clickAddProjet.addEventListener("click", () =>{
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "flex"
            add_PreviewImage()
        })

        clickUnder.addEventListener("click", () =>{
            galleryPhoto.style.display = "flex"
            photoAdd.style.display = "none"
            photosGallery.innerHTML = ""
            generationPhotos(travaux)
            deleteElement()
        })

        clickClose2.addEventListener("click", () =>{
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
            divGallery.innerHTML = ""
            generationTravaux(travaux)
        })
        

        function deconnection(){

            const deco = document.querySelector(".logout")

            deco.addEventListener("click", () =>{
                
                window.localStorage.removeItem("token")

                generationLogout()
            })

        }

        deconnection() 

    }
})
