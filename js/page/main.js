import makeStickyHeader from "./stickyHeader.js";

// NAVIGATION
// ----------
const navigation = document.getElementById("HeaderNavigation");
const button = document.getElementById("HeaderNavigationToggleButton");
const links = navigation.querySelectorAll("a");

let opened = false;
const mql = window.matchMedia('(max-width: 56.25em)');

const updateTabIndices = () => {
    if (mql.matches && !opened) {
        for (let link of links) {
            link.setAttribute("tabindex", -1);
        }
    } else {
        for (let link of links) {
            link.removeAttribute("tabindex");
        }
    }
}

mql.onchange = updateTabIndices;

updateTabIndices();

button.addEventListener("click", () => {
    opened = !opened;

    if (opened) {
        button.classList.add("toggle-button--checked");
        navigation.classList.add("header__navigation--opened");
    } else {
        button.classList.remove("toggle-button--checked");
        navigation.classList.remove("header__navigation--opened");
    }
    updateTabIndices();
});

// STICKY HEADER
// -------------
const headerContainer = document.getElementById("HeaderContainer");
const header = document.getElementById("Header");

makeStickyHeader(headerContainer, header, "header--fixed");