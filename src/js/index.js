import PokemonServices from './PokemonServices.js';
import Pokemon from './Pokemon.js';

const services = new PokemonServices();
const parentElement = document.querySelector('.album-container');
const urlAPI = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=9';
let arrayOfURLs = [];

(async () => {
  try {
    const response = await services.getPokemons(urlAPI);
    arrayOfURLs = response.results;
    arrayOfURLs = arrayOfURLs.map((result) => result.url);
    console.log('arryOfURLs: ', arrayOfURLs);
    arrayOfURLs.forEach(async (urlPokemon) => {
      const response = await services.getPokemons(urlPokemon);
      console.log('response: ', response);
      const urlOfImage = response.sprites.other.dream_world.front_default;
      new Pokemon(parentElement, urlPokemon, urlOfImage, response.height, response.weight, response.name);
    });
  } catch (error) {
    console.log(error);
  }
})();




