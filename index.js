import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  const url = "https://rickandmortyapi.com/api/character";
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      data.results.forEach((character) => {
        cardContainer.append(createCharacterCard(character));
      });
    } else {
      return console.log("Error");
    }
  } catch (error) {
    console.log(error);
  }
}

fetchCharacters();
