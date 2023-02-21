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
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  if (data.status === "no-status") {
    statusCheckbox = "";
  } else {
    statusCheckbox = data.status;
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
    //const response = await mockServerError();
    if (response.ok) {
      const data = await response.json();
      maxPage = Number(data.info.pages);
      pagination.textContent = `${page} / ${maxPage}`;
      data.results.forEach((character) => {
        cardContainer.append(createCharacterCard(character));
      });
    } else {
      // console.log("response not ok " + response.status);
      throw new Error(response.status);
    }
  } catch (error) {
    // console.log("catch");
    let errorMessage = "";
    const statusNumber = Number(error.message);
    if (statusNumber) {
      if ((statusNumber >= 400) & (statusNumber < 500)) {
        errorMessage =
          "Your mistake. Maybe searchterm wrong? Number: " + statusNumber;
      }
      if ((statusNumber >= 500) & (statusNumber < 600)) {
        errorMessage = "Server problem. Number: " + statusNumber;
      }
    } else {
      if (error instanceof TypeError) {
        errorMessage = "Type Error: " + error;
      } else {
        errorMessage = "Unknown Error: " + error;
      }
    }
    createErrorDisplay(errorMessage);
  }
}

function createErrorDisplay(errorMessage) {
  const errorTextElement = document.createElement("p");
  errorTextElement.style.color = "red";
  errorTextElement.textContent = errorMessage;
  cardContainer.append(errorTextElement);
  const retryButton = document.createElement("button");
  retryButton.addEventListener("click", () => {
    fetchCharacters();
  });
  retryButton.textContent = "Retry";
  cardContainer.append(retryButton);
}

fetchCharacters();

function mockServerError() {
  return {
    status: 404,
    statusText: "Server error",
    responseText: "",
  };
}
