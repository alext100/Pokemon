class PokemonServices {
  urlAPI = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";

  async getPokemons(urlAPI) {
    const response = await fetch(urlAPI);
    const pokemons = await response.json();
    return pokemons;
  }

  async createPokemon(pokemon) {
    const response = await fetch(`${this.urlAPI}`, {
      method: "POST",
      body: JSON.stringify(pokemon),
      header: {
        "Content-Type": "application/json",
      },
    });
    const newPokemon = await response.json();
    return newPokemon;
  }


}

export default PokemonServices;