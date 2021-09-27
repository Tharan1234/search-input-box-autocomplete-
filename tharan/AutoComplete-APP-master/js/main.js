const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//Search states.json and filter it

const searchStates = async searchText => {
  const res = await fetch("./data/states.json");
  const states = await res.json();

  //Get Matches to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "id");
    return state.name.match(regex) || state.id.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

//Show Results in HTML

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
      <div class="card card-body mb-4">
      <h4>${match.name} (${match.id}) <span class="text-primary">${
          match.items
        }</span></h4>
        <small>Lat: ${match.address} / Long: ${match.pincode}</small>
      </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchStates(search.value));
