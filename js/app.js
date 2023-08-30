const ul = document.querySelector(".ul-teams");
console.log(ul);

fetch("http://ergast.com/api/f1/2023/constructors.json")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.MRData.ConstructorTable.Constructors.length; i++) {
      const li = document.createElement("li");

      li.textContent = data.MRData.ConstructorTable.Constructors[i].name;
      li.className = "constructors-name";
      ul.appendChild(li);
    }
  })
  .catch((err) => console.log(err));
