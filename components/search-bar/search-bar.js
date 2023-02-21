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
      <div class= "filter-container" aria-label="filter for character">
      
      <div>
      <label for="no-status">All status</label>
      <input type="radio" id="no-status" name="status" value="no-status" checked/>
</div>
<div>
    <label for="Alive">Alive</label>
    <input type="radio" id="Alive" name="status" value="alive"/>
</div> 
<div> 
    <label for="Dead">Dead</label>
    <input type="radio" id="Dead" name="status" value="dead"/>
    </div>  
    <div>
    <label for="Unknown">Unknown</label>
    <input type="radio" id="Unknown" name="status" value="unknown"/>
    </div>
    </div>
    `;
  searchBar.addEventListener("submit", onSubmit);
  return searchBar;
}
