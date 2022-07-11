// Création d'un nouvel URL à partir de l'URL actuel
// En ajoutant searchParams pour manipuler les paramètres des requêtes d'URL
let params = new URL(window.location.href).searchParams;
// La nouvelle URL sera ajoutée d'un ID 
let newID = params.get("id");

// Appel de l'API du canapé choisi

fetch("http://localhost:3000/api/products/" + newID)
  .then((res) => res.json())
  .then((data) => {
    // Création de variables correspondantes à chaques élément du DOM
    const image = document.getElementsByClassName("item__img");
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const colors = document.getElementById("colors");

   
    // Modification du contenu de chaque variable avec les données correspondantes

    image[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    title.innerHTML = `<h1>${data.name}</h1>`;
    price.innerText = `${data.price}`;
    description.innerText = `${data.description}`;

    // Configuration choix des couleurs

    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })

// Je récupère les données par rapport au choix de l'utilisateur 

const selectQuantity = document.getElementById('quantity');
const selectColors = document.getElementById('colors');


// Je configure un eventListener quand l'utilisateur clique sur Ajouter au Panier

const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click',(event) => {
  event.preventDefault();

  const selection = {
    id: newID,
    image: imageURL,
    alt: imageAlt,
    name: title.textContent,
    price: price.textContent,
    color: colors.value,
    quantity: quantity.value,
    color: selectColors.value,
    quantity: selectQuantity.value,
  };
  console.log(selection);

   // je déclare une variable productInLocalStorage 
  // dans laquelle je mets les clés+valeurs dans le local storage
  // JSON.parse permet de convertir les données au format JSON en objet JavaScript
  let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
  console.log(productInLocalStorage);

  // s'il y a dejà des produits d'enregistré dans le localstorage
  if(productInLocalStorage){

  }

  // s'il n'y a pas de produit d'enregistré, on les ajoutes

  // j'ajoute les produits sélectionnés dans le localStorage
  else
  productInLocalStorage = []
  // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
  // on peut voir dans la console qu'il y a les données,
  // mais pas encore stockées dans le storage à ce stade
  productInLocalStorage.push(selection);
  // je stocke les données récupérées dans le localStorage :
  // JSON.stringify permet de convertir les données au format JavaScript en JSON 
  // vérifier que key et value dans l'inspecteur contiennent bien des données
  localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  console.log(productInLocalStorage);

  if(selectQuantity.value == 1){
    if(window.confirm(title.textContent + ' a bien été ajouté. Souhaitez vous consultez votre panier?')) {
      window.open("cart.html");
    }
  
  
  } else if (selectQuantity.value > 1){
    if (window.confirm(selectQuantity.value + " " +title.textContent + ' ont bien été ajoutés. Souhaitez vous consultez votre panier?')) {
      window.open("cart.html");
    }
  } else {
    alert("Veuillez selectionner le nombre d'article souhaité.");
  }

});

// Création d'alertes en fonction du nombre d'article choisi et envoyé au panier

