// appel du tokken dans le localstorage si connecté
let token = window.localStorage.getItem("token")

// Récupération de l'élément du DOM qui accueillera les fichiers
const divGallery = document.querySelector(".gallery")

const btnAddPhoto = document.getElementById("file")


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

    // partie gérant les éléments si connecté ou non
    if (token === null){

        generationLogout()

    } else {
            
        generationLogin()

        const popUpGallery = document.querySelector(".backgroundPopUp")
        const galleryPhoto = document.getElementById("galleryPhoto")
        const photosGallery = document.querySelector(".photos")
        const photoAdd = document.getElementById("photoAdd")


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
    
            let token = JSON.parse(localStorage.getItem("token"))
    
            for (let i = 0; i < travaux.length; i++){
            
                let deleteWork = document.getElementById("delete_"+ [i])
                let divWork = document.getElementById("divWork_"+ [i])
                
                deleteWork.addEventListener("click", () =>{
                    const idDelete = travaux[i].id
            
                    divWork.remove() 
                    
                    fetch(`http://localhost:5678/api/works/${idDelete}`, {
                        method :'DELETE', 
                        headers: {'Authorization': `Bearer ${token}`}
                    })
                })
            }
        }

        function reset(){

            const previewPhoto = document.querySelector(".previewImage")
            const tilteProject = document.getElementById("tilteProject")
            let selectElement = document.getElementById("categorySelect")
            const divFile = document.querySelector(".fileImage")

            previewPhoto.innerHTML = ""
            tilteProject.value = ""
            selectElement.value = ""

            btnAddPhoto.style.display = "flex"
            divFile.style.display = "flex"
            previewPhoto.style.display = "none"
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
    
        function addProject(){
                
            const curFiles = btnAddPhoto.files
            const tilteProject = document.getElementById("tilteProject")
            let selectElement = document.getElementById("categorySelect")
            let selectedValue = selectElement.value
            
            const formData = new FormData()
            
            const projet = {
                title: tilteProject.value,
                image: curFiles[0].name,
                category: selectedValue,
            }
                
            formData.append("image", curFiles[0])
            formData.append("title", projet.title)
            formData.append("category", projet.category)
    
            for (let entry of formData.entries()) {
                  console.log(entry[0] + ': ' + entry[1]);
                }
        
            let token = JSON.parse(localStorage.getItem("token"))
        
        
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {"Authorization": `Bearer ${token}`},
                body: formData,
            })
        }

        const clickModif = document.querySelector(".divModif")
        
        clickModif.addEventListener("click", () =>{
            
            photosGallery.innerHTML = ""
            popUpGallery.style.display = "flex"
            galleryPhoto.style.display = "flex"
            
            generationPhotos(travaux)
            deleteElement()
        })

        const clickAddProjet = document.querySelector(".addPhoto")

        clickAddProjet.addEventListener("click", () =>{
           
            photosGallery.innerHTML = ""
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "flex"
            reset()
            add_PreviewImage()
            
        })

        const btnValiderAdd = document.getElementById("btnValidate")

        btnValiderAdd.addEventListener("click", () =>{
            
            addProject()

            divGallery.innerHTML = ""
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
            
            reset()
            generationTravaux(travaux)
            location.reload()
            
            
        })

        const clickClose1 = document.getElementById("close1")

        clickClose1.addEventListener("click", () =>{
           
            divGallery.innerHTML = ""
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
            
            generationTravaux(travaux)

            location.reload()
        })


        const clickUnder = document.querySelector(".fa-arrow-left")

        clickUnder.addEventListener("click", () =>{
           
            photosGallery.innerHTML = ""
            galleryPhoto.style.display = "flex"
            photoAdd.style.display = "none"
            
            generationPhotos(travaux)
            deleteElement()
        })

        const clickClose2 = document.getElementById("close2")

        clickClose2.addEventListener("click", () =>{
           
            divGallery.innerHTML = ""
            popUpGallery.style.display = "none"
            galleryPhoto.style.display = "none"
            photoAdd.style.display = "none"
            
            generationTravaux(travaux)
            location.reload()
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
