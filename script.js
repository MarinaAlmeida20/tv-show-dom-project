//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
    // // create Elements
    const divElement = document.createElement("div");

    const headingElem = document.createElement("h3");
    const imageElem = document.createElement("img");
    const summaryElem = document.createElement("p");

    // set the class to the Elements to use in CSS
    divElement.setAttribute("class", "content");
    headingElem.setAttribute("class", "heading");
    imageElem.setAttribute("class", "image");

    // set Elements
    headingElem.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`;

    imageElem.src = `${episode.image.medium}`;

    summaryElem.innerHTML = `${episode.summary}`;

    // append Element to the page
    divElement.append(headingElem, imageElem, summaryElem);

    rootElem.append(divElement);
  });
}

window.onload = setup;
