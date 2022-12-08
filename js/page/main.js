const navigation = document.getElementById("HeaderNavigation");
const button = document.getElementById("HeaderNavigationToggleButton");

let opened = false;

button.addEventListener("click", () => {
    opened = !opened;

    if (opened) {
        button.classList.add("toggle-button--checked");
        navigation.classList.add("header__navigation--opened");
    } else {
        button.classList.remove("toggle-button--checked");
        navigation.classList.remove("header__navigation--opened")
    }
});