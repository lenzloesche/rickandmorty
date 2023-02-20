export function createSearchBar(onSubmit) {
  const searchBar = document.createElement("form");
  searchBar.classList.add("search-bar");
  searchBar.innerHTML = `<input
      name="query"
      class="search-bar__input"
      type="text"
      placeholder="search characters"
      aria-label="character name"
    />
    <button class="search-bar__button" aria-label="search for character">
      <img
        class="search-bar__icon"
        src="assets/magnifying-glass.png"
        alt=""
      />
      </button> 
      <label for="no-status">All status</label>
      <input type="radio" id="no-status" name="status" checked/>
    <label for="Alive">Alive</label>
    <input type="radio" id="Alive" name="status" value="alive"/>
    <label for="Dead">Dead</label>
    <input type="radio" id="Dead" name="status"/>
    <label for="Unknown">Unknown</label>
    <input type="radio" id="Unknown" name="status"/>
    `;
  searchBar.addEventListener("submit", onSubmit);
  return searchBar;
}
