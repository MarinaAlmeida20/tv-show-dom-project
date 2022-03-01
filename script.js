const searchBar = document.getElementById("searchBar");
const totalEpisodesDisplayed = document.getElementById(
  "totalEpisodesDisplayed"
);
const selectEpisodes = document.querySelector("#select-episodes");
let searchTerm = "";
let searchEpisode = "";
let filteredCount;
let allCount;
let allEpisodes = getAllEpisodes();

// setUp
function setup() {
  allEpisodes = getAllEpisodes(); // API
  makePageForEpisodes(allEpisodes);
  selectAllEpisodes(allEpisodes);
  searchBar.addEventListener("keyup", onSearchKeyUp);
  // selectEpisodes.addEventListener("click", episodeSelected);
}

function makePageForEpisodes(episodeList) {
  const ulElem = document.getElementById("episodesList");
  ulElem.innerHTML = "";

  episodeList.forEach((episode) => {
    const li = document.createElement("li");
    li.setAttribute("class", "content");
    // let episodeNumber = episode.number.toString().padStart(2, "0");
    li.innerHTML = `
    <h3 class="heading">${episode.name} - S0${episode.season}E${episode.number
      .toString()
      .padStart(2, "0")}</h3>
    <img class="image" src="${episode.image.medium}" />
    <p>${episode.summary}</p>
    `;
    ulElem.appendChild(li);
  });

  const optionEpisodes = document.createElement("option");

  // add the option in select
  episodeList.filter((e) => {
    let optionElementReference = new Option(
      `S0${e.season}E${e.number.toString().padStart(2, "0")} - ${e.name}`,
      `${e.name}`
    );
    // console.log(optionElementReference);
    selectEpisodes.add(optionElementReference);
  });
  selectEpisodes.appendChild(optionEpisodes);
}

function onSearchKeyUp(event) {
  searchTerm = event.target.value.toLowerCase();

  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });

  filteredCount = filteredEpisodes.length;
  allCount = allEpisodes.length;

  displayingTotal();
  makePageForEpisodes(filteredEpisodes);
}

function displayingTotal() {
  totalEpisodesDisplayed.innerHTML = `Displaying ${filteredCount}/${allCount} episode(s)`;
}

// function selectAllEpisodes(episodeList) {
//   const optionEpisodes = document.createElement("option");

//   // add the option in select
//   episodeList.filter((e) => {
//     let optionElementReference = new Option(
//       `S0${e.season}E${e.number.toString().padStart(2, "0")} - ${e.name}`,
//       `${e.name}`
//     );
//     // console.log(optionElementReference);
//     selectEpisodes.add(optionElementReference);
//   });
//   selectEpisodes.appendChild(optionEpisodes);
// }

function episodeSelected(e) {
  searchEpisode = e.target.value;
  console.log(searchEpisode);
  let arr = [];

  arr.push(searchEpisode);

  console.log(arr);
  allEpisodes.filter((element) => {
    if (element.name === searchEpisode) {
      return makePageForEpisodes(arr);
    }
  });
}

window.onload = setup;
