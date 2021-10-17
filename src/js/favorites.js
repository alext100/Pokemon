import PokemonServices from './PokemonServices.js';
import Pokemon from './Pokemon.js';
// import { showPokemonsOnPage } from './index.js'

const services = new PokemonServices();

const parentElement = document.querySelector('.album-container');
const paginationBlock = document.querySelector('.pagination');
const previousButton = document.querySelector('.pagination--previous-button');
const firstPageInPagination = document.querySelector('.pagination--first-page');
const secondPageInPagination = document.querySelector('.pagination--second-page');
const thirdPageInPagination = document.querySelector('.pagination--third-page');

const urlHerokuAPI = "http://pokemon-api-aleksandr.herokuapp.com/pokemon";
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
      new Pokemon(parentElement, urlOfPokemon, urlOfImage, response.height, response.weight, response.name, response.id);
    });
  } catch (error) {
    console.log(error);
  }
})();



