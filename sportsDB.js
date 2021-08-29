//targeting spinner div
const spinner = document.getElementById("spinner");

//spinner function

function showSpinner() {
  const div = document.createElement("div");
  div.classList.add("d-block");
  div.innerHTML = `
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  `;

  spinner.appendChild(div);

  setTimeout(() => {
    div.classList.replace("d-block", "d-none");
  }, 5000);
}

// end of spinner function

const loadData = async (key) => {
  console.log(key);
  const searchClub = document.getElementById("search-club");
  const searchText = searchClub.value;
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchText}`;

  //clearing the input field
  showSpinner(); //calling spinner
  searchClub.value = "";

  const res = await fetch(url);
  const data = await res.json();
  showTeams(data.teams);
};

const showTeams = (teams) => {
  console.log(teams);
  const parent = document.getElementById("parent");
  parent.textContent = "";

  teams.forEach((team) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="d-flex justify-content-evenly align-items-center">
            <div onclick="loadTeamDetails(${team.idTeam})" class="w-50 text-center">
            <img src="${team.strTeamBadge}" class="card-img-top" style="width:7rem" alt="..." />
            <h5>${team.strTeam}</h5>
            </div>
            <div class="w-50 text-center">
             <h5>${team.strSport}</h5>
             <h5>${team.strLeague}</h5>
             <h5>${team.strCountry}</h5>
             <h5>Stadium : ${team.strStadium}</h5>
             <a class="text-decoration-none text-light" href="${team.strWebsite}">Go To Website</a>
            </div>
        </div>
    `;
    parent.appendChild(div);
  });
};

// to fetch the team details by id

const loadTeamDetails = async (idTeam) => {
  console.log(idTeam);
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`;

  //fetching data from the server
  const res = await fetch(url);
  const data = await res.json();
  showTeamDetails(data.teams[0]);
};

const showTeamDetails = (team) => {
  console.log(team);
  const teamParent = document.getElementById("team-detail");
  teamParent.textContent = "";
  const div = document.createElement("div");
  //destructuring
  let {
    strTeamBadge,
    strTeam,
    strSport,
    strCountry,
    strDescriptionEN,
    strStadiumThumb,
  } = team;

  if (strDescriptionEN === null || strDescriptionEN === "") {
    strDescriptionEN = "No info is available currently!";
  }
  // if (strStadiumThumb === null || strStadiumThumb === "") {
  //   strStadiumThumb = "Image Unavailable!";
  // }
  div.innerHTML = `
   <div class="d-flex flex-column justify-content-center align-items-center text-center">
     <img src="${strTeamBadge}" class="card-img-top" style="width:15rem" alt="..." />
     <h1>Team ${strTeam}</h1>
     <h3>${strCountry}</h3>
     <p>${strSport}</p>
     <img src="${strStadiumThumb}" class="img-fluid rounded-lg my-3" style="width:70%" alt="Image Unavailable!"" />
     <p>${strDescriptionEN}</p>
   </div>
  `;

  teamParent.appendChild(div);
};

//keypress event

const searchClub = document.getElementById("search-club");

searchClub.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    loadData();
  }
});
