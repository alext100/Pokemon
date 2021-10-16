import paginate from './jpaginate.js';
import PokemonServices from './PokemonServices.js';
import Pokemon from './Pokemon.js';

const services = new PokemonServices();

const parentElement = document.querySelector('.album-container');
const paginationBlock = document.querySelector('.pagination');
const previousButton = document.querySelector('.pagination--previous-button');
const firstPageInPagination = document.querySelector('.pagination--first-page');
const secondPageInPagination = document.querySelector('.pagination--second-page');
const thirdPageInPagination = document.querySelector('.pagination--third-page');

const offset = 0;
const urlAPI = `https://pokeapi.co/api/v2/pokemon?limit=1200&offset=${offset}`;
let arrayOfURLs = [];


const removeAllCardsFromPage = () => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

let { totalItems, currentPage = 1 } = paginate(arrayOfURLs.length);
currentPage = 1;

const showActivePageNamberInPaginationBlock = ({ currentPage }) => {
  if (currentPage === 1) {
    previousButton.parentElement.classList.add('disabled');
    firstPageInPagination.parentElement.classList.add('active');
    secondPageInPagination.parentElement.classList.remove('active');
    firstPageInPagination.textContent = 1;
  } else {
    firstPageInPagination.parentElement.classList.remove('active');
    previousButton.parentElement.classList.remove('disabled');
    firstPageInPagination.textContent = currentPage - 1;
    secondPageInPagination.textContent = currentPage;
    secondPageInPagination.parentElement.classList.add('active');
    thirdPageInPagination.textContent = currentPage + 1;
  }
}

const showPokemonsOnPage = ({ currentPage, startIndex, endIndex }) => {
  const urlOfPokemonsToShowOnPage = arrayOfURLs.slice(startIndex, endIndex + 1);
  showActivePageNamberInPaginationBlock({ currentPage });
  urlOfPokemonsToShowOnPage.forEach(async (urlPokemon) => {
    const response = await services.getPokemons(urlPokemon);
    const urlOfImage = response.sprites.other.dream_world.front_default;
    new Pokemon(parentElement, urlPokemon, urlOfImage, response.height, response.weight, response.name);
  });
}

(async () => {
  try {
    const response = await services.getPokemons(urlAPI);
    arrayOfURLs = response.results;
    arrayOfURLs = arrayOfURLs.map((result) => result.url);
    const paginationData = paginate(arrayOfURLs.length);
    showPokemonsOnPage(paginationData);
    return paginationData;
  } catch (error) {
    console.log(error);
  }
})();

paginationBlock.addEventListener('click', (event) => {
  totalItems = paginate(arrayOfURLs.length).totalItems;
  const paginationData = paginate(totalItems, currentPage);
  if (event.target.textContent === 'Next') {
    currentPage++
    paginationData.currentPage = currentPage;
    removeAllCardsFromPage();
    showPokemonsOnPage(paginationData);
    showActivePageNamberInPaginationBlock(paginationData);
  }
  if (event.target.textContent === 'Previous') {
    if (currentPage === 1) {
      event.target.parentElement.classList.add('disabled');
    } else event.target.parentElement.classList.remove('disabled');
    currentPage--;
    paginationData.currentPage = currentPage;
    removeAllCardsFromPage();
    showPokemonsOnPage(paginate(totalItems, currentPage));
    showActivePageNamberInPaginationBlock(paginationData);
  }
  if (event.target.textContent.match(/[0-9]$/)) {
    paginationData.currentPage = +event.target.textContent;
    removeAllCardsFromPage();
    showPokemonsOnPage(paginate(totalItems, currentPage));
    showActivePageNamberInPaginationBlock(paginationData);
  }
});
