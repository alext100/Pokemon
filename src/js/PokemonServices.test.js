import PokemonServices from "./PokemonServices.js";
import "isomorphic-fetch";

describe("Given a getPokemons function", () => {
  describe("When it recives response from API with url 'https://pokemon-api-aleksandr.herokuapp.com/pokemon'", () => {
    test("Then it should return an object", () => {
      const expected = {};

      const services = new PokemonServices();
      const expectResponse = services.getPokemons();

      return expect(typeof expected).toEqual(typeof expectResponse);
    });
  });
});

describe("Given a deletePokemon function", () => {
  describe("When it recives id of an object", () => {
    test("Then it should return true", () => {
      const id = 28;

      const expected = true;
      const services = new PokemonServices();

      const result = services.deletePokemon(id);

      return expect(result).resolves.toEqual(expected);
    });
  });
});