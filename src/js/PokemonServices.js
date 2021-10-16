class PokemonServices {
  //urlAPI = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";
  urlAPI = "https://pokeapi.co/api/v2/pokemon/4";
  urlHerokuAPI = "https://pokemon-api-aleksandr.herokuapp.com/pokemon";

  async getPokemons(urlAPI) {
    const response = await fetch(urlAPI);
    const pokemons = await response.json();
    return pokemons;
  }

  async createPokemon(pokemon) {
    const response = await fetch(`${this.urlHerokuAPI}`, {
      method: "POST",
      body: JSON.stringify(pokemon),
      header: {
        "Content-Type": "application/json",
      },
    });
    const newPokemon = await response.json();
    return newPokemon;
  }

  async updatePokemon(id, pokemon) {
    fetch(`${this.urlHerokuAPI}/${id}`, {
      method: "PUT",
      body: JSON.stringify(pokemon),
      header: {
        "Content-Type": "application/json",
      },
    });
  }

  async deletePokemon(id) {
    const response = await fetch(`${this.urlHerokuAPI}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    }
    throw new Error("Can't delete it");
  }
}

export default PokemonServices;