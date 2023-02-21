export function createCharacterCard(character) {
  const cardItem = document.createElement("li");

  cardItem.innerHTML = `
<div class="card__image-container">
  <img
    class="card__image"
    src=${character.image}
    alt=${character.name}
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title">${character.name}</h2>
  <dl class="card__info">
    <dt class="card__info-title">Status</dt>
    <dd class="card__info-description">${character.status}</dd>
    <dt class="card__info-title">Type</dt>
    <dd class="card__info-description">${character.type}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description">${character.episode.length}</dd>
  </dl>
</div>
`;
  cardItem.classList.add("card");

  if (character.status === "Alive") {
    cardItem.style.boxShadow = "lightgreen 10px 5px 5px ";
  } else if (character.status === "Dead") {
    cardItem.style.boxShadow = "#3F3F38 10px 5px 5px ";
  } else {
    cardItem.style.boxShadow = "#D5AE2B 10px 5px 5px ";
  }
  console.log(character);
  cardItem.addEventListener("click", () => {
    cardItem.classList.add("card--back-side");
    cardItem.classList.toggle("transform-card");
    cardItem.innerHTML = `
    <div class="card__image-container">  
      
    </div>
    <div class="card__content">
      <h2 class="card__title">${character.name}</h2>
      <dl class="card__info">
        <dt class="card__info-title">Gender</dt>
        <dd class="card__info-description">${character.gender}</dd>
        <dt class="card__info-title">Location</dt>
        <dd class="card__info-description">${character.location.name}</dd>
        <dt class="card__info-title">Species</dt>
        <dd class="card__info-description">${character.species}</dd>
      </dl>
    </div>
    `;
  });

  return cardItem;
}
