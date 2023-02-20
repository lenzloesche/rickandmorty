import { createCharacterCard } from "./components/card/card.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = createSearchBar((event) => {
  event.preventDefault();
  const formData = new FormData(searchBar);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  const alive = document.getElementById("Alive");
  const dead = document.getElementById("Dead");
  const unknown = document.getElementById("Unknown");
  if (alive.checked) {
    statusCheckbox = "alive";
  } else if (dead.checked) {
    statusCheckbox = "dead";
  } else if (unknown.checked) {
    statusCheckbox = "unknown";
  }
  page = 1;
  fetchCharacters();
});

const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = createButton("previous", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});
const nextButton = createButton("next", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});
const pagination = createPagination();
navigation.append(prevButton, pagination, nextButton);
searchBarContainer.append(searchBar);
// States
let maxPage = 1;
let page = 1;
let searchQuery = "";
let statusCheckbox = "";

// Fetch Characters

async function fetchCharacters() {
  const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}&status=${statusCheckbox}`;
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
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
