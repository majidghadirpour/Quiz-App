
const buttons = document.querySelectorAll(".level");

const homeLink = document.querySelector("a");

const selectHandler = (event) => {
  const level = event.target.innerText.trim();
  
 
  localStorage.setItem("userLevel", level);
  

  alert(`You selected ${level} level`);
  
 
  window.location.href = "game.html";
};


buttons.forEach((button) => {
  button.addEventListener("click", selectHandler);
});


homeLink.addEventListener("mouseenter", () => {
  homeLink.style.transition = "all 1s ease";
});