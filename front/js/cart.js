// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //

let productInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(productInLocalStorage);

// AFFICHER LES PRODUITS DU PANIER

// je sélectionne la partie html concernée par la modification
const cartAndFormContainer = document.getElementById("cartAndFormContainer");
console.log(cartAndFormContainer);

// si le panier est vide afficher : le panier est vide
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


// si le panier n'est pas vide : afficher les produits dans le localStorage
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
}

// je supprime un produit dans le panier
function deleteArticle() {
  const deleteItem = document.querySelectorAll(".deleteItem");
  console.log("Bouton Supprimer", deleteItem);

  for (let j = 0; j < deleteItem.length; j++) {
    deleteItem[j].addEventListener("click", (event) => {
      event.preventDefault();

      // enregistrer l'id séléctionné par le bouton supprimer
      let deleteId = productInLocalStorage[j].id;

      // supprimer l'élément cliqué par le bouton supprimer
      productInLocalStorage = productInLocalStorage.filter(
        (elt) => elt.id !== deleteId
      );
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