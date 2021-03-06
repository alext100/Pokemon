class Pokemon {
  card;
  urlOfPokemon;
  urlOfImage;
  name;
  weight;
  height;
  id;
  viewButtonText;
  favoritesButtonText;

  constructor(parentElement, urlOfPokemon, urlOfImage, weight, height, name, id, viewButtonText = 'View details', favoritesButtonText = 'Add to favorites') {
    this.parentElement = parentElement;
    this.urlOfPokemon = urlOfPokemon;
    this.urlOfImage = urlOfImage;
    this.weight = weight;
    this.height = height;
    this.name = name;
    this.id = id;
    this.viewButtonText = viewButtonText;
    this.favoritesButtonText = favoritesButtonText;
    this.generateCard();
  }

  generateCard() {
    this.card = document.createElement("div");
    this.card.classList.add("col");
    this.card.innerHTML =
      `<div class="col pokemon-card">
         <div class="card shadow-sm">
            <img class="album-container--image" src="${this.urlOfImage}" alt="Pokemon image">
            <div class="card-body">
              <p class="card-text pokemon-card--name">Name: ${this.name}</p>
              <p class="card-text pokemon-card--weight">Weight: ${this.weight}</p>
              <p class="card-text pokemon-card--height">Height: ${this.height}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="submit" method="get" id=${this.id} class="btn btn-sm btn-outline-secondary pokemon-card--view-button" onClick='location.href="card.html?id=${this.id}"'>${this.viewButtonText}</button>
                  <button type="button" id=${this.id} class="btn btn-sm btn-outline-secondary pokemon-card--favorites-button">${this.favoritesButtonText}</button>
                </div>
              </div>
            </div>
          </div>
       </div>`;
    this.parentElement.append(this.card)
  }
}

export default Pokemon;