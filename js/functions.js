
var itemsAcordeon = document.getElementsByClassName("container__acordeon__item");

for (item of itemsAcordeon) {
  item.addEventListener("click", function () {
    this.classList.toggle("container__acordeon__item--show");
  });
}
