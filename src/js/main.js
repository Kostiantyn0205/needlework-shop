const buttonMenu = document.querySelector('.button-menu');
const categoryNav = document.querySelector('.category-nav');
const photoList  = document.querySelectorAll('.slideshow');
const button = document.querySelector('.button');
const buttonBar = document.querySelector(".container-but")

buttonMenu.addEventListener('click', function() {
    categoryNav.classList.toggle('active');
    buttonBar.classList.toggle("change");
    button.classList.toggle('open');

    photoList.forEach(function(photo) {
        photo.classList.toggle('open');
    });
});

function searchOnSite() {
    let searchQuery = document.getElementById("searchInput").value;
    window.location.href = "/search?query=" + encodeURIComponent(searchQuery);
}