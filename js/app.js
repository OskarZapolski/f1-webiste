const teamLogoDivs = document.querySelectorAll("[data-key]");
const LogoA = document.querySelectorAll(".img-logo-link");
console.log(teamLogoDivs);

fetch("http://ergast.com/api/f1/2023/constructors.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.MRData.ConstructorTable.Constructors.length; i++) {
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.src = `img/teamLogo${i}.jpg`;

      img.className = "logo-team-img";
      p.textContent = data.MRData.ConstructorTable.Constructors[i].name;
      p.className = "constructors-name";
      img.alt = `logo teamu ${p.textContent} z przekierowaniem do ich strony`;
      LogoA[i].appendChild(img);
      teamLogoDivs[i].appendChild(p);
    }
  })
  .catch((err) => console.log(err));
