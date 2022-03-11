const searchBar = document.getElementById("searchBar");
const totalEpisodesDisplayed = document.getElementById(
  "totalEpisodesDisplayed"
);
const selectEpisodes = document.querySelector("#select-episodes");
const selectShow = document.querySelector("#select-show");

let searchTerm = "";
let searchEpisode = "";
let searchShow = "";

let filteredCount;
let allCount;

let currentEpisodes = [];

searchBar.addEventListener("keyup", onSearchKeyUp);
selectEpisodes.addEventListener("change", episodeSelected);
selectShow.addEventListener("change", showSelected);

// setUp
function setup() {
  const allShows = getAllShows();
  sendRequest(167).then((data) => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
  });
  makeSelectMenuForShows(allShows);
}

// fetch episodes and shows
function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;
  const urlForTheCast = `http://api.tvmaze.com/shows/${showId}?embed=cast`;
  // console.log(showId);

  fetch(urlForTheCast)
    .then((res) => res.json())
    .then((data) => data);

  return fetch(urlForTheRequest)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

// show all the episodes
function makePageForEpisodes(episodeList) {
  const ulElem = document.getElementById("episodesList");
  ulElem.innerHTML = "";
  const optionEpisodes = document.createElement("option");

  episodeList.forEach((episode) => {
    const li = document.createElement("li");
    let episodeNumber = episode.number.toString().padStart(2, "0");
    let episodeSeason = episode.season.toString().padStart(2, "0");
    li.setAttribute("class", "content");
    // console.log(episodeSesion);
    li.innerHTML = `
    <h3 class="heading">${episode.name} - S${episodeSeason}E${episodeNumber}</h3>
    <img class="image" src="${episode.image.medium}" />
    <p>${episode.summary}</p>
    `;
    // console.log(li);
    ulElem.appendChild(li);
  });

  if (episodeList.length > 1) {
    selectEpisodes.innerHTML = "";
    // add the option in select
    episodeList.filter((e) => {
      let episodeNumber = e.number.toString().padStart(2, "0");
      let episodeSeason = e.season.toString().padStart(2, "0");
      let optionElementReference = new Option(
        `${e.name} - S${episodeSeason}E${episodeNumber}`,
        `${e.name}`
      );

      selectEpisodes.add(optionElementReference);
    });
    selectEpisodes.appendChild(optionEpisodes);
  }
}

// search
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

  totalEpisodesDisplayed.innerHTML = `Displaying ${filteredCount}/${allCount} episode(s)`;
  makePageForEpisodes(filteredEpisodes);
}

// target the episode in select
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

// target the show in select
function showSelected(e) {
  searchShow = e.target.value;
  sendRequest(searchShow).then((showIdSelected) => {
    currentEpisodes = showIdSelected;
    makePageForEpisodes(currentEpisodes);
  });
}

// created the select shows in alphabetical order
function makeSelectMenuForShows(shows) {
  shows.sort((showA, showB) => {
    const { name: nameA } = showA;
    const { name: nameB } = showB;

    if (nameA.toLowerCase() < nameB.toLowerCase()) {
      return -1;
    } else if (nameA.toLowerCase() > nameB.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });

  const optionShow = document.createElement("option");
  shows.forEach((e) => {
    const nameShown = e.name;
    const idShown = e.id;
    let optionElementReference = new Option(nameShown, idShown);
    selectShow.add(optionElementReference);
  });
  selectShow.appendChild(optionShow);
}

window.onload = setup;
