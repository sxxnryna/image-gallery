const ACCESS_KEY = "tMKYbbbNn2iDM2PEumcQO1AKQA91kTN6747xKqdBxhM";
const perPage = 30;
const apiUrl = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=${perPage}`;
const searchUrl = `https://api.unsplash.com/search/photos/?client_id=${ACCESS_KEY}&per_page=${perPage}&query=`;

const searchInput = document.getElementById("search");
const gallery = document.getElementById("gallery");
const clearSearchButton = document.getElementById("clear-search");

window.onload = () => {
  loadImages(apiUrl);
  searchInput.focus();
};

async function loadImages(url) {
  const response = await fetch(url);
  const data = await response.json();

  gallery.innerHTML = "";
  const images = data.results || data;

  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    gallery.appendChild(imgElement);
  });
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      loadImages(searchUrl + query);
    }
  }
});

clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.placeholder = "Search...";
  gallery.innerHTML = "";
  loadImages(apiUrl);
});

searchInput.setAttribute("autocomplete", "off");
