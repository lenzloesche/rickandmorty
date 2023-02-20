export function createButton(whichOne) {
  const button = document.createElement("button");
  button.classList.add("button", `button--${whichOne}`);
  button.innerText = whichOne;
  return button;
}
