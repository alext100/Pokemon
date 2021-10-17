import Pokemon from "./Pokemon.js";

describe('Given Pokemon class', () => {
  describe('When it recives a parent element', () => {
    test('Then it should render a new element div with className pokemon-card', () => {
      const parentElement = document.createElement('div');

      new Pokemon(parentElement);

      const expectedElement = parentElement.querySelector('div.pokemon-card');

      expect(expectedElement).not.toBeNull();
    });
    test('Then it should contain a button with className pokemon-card--favorites-button', () => {
      const parentElement = document.createElement('div');
      const favoritesButtonText = 'Add to favorites';

      new Pokemon(parentElement, favoritesButtonText);

      const expectedElement = parentElement.querySelector('button.pokemon-card--favorites-button');

      expect(expectedElement).not.toBeNull();
    });
  });
});