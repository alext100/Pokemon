import PokemonServices from './PokemonServices.js';
import Pokemon from './Pokemon.js';

const services = new PokemonServices();
const parentElement = document.querySelector('.album-container');

const showPageWithPokemonCard = () => {
  (async () => {
    try {
      const url = 'https://pokeapi.co/api/v2/pokemon/';
      const idPosition = location.href.indexOf("id=") + 3;
      const urlPokemon = `${url}${location.href.substring(idPosition)}/`;
      const response = await services.getPokemons(urlPokemon);
      const urlOfImage = response.sprites.other.dream_world.front_default;
      new Pokemon(parentElement, urlPokemon, urlOfImage, response.height, response.weight, response.name, response.id);
    } catch (error) {
      console.log(error);
    }
  })();
}
showPageWithPokemonCard();
