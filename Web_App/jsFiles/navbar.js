const toggle = document.getElementsByClassName("toggle")[0];
const links = document.getElementsByClassName("links")[0];

toggle.addEventListener("click", () => {
    links.classList.toggle("active");
});
