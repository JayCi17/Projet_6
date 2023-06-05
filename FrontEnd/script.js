const gallery = document.querySelector(".gallery");
//Requete HTTP pour récupérer les données au format JSon
fetch('http://localhost:5678/api/works/')
.then(response=>response.json())
.then(data=>{
    //parcourir les données Json et afficher chaque image
    data.forEach(work=>{
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = work.imageUrl;
        const caption = document.createElement("figcaption");
        caption.textContent = work.title;
        //Ajouter l'image a la gallerie
        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(caption);
    })
});

 // Récupérer le conteneur des éléments à trier
const itemsContainer = document.querySelector('.gallery');

async function afficherToutesLesImages() {
    // Effacer les éléments actuels dans le conteneur
    itemsContainer.innerHTML = '';
  
    // Effectuer une requête Fetch pour obtenir toutes les données de l'API
    const response= await fetch('http://localhost:5678/api/works/')
      .then(response => response.json())
      .then(data => {
        // Parcourir tous les éléments et les ajouter au conteneur
        data.forEach(element => {
          const figure = document.createElement('figure');
          const image = document.createElement('img');
          image.src = element.imageUrl;
          const caption = document.createElement('figcaption');
          caption.textContent = element.title;
  
          figure.appendChild(image);
          figure.appendChild(caption);
          itemsContainer.appendChild(figure);
        });
      })
  }

// Fonction de tri par catégorie
async function trierParCategorie(categorie) {
  // Effacer les éléments actuels dans le conteneur
  itemsContainer.innerHTML = '';

  // Effectuer une requête Fetch pour obtenir les données de l'API
  const response= await fetch('http://localhost:5678/api/works/')
    .then(response => response.json())
    .then(data => {
      // Filtrer les éléments en fonction de la catégorie sélectionnée
      const elementsFiltres = data.filter(element => element.category.name === categorie);

      // Parcourir les éléments filtrés et les ajouter au conteneur
        elementsFiltres.forEach(element => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = element.imageUrl;
        const caption = document.createElement('figcaption');
        caption.textContent = element.title;

        figure.appendChild(image);
        figure.appendChild(caption);
        itemsContainer.appendChild(figure);
      });
    })
}

// Ajouter des écouteurs d'événements pour les boutons de tri
const tousBtn = document.createElement('button');
tousBtn.textContent = 'Tous';
tousBtn.addEventListener('click', afficherToutesLesImages);
document.querySelector('.filters').appendChild(tousBtn);

const objetsBtn = document.createElement('button');
objetsBtn.textContent = 'Objets';
objetsBtn.addEventListener('click', () => trierParCategorie('Objets'));
document.querySelector('.filters').appendChild(objetsBtn);

const appartementsBtn = document.createElement('button');
appartementsBtn.textContent = 'Appartements';
appartementsBtn.addEventListener('click', () => trierParCategorie('Appartements'));
document.querySelector('.filters').appendChild(appartementsBtn);

const hotelsBtn = document.createElement('button');
hotelsBtn.textContent = 'Hotels & restaurants';
hotelsBtn.addEventListener('click', () => trierParCategorie('Hotels & restaurants'));
document.querySelector('.filters').appendChild(hotelsBtn);

//mode edition activé si l'utilisateur est connecté//
const log = document.querySelector('.log');
const banner= document.querySelector('.editionBanner');
const modif= document.querySelector(".change");
const container = document.querySelector(".changingContainer");

function editionActive(){
  if(localStorage.login){
    log.innerText="logout",
    banner.style= "display:flex;";
  }
  else{
    banner.style="display:none;";
    modif.style="display:none;";
    container.style="display:none";

  }
};

editionActive();

//desactiver le mode avec logout//

log.addEventListener("click",()=>{
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  log.innerText="login";
  localStorage.clear;
})


//ouverture de la fenetre modale au click //

//on recupere les elements dans le document qui vont  permettre d'ouvrir la fenetre//
const edition=document.querySelectorAll(".changeText");
const addModal=document.querySelector(".openModale2");
//on recupère la fenetre que nous souhaitant ouvrir au click//
const modal=document.querySelector(".modalContainer");
const modal2=document.querySelector(".modalContainer_2");

//Nous ajoutons un evenement a l'input afin que le fenetre modale s'ouvre au click sur celui-ci//
edition.forEach(function(element){
element.addEventListener("click", function(event){
  event.preventDefault();
  console.log("clique sur le bouton");
  modal.classList.add("modalOpen");
});
});

addModal.addEventListener("click", function(){
  console.log("la modale 2 va s'ouvrir");
  modal2.classList.add("modalOpen2");
  modal.classList.remove("modalOpen");
});

const close=document.querySelectorAll(".close");

close.forEach(function(element){
  element.addEventListener("click",function(){
    modal.classList.remove("modalOpen");
    modal2.classList.remove("modalOpen2")
  });
});

const arrowBack=document.querySelector(".arrow-back");
arrowBack.addEventListener("click",function(){
  modal.classList.add("modalOpen");
  modal2.classList.remove("modalOpen2");
});


//Ajouter les images a la fenetre modale//
//Recuperer les données de l'API par un fetch//
const imgContainer=document.querySelector(".imageContainer");
const token=localStorage.token;

  fetch('http://localhost:5678/api/works/')
  .then(response=>response.json())
  .then(data=>{
    data.forEach((work, index)=>{
      const figure = document.createElement("figure");
  
      const imageModale= document.createElement("img");
      imageModale.src=work.imageUrl;
      figure.appendChild(imageModale);
      imageModale.classList.add("image-modale");

      const icon=document.createElement("img");
      icon.src="./assets/icons/trash.png";
      icon.classList.add("icon")
      icon.id=`${work.id}`
      figure.appendChild(icon);

      if (index === 0){
        const addIcon=document.createElement("img");
        addIcon.src="./assets/icons/crossArrow.png";
        addIcon.classList.add("crossarrow");
        figure.appendChild(addIcon);
      }
  
      const edit = document.createElement('figcaption');
      edit.innerText="éditer";
      figure.appendChild(edit);
  
      imgContainer.appendChild(figure);
    })
      //Supprimer image de la galerie//
  const deleteElement=document.querySelectorAll(".icon");

  deleteElement.forEach(element=>{
    element.addEventListener("click",()=>{
      deleteWorks(element.id);
      console.log("supression activée");
    })
  });
  });

  //creation de la fonction deletWorks//

  async function deleteWorks(id){
    console.log(id);
    //passage de la requete pour supprimer une image de la gallery//
    const response = await fetch("http://" + window.location.hostname + `:5678/api/works/${id}`,{
      method:"DELETE",
      headers:{
        accept:"*/*",
        authorization:`Bearer ${token}`
      }
    });
  }


