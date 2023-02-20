import { createCharacterCard } from "./components/card/card.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = createSearchBar();
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = createButton("prev");
const nextButton = createButton("next");
const pagination = createPagination();
navigation.append(prevButton, pagination, nextButton);
searchBarContainer.append(searchBar);
// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

// Fetch Characters

async function fetchCharacters() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      maxPage = Number(data.info.pages);
      pagination.textContent = `${page} / ${maxPage}`;
      data.results.forEach((character) => {
        cardContainer.append(createCharacterCard(character));
      });
    } else {
      console.log("Error: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchCharacters();

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(searchBar);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;
  fetchCharacters();
});
