class PokemonServices {
  urlAPI = "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0";

  async getPokemons() {
    const response = await fetch(this.urlAPI);
    const pokemons = await response.json();
    return pokemons;
  }

}

export default PokemonServices;