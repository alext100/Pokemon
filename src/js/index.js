import PokemonServices from "./PokemonServices.js";
import Pokemon from "./Pokemon.js";

const services = new PokemonServices;
const urlAPI = "https://pokeapi.co/api/v2/pokemon/4";

const parentElement = document.querySelector(".album-container");

(async () => {
  try {
    const response = await services.getPokemons(urlAPI);
    console.log('response: ', response);
    const urlOfImage = response.sprites.other.dream_world.front_default;
    const pokemon = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon2 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon3 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon4 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon5 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon6 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon7 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon8 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
    const pokemon9 = new Pokemon(parentElement, urlAPI, urlOfImage, response.height, response.weight, response.name);
  }
  catch (error) {
    console.log(error);
  }
})();
