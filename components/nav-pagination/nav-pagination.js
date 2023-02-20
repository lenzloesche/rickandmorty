export function createPagination() {
  const paginationNumber = document.createElement("span");
  paginationNumber.classList.add("navigation__pagination");
  paginationNumber.innerText = "1 / 42";
  return paginationNumber;
}
