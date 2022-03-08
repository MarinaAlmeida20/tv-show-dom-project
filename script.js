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

// setUp
function setup() {
  sendRequest(82).then((data) => {
    currentEpisodes = data;
    makePageForEpisodes(currentEpisodes);
  });
  nameShow();
  searchBar.addEventListener("keyup", onSearchKeyUp);
  selectEpisodes.addEventListener("change", episodeSelected);
}

// show all the episodes
function makePageForEpisodes(episodeList) {
  const ulElem = document.getElementById("episodesList");
  ulElem.innerHTML = "";
  const optionEpisodes = document.createElement("option");

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

  if (episodeList.length > 1) {
    selectEpisodes.innerHTML = "";
    // add the option in select
    episodeList.filter((e) => {
      let optionElementReference = new Option(
        `${e.name} - S0${e.season}E${e.number.toString().padStart(2, "0")}`,
        `${e.name}`
      );

      selectEpisodes.add(optionElementReference);
    });
    selectEpisodes.appendChild(optionEpisodes);
    console.log(selectEpisodes);
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

  displayingTotal();
  makePageForEpisodes(filteredEpisodes);
}

// display the total number of episodes
function displayingTotal() {
  totalEpisodesDisplayed.innerHTML = `Displaying ${filteredCount}/${allCount} episode(s)`;
}

// episode selected, eventlistener
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

// fetch episodes
function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;
  // console.log(showId);

  return fetch(urlForTheRequest)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

// show witch id selected

let idShows = selectShow.addEventListener("click", function showSelected(e) {
  searchShow = e.target.value;
  sendRequest(searchShow).then((anything) => {
    currentEpisodes = anything;
    makePageForEpisodes(currentEpisodes);
  });
});

// console.log(idShows);
// created the select shows and fetch shows
function nameShow() {
  const urlNameShow = `https://api.tvmaze.com/shows`;
  fetch(urlNameShow)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 1) {
        const optionShow = document.createElement("option");
        data.forEach((e) => {
          const nameShown = e.name;
          const idShown = e.id;
          let optionElementReference = new Option(nameShown, idShown);
          selectShow.add(optionElementReference);
        });
        selectShow.appendChild(optionShow);
        // console.log(selectShow);
      }
    })
    .catch((err) => console.log(err));
}

window.onload = setup;
