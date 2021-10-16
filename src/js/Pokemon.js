class Pokemon {
  card;
  urlOfPokemon;
  urlOfImage;
  name;
  weight;
  height;
  constructor(parentElement, urlOfPokemon, urlOfImage, weight, height, name) {
    this.parentElement = parentElement;
    this.urlOfPokemon = urlOfPokemon;
    this.urlOfImage = urlOfImage;
    this.weight = weight;
    this.height = height;
    this.name = name;
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
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Add to favorites</button>
                </div>
              </div>
            </div>
          </div>
       </div>`;
    this.parentElement.append(this.card)
  }
}

export default Pokemon;