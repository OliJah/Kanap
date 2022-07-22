// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //

let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);
let products = [];

// AFFICHER LES PRODUITS DU PANIER

// Selection de la partie html 
const cartAndFormContainer = document.getElementById("cartAndFormContainer");
console.log(cartAndFormContainer);

// si le panier est vide afficher "le panier est vide"
if (productInLocalStorage === null || productInLocalStorage == 0) {
  alert("Votre panier est vide, merci de sélectionner des produits afin de finaliser votre commande");
}
if (productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector('#cart__items').innerHTML =`
  <div class="cart__empty">
  <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
</div>
  `;
}


// si le panier n'est pas vide afficher "les produits dans le localStorage"
else {
  let itemCards = [];
  for (i = 0; i < productInLocalStorage.length; i++) {
    console.log(productInLocalStorage.length);
    // le code suivant sera injecté à chaque tour de boucle
    // selon la longueur des produits dans le local storage

    itemCards =
      itemCards +
      `
    
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
  if (i == productInLocalStorage.length) {
    const itemCart = document.getElementById("cart__items");
    itemCart.innerHTML += itemCards;
  }


// je modifie la quantité dans le panier

function changeQtt() {
  let itemQtt = document.querySelectorAll('.itemQuantity');
  for (let j = 0; j < itemQtt.length; j++) {
    itemQtt[j].addEventListener('change', (event) => {
    event.preventDefault();

    // sélection de la nouvelle quantité
    // sauvegarder dans un nouveau tableau
   // avec les autres éléments du localStorage

    let itemNewQtt = itemQtt[j].value;
    const newLocalStorage = {
      id: productInLocalStorage[j].id,
      image: productInLocalStorage[j].image,
      alt: productInLocalStorage[j].alt,
      name: productInLocalStorage[j].name,
      color: productInLocalStorage[j].color,
      price: productInLocalStorage[j].price,   
      quantity: itemNewQtt, // avec la nouvelle quantité souhaitée
    };

    // actualiser le localStorage avec les nouvelles données récupérées
    // en transformant les Js en Json

    productInLocalStorage[j] = newLocalStorage;
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));

    // avertir de la modification et mettre à jour 
    // les articles et le prix final

    alert('Votre panier est à jour.');
    totalArticles();
    priceAmount();
      })
  }
}
changeQtt();


// je supprime un produit dans le panier

function deleteArticle() {
  const deleteItem = document.querySelectorAll(".deleteItem");
  console.log("Bouton Supprimer", deleteItem);

  for (let m = 0; m < deleteItem.length; m++) {
    deleteItem[m].addEventListener("click", (event) => {
      event.preventDefault();

      // enregistrer l'id séléctionné par le bouton supprimer

      let deleteId = productInLocalStorage[m].id;
      let deleteColor = productInLocalStorage[m].color;

      // supprimer l'élément cliqué par le bouton supprimer

      productInLocalStorage = productInLocalStorage.filter( elt => elt.id !== deleteId || elt.color !== deleteColor);
      console.log("LocalStorage modifié", productInLocalStorage);

      // envoyer la variable dans le localStorage

      localStorage.setItem("product", JSON.stringify(productInLocalStorage));

      // avertir de la suppression et recharger la page

      alert("Votre article a bien été supprimé.");
      window.location.href = "cart.html";
    });
  }
}
deleteArticle();

// J'affiche le total d'article et le coût en € 
function totalArticles() {
  let totalItems = 0;
  for (l in productInLocalStorage) {
    // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
    // et renvoie un entier (parseInteger), sur la base décimale de 10
    const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);

    // attribuer la valeur retournée par parseInt à la variable totalItems
    totalItems += newQuantity;
  }
    // attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalItems;
}
totalArticles();

// je calcule le montant total du panier
function priceAmount() {
  const calculPrice = [];
  for (e = 0; e < productInLocalStorage.length; e++) {
    // prix de l'article quantité * prix
    const cartAmount = productInLocalStorage[e].price * productInLocalStorage[e].quantity;
    calculPrice.push(cartAmount);

    // la fonction reduce() permet de garder en mémoire les résultats de l'opération
    // elle fonctionne comme une boucle, avec un accumulateur et la valeur courante
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}
priceAmount();

}

/* LE FORMULAIRE */
function postForm(){
// sélection du bouton Valider
const btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir valider le formulaire
btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  /* GESTION DU FORMULAIRE */

  // Regex pour le contrôle des champs Prénom, Nom et Ville
  const regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  // Regex pour le contrôle du champ Adresse
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  // Regex pour le contrôle du champ Email
  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonctions de contrôle du champ Prénom:
  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      inputFirstName.style.backgroundColor = "green";

      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } else {
      inputFirstName.style.backgroundColor = "#FF6F61";

      document.querySelector("#firstNameErrorMsg").textContent =
        "Champ Prénom de formulaire invalide, ex: Paul";
      return false;
    }
  }

  // Fonctions de contrôle du champ Nom:
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (regExPrenomNomVille(nom)) {
      inputLastName.style.backgroundColor = "green";

      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";

      document.querySelector("#lastNameErrorMsg").textContent =
        "Champ Nom de formulaire invalide, ex: Durand";
      return false;
    }
  }

  // Fonctions de contrôle du champ Adresse:
  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (regExAdresse(adresse)) {
      inputAddress.style.backgroundColor = "green";

      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";

      document.querySelector("#addressErrorMsg").textContent =
        "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
      return false;
    }
  }

  // Fonctions de contrôle du champ Ville:
  function cityControl() {
    const ville = contact.city;
    let inputCity = document.querySelector("#city");
    if (regExPrenomNomVille(ville)) {
      inputCity.style.backgroundColor = "green";

      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";

      document.querySelector("#cityErrorMsg").textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }
  }

  // Fonctions de contrôle du champ Email:
  function mailControl() {
    const courriel = contact.email;
    let inputMail = document.querySelector("#email");
    if (regExEmail(courriel)) {
      inputMail.style.backgroundColor = "green";

      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } else {
      inputMail.style.backgroundColor = "#FF6F61";

      document.querySelector("#emailErrorMsg").textContent =
        "Champ Email de formulaire invalide, ex: example@contact.fr";
      return false;
    }
  }

  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  function validControl() {
    if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && mailControl()) {
      localStorage.setItem('contact', JSON.stringify(contact));
      return true;
    } else {
        alert('Merci de revérifier les données du formulaire')
      }
  }
  validControl()
  /* FIN GESTION DU FORMULAIRE */

  /* REQUÊTE DU SERVEUR ET POST DES DONNÉES */
  const options = {
    method: 'POST',
    body: JSON.stringify({ contact, products }),
    headers: { 
      'Content-Type': 'application/json',
    }
  };

  fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('orderId', data.orderId);
        if (validControl()) {
          document.location.href = 'confirmation.html?id='+ data.orderId;
        }
    });
  });
}
postForm();
/* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES */

// Maintenir le contenu du localStorage dans le champs du formulaire

// let dataFormulaire = JSON.parse(localStorage.getItem("contact"));

// if (dataFormulaire) {
  // document.querySelector("#firstName").value = dataFormulaire.firstName;
  // document.querySelector("#lastName").value = dataFormulaire.lastName;
  // document.querySelector("#address").value = dataFormulaire.address;
  // document.querySelector("#city").value = dataFormulaire.city;
  // document.querySelector("#email").value = dataFormulaire.email;
// } else {
  // console.log("Le formulaire est vide");
// }

///////

