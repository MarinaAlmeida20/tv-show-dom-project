const ulElem = document.getElementById("episodesList");
const searchBar = document.getElementById("searchBar");
const totalEpisodesDisplayed = document.getElementById(
  "totalEpisodesDisplayed"
);
let searchTerm = "";

function makePageForEpisodes(episodeList) {
  const showList = () => {
    ulElem.innerHTML = "";
    episodeList
      .filter((episode) => {
        return (
          episode.name.toLowerCase().includes(searchTerm) ||
          episode.summary.toLowerCase().includes(searchTerm)
        );
      })
      .forEach((episode, index) => {
        let interator = index + 1;
        const li = document.createElement("li");
        li.setAttribute("class", "content");
        li.innerHTML = `
        <h3 class="heading">${episode.name} - S0${episode.season}E0${episode.number}</h3>
        <img class="image" src="${episode.image.medium}" />
        <p>${episode.summary}</p>
        `;

        ulElem.appendChild(li);
        totalEpisodesDisplayed.textContent = `Displaying ${interator}/${episodeList.length} episode(s)`;
      });
  };
  showList();

  searchBar.addEventListener("keyup", (event) => {
    searchTerm = event.target.value.toLowerCase();
    showList();
  });
}

function setup() {
  const allEpisodes = getAllEpisodes(); // API
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;
