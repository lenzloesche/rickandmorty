export function createCharacterCard(character) {
  const cardItem = document.createElement("li");

  const frontSide = `
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
    <dt class="card__info-title">Click to flip card</dt>
    <dd class="card__info-description">for more info</dd>
  </dl>
</div>
`;
  cardItem.innerHTML = frontSide;
  cardItem.classList.add("card");
  cardItem.classList.add("card--front-side");

  if (character.status === "Alive") {
    cardItem.style.boxShadow = "lightgreen 10px 5px 5px ";
  } else if (character.status === "Dead") {
    cardItem.style.boxShadow = "#3F3F38 10px 5px 5px ";
  } else {
    cardItem.style.boxShadow = "#D5AE2B 10px 5px 5px ";
  }

  const backSide = `
<div class="card__image-container">  
  
</div>
<div class="card__content">
  <h2 class="card__title">${character.name}</h2>
  <dl class="card__info">
    <dt class="card__info-title">Gender</dt>
    <dd class="card__info-description">${character.gender}</dd>
    <dt class="card__info-title">Species</dt>
    <dd class="card__info-description">${character.species}</dd>
    <dt class="card__info-title">Location</dt>
    <dd class="card__info-description">${character.location.name}</dd>
    <dt class="card__info-title">Origin</dt>
    <dd class="card__info-description">${character.origin.name}</dd>
    <dt class="card__info-title">Occurrences</dt>
    <dd class="card__info-description">${character.episode.length}</dd>
    <dt class="card__info-title">Click to flip card</dt>
    <dd class="card__info-description">for less info</dd>
  </dl>
</div>
`;

  cardItem.addEventListener("click", () => {
    if (cardItem.classList.contains("card--back-side")) {
      cardItem.classList.remove("card--back-side");
      cardItem.classList.remove("transform-card");
      cardItem.classList.add("transform-card-back");
      cardItem.innerHTML = frontSide;
    } else {
      cardItem.classList.add("card--back-side");
      cardItem.classList.add("transform-card");
      cardItem.classList.remove("transform-card-back");
      cardItem.innerHTML = backSide;
    }
  });

  return cardItem;
}
