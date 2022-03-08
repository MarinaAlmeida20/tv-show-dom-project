const searchBar = document.getElementById("searchBar");
const totalEpisodesDisplayed = document.getElementById(
  "totalEpisodesDisplayed"
);
const selectEpisodes = document.querySelector("#select-episodes");
let searchTerm = "";
let searchEpisode = "";
let filteredCount;
let allCount;

let currentEpisodes = [];

// setUp
function setup() {
  sendRequest(82).then((data) => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
  });
  searchBar.addEventListener("keyup", onSearchKeyUp);
  selectEpisodes.addEventListener("change", episodeSelected);
}

function makePageForEpisodes(episodeList) {
  const ulElem = document.getElementById("episodesList");
  ulElem.innerHTML = "";

  episodeList.forEach((episode) => {
    const li = document.createElement("li");
    li.setAttribute("class", "content");
    let episodeNumber = episode.number.toString().padStart(2, "0");
    li.innerHTML = `
    <h3 class="heading">${episode.name} - S0${episode.season}E${episodeNumber}</h3>
    <img class="image" src="${episode.image.medium}" />
    <p>${episode.summary}</p>
    `;
    ulElem.appendChild(li);
  });

  const optionEpisodes = document.createElement("option");

  if (episodeList.length > 1) {
    // add the option in select
    episodeList.filter((e) => {
      let optionElementReference = new Option(
        `${e.name} - S0${e.season}E${e.number.toString().padStart(2, "0")}`,
        `${e.name}`
      );
      selectEpisodes.add(optionElementReference);
    });
    selectEpisodes.appendChild(optionEpisodes);
  }
}

function onSearchKeyUp(event) {
  searchTerm = event.target.value.toLowerCase();

  const filteredEpisodes = currentEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });

  filteredCount = filteredEpisodes.length;
  allCount = currentEpisodes.length;

  displayingTotal();
  makePageForEpisodes(filteredEpisodes);
}

function displayingTotal() {
  totalEpisodesDisplayed.innerHTML = `Displaying ${filteredCount}/${allCount} episode(s)`;
}

function episodeSelected(e) {
  searchEpisode = e.target?.value;
  let arr = [];

  currentEpisodes.filter((element) => {
    if (element.name === searchEpisode) {
      arr.push(element);
      makePageForEpisodes(arr);
    }
  });
}

function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(urlForTheRequest)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

window.onload = setup;
