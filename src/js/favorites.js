import PokemonServices from './PokemonServices.js';
import Pokemon from './Pokemon.js';

const services = new PokemonServices();

const parentElement = document.querySelector('.album-container');

const urlHerokuAPI = "https://pokemon-api-aleksandr.herokuapp.com/pokemon";
//  const urlHerokuAPI = 'http://localhost:4000/pokemon';
let arrayOfFavorites = [];

(async () => {
  try {
    const response = await services.getPokemons(urlHerokuAPI);
    arrayOfFavorites = response;
    arrayOfFavorites.forEach(async (pokemon) => {
      const pokemonId = pokemon.id;
      const urlOfPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
      const response = await services.getPokemons(urlOfPokemon);
      const urlOfImage = pokemon.sprites.other.dream_world.front_default;
      new Pokemon(parentElement, urlOfPokemon, urlOfImage, response.height, response.weight, response.name, response.id, 'View details', 'Delete from favorites');
    });
  } catch (error) {
    console.log(error);
  }
})();



