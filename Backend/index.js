let token = window.localStorage.getItem("token");

const divGallery = document.querySelector(".gallery");
const btnAddPhoto = document.getElementById("file");


function generationTravaux(travaux) {
    divGallery.innerHTML = "";  
    for (let i = 0; i < travaux.length; i++) {

        const travauElement = document.createElement("figure");
        travauElement.dataset.categoryId = travaux[i].categoryId
        divGallery.appendChild(travauElement);

        
        const imgElement = document.createElement("img");
        imgElement.src = travaux[i].imageUrl;

        travauElement.appendChild(imgElement);

      
        const titleElement = document.createElement("figcaption");
        titleElement.innerText = travaux[i].title;
    
        travauElement.appendChild(titleElement);
    }
}

function fetchTravaux() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(travaux => {
            generationTravaux(travaux);
         
        });
}

fetchTravaux();

function generationFiltre(category){
    const divContent = document.querySelector(".contentFiltrers")
    
    divContent.style.display = "flex"
    
    const divTous = document.createElement("div")
    divTous.className = "filtres"
    divTous.dataset.categoryId = ""
    divContent.appendChild(divTous)

    const textTous = document.createElement("p")
    textTous.innerText = "Tous"
    divTous.appendChild(textTous)

    for(let i = 0; i < category.length; i++){

        const divElement = document.createElement("div")
        divElement.className = "filtres"
        divElement.dataset.categoryId = category[i].id
        divContent.appendChild(divElement)

        const textElement = document.createElement("p")
        textElement.innerText = category[i].name
        divElement.appendChild(textElement)
    }
}

function fetchFiltres(){
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(category => {
            generationFiltre(category);
            fltTraveaux();
        });
}

function fltTraveaux(){

    const fltCategory = document.querySelectorAll(".filtres");

    for(let i = 0; i < fltCategory.length; i++){
        
        const fltId = fltCategory[i].dataset.categoryId;
        
        fltCategory[i].addEventListener("click", () =>{

            if(fltId === ""){
                fetchTravaux();
            } else {
                filterTravaux(fltId);
            }
        })
    }
}

function filterTravaux(categoryId){
    
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(travaux => {

            const filteredTravaux = travaux.filter(travaux => travaux.categoryId == categoryId);
            generationTravaux(filteredTravaux);
            
        });
}


if (token === null) {
    generationLogout();
    fetchFiltres();
} else {
    generationLogin();

    const popUpGallery = document.querySelector(".backgroundPopUp");
    const galleryPhoto = document.getElementById("galleryPhoto");
    const photosGallery = document.querySelector(".photos");
    const photoAdd = document.getElementById("photoAdd");

    function generationPhotos(travaux) {
        for (let i = 0; i < travaux.length; i++) {
            const divPhoto = document.createElement("div");
            divPhoto.style.backgroundImage = "url(" + travaux[i].imageUrl + ")";
            divPhoto.id = "divWork_" + [i];
            photosGallery.appendChild(divPhoto);
    
            const icoDelete = document.createElement("i");
            icoDelete.className = "fa-solid fa-trash-can";
            icoDelete.id = "delete_" + [i];
            divPhoto.appendChild(icoDelete);
        }
    
        deleteElement(travaux); 
    }

    function deleteElement(travaux) {
        let token = JSON.parse(localStorage.getItem("token"));
    
        for (let i = 0; i < travaux.length; i++) {
            let deleteWork = document.getElementById("delete_" + [i]);
            let divWork = document.getElementById("divWork_" + [i]);
    
            deleteWork.addEventListener("click", () => {
                const idDelete = travaux[i].id;
                divWork.remove();
    
                fetch(`http://localhost:5678/api/works/${idDelete}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(() => fetchTravaux());
            });
        }
    }
    

    function reset() {
        const previewPhoto = document.querySelector(".previewImage");
        const tilteProject = document.getElementById("tilteProject");
        let selectElement = document.getElementById("categorySelect");
        const divFile = document.querySelector(".fileImage");

        previewPhoto.innerHTML = "";
        tilteProject.value = "";
        selectElement.value = "";

        btnAddPhoto.style.display = "flex";
        divFile.style.display = "flex";
        previewPhoto.style.display = "none";
    }

    function add_PreviewImage() {
        const previewPhoto = document.querySelector(".previewImage");
        const divFile = document.querySelector(".fileImage");

        btnAddPhoto.addEventListener("change", () => {
            const curFiles = btnAddPhoto.files;

            if (curFiles.length > 0) {
                previewPhoto.innerHTML = "";

                const imgPreview = document.createElement("img");
                imgPreview.src = URL.createObjectURL(curFiles[0]);
                imgPreview.style.width = "100%";
                previewPhoto.appendChild(imgPreview);

                btnAddPhoto.style.display = "none";
                divFile.style.display = "none";
                previewPhoto.style.display = "flex";
            }
        });
    }

    function addProject() {
        const curFiles = btnAddPhoto.files;
        const tilteProject = document.getElementById("tilteProject");
        let selectElement = document.getElementById("categorySelect");
        let selectedValue = selectElement.value;

        const formData = new FormData();

        const projet = {
            title: tilteProject.value,
            image: curFiles[0].name,
            category: selectedValue,
        };

        formData.append("image", curFiles[0]);
        formData.append("title", projet.title);
        formData.append("category", projet.category);

        let token = JSON.parse(localStorage.getItem("token"));

        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData,
        }).then(() => {
            fetchTravaux();
            popUpGallery.style.display = "none";
            galleryPhoto.style.display = "none";
            photoAdd.style.display = "none";
            reset();
        });
    }

    const clickModif = document.querySelector(".divModif");
    clickModif.addEventListener("click", () => {
        photosGallery.innerHTML = "";
        popUpGallery.style.display = "flex";
        galleryPhoto.style.display = "flex";
        fetch("http://localhost:5678/api/works")
            .then(response => response.json())
            .then(travaux => {
                generationPhotos(travaux);
                deleteElement();
            });
    });

    const clickAddProjet = document.querySelector(".addPhoto");
    clickAddProjet.addEventListener("click", () => {
        photosGallery.innerHTML = "";
        galleryPhoto.style.display = "none";
        photoAdd.style.display = "flex";
        reset();
        add_PreviewImage();
    });

    const btnValiderAdd = document.getElementById("btnValidate");
    btnValiderAdd.addEventListener("click", addProject);

    const clickClose1 = document.getElementById("close1");
    clickClose1.addEventListener("click", () => {
        popUpGallery.style.display = "none";
        galleryPhoto.style.display = "none";
        photoAdd.style.display = "none";
        fetchTravaux();
    });

    const clickUnder = document.querySelector(".fa-arrow-left");
    clickUnder.addEventListener("click", () => {
        photosGallery.innerHTML = "";
        galleryPhoto.style.display = "flex";
        photoAdd.style.display = "none";
        fetch("http://localhost:5678/api/works")
            .then(response => response.json())
            .then(travaux => {
                generationPhotos(travaux);
                deleteElement();
            });
    });

    const clickClose2 = document.getElementById("close2");
    clickClose2.addEventListener("click", () => {
        popUpGallery.style.display = "none";
        galleryPhoto.style.display = "none";
        photoAdd.style.display = "none";
        fetchTravaux();
    });

    function deconnection() {
        const deco = document.querySelector(".logout");
        deco.addEventListener("click", () => {
            window.localStorage.removeItem("token");
            generationLogout();
            fetchFiltres();
        });
    }

    deconnection();
}