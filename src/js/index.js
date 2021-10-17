import paginate from './paginate.js';
import PokemonServices from './PokemonServices.js';
import Pokemon from './Pokemon.js';

const services = new PokemonServices();

const parentElement = document.querySelector('.album-container');
const paginationBlock = document.querySelector('.pagination');
const previousButton = document.querySelector('.pagination--previous-button');
const nextButton = document.querySelector('.pagination--next-button');
const firstPageInPagination = document.querySelector('.pagination--first-page');
const secondPageInPagination = document.querySelector('.pagination--second-page');
const thirdPageInPagination = document.querySelector('.pagination--third-page');
const lastPageInPagination = document.querySelector('.pagination--last-page');
const albumContainer = document.querySelector('.album-container');

const offset = 0;
const urlAPI = `https://pokeapi.co/api/v2/pokemon?limit=1200&offset=${offset}`;
let arrayOfURLs = [];

const removeAllCardsFromPage = () => {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

let { totalItems, currentPage = 1 } = paginate(arrayOfURLs.length);
currentPage = 2;

const showActivePageNamberInPaginationBlock = ({ currentPage }) => {
  const lastPageNumber = paginate(arrayOfURLs.length).totalPages;
  lastPageInPagination.textContent = lastPageNumber;
  if (currentPage === 1) {
    previousButton.parentElement.classList.add('disabled');
    firstPageInPagination.parentElement.classList.add('active');
    secondPageInPagination.parentElement.classList.remove('active');
    secondPageInPagination.textContent = currentPage + 1;
    firstPageInPagination.textContent = 1;
  } else if (currentPage === lastPageNumber) {
    nextButton.parentElement.classList.add('disabled');
    lastPageInPagination.parentElement.classList.add('active');
    secondPageInPagination.parentElement.classList.remove('active');
    firstPageInPagination.parentElement.classList.remove('active');
    firstPageInPagination.textContent = 1;
    secondPageInPagination.textContent = currentPage - 2;
    thirdPageInPagination.textContent = currentPage - 1;
  } else {
    firstPageInPagination.parentElement.classList.remove('active');
    previousButton.parentElement.classList.remove('disabled');
    secondPageInPagination.textContent = currentPage;
    secondPageInPagination.parentElement.classList.add('active');
    thirdPageInPagination.textContent = currentPage + 1;
    nextButton.parentElement.classList.remove('disabled');
  }
}

const showPokemonsOnPage = ({ currentPage, startIndex, endIndex }) => {
  const urlOfPokemonsToShowOnPage = arrayOfURLs.slice(startIndex, endIndex + 1);
  showActivePageNamberInPaginationBlock({ currentPage });
  urlOfPokemonsToShowOnPage.forEach(async (urlPokemon) => {
    const response = await services.getPokemons(urlPokemon);
    const urlOfImage = response.sprites.other.dream_world.front_default;
    new Pokemon(parentElement, urlPokemon, urlOfImage, response.height, response.weight, response.name, response.id);
  });
}

const getPokemonsUrl = async () => {
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
}
getPokemonsUrl();

paginationBlock.addEventListener('click', (event) => {
  totalItems = paginate(arrayOfURLs.length).totalItems;
  const paginationData = paginate(totalItems, currentPage);
  if (event.target.textContent === 'Next') {
    currentPage++
    paginationData.currentPage = currentPage;
    removeAllCardsFromPage();
    showPokemonsOnPage(paginationData);
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
    currentPage = paginationData.currentPage;
    removeAllCardsFromPage();
    showPokemonsOnPage(paginate(totalItems, currentPage));
    showActivePageNamberInPaginationBlock(paginationData);
  }
});

const getCardFromAPIById = (id) => {
  (async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const responsePokemonCard = await services.getPokemons(url);
      addCardToFavorites(responsePokemonCard);
      return responsePokemonCard;
    }
    catch (error) {
      console.log("error getCardFromAPIById");
    }
  })();
}

const addCardToFavorites = (card) => {
  (async () => {
    try {
      const response = await services.createPokemon(card);
    }
    catch (error) {
      console.log("error addCardToFavorites");
    }
  })();
}

albumContainer.addEventListener('click', (event) => {
  if (event.target.textContent === 'Add to favorites') {
    getCardFromAPIById(event.target.id);
  }
});