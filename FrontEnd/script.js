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
})
.catch(error=>console.error(error));




