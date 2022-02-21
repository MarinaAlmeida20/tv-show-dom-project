const rootElem = document.getElementById("root");
const ulElem = document.getElementById("episodesList");
const searchBar = document.getElementById("searchBar");
const totalEpisodesDisplayed = document.getElementById(
  "totalEpisodesDisplayed"
);
let searchTerm = "";

function makePageForEpisodes(episodeList) {
  totalEpisodesDisplayed.textContent = `Displaying ${episodeList.length}/${episodeList.length} episode(s)`;

  const showList = () => {
    ulElem.innerHTML = "";
    episodeList
      .filter((episode) => {
        return (
          episode.name.toLowerCase().includes(searchTerm) ||
          episode.summary.toLowerCase().includes(searchTerm)
        );
      })
      .forEach((episode) => {
        const li = document.createElement("li");
        li.setAttribute("class", "content");
        li.innerHTML = `
      <h3 class="heading">${episode.name} - S0${episode.season}E0${episode.number}</h3>
      <img class="image" src="${episode.image.medium}" />
      <p>${episode.summary}</p>
      `;
        console.log(li.length);
        ulElem.appendChild(li);
      });
  };
  showList();

  searchBar.addEventListener("keyup", (event) => {
    searchTerm = event.target.value.toLowerCase();
    showList();
    searchTerm = "";
  });
}

function setup() {
  const allEpisodes = getAllEpisodes(); // API
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
