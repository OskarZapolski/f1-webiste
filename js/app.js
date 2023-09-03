const teamLogoDivs = document.querySelectorAll("[data-key]");
const LogoA = document.querySelectorAll(".img-logo-link");
const imgsSlider = [...document.querySelectorAll(".img-slider")];
const dots = [...document.querySelectorAll(".circle")];
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

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

function findActives() {
  let activeSLide = imgsSlider.findIndex((img) => {
    return img.classList.contains("active");
  });
  let activeDot = dots.findIndex((dot) => dot.classList.contains("active-dot"));
  return [activeSLide, activeDot];
}
function removeActive(activeSlide, activeDot) {
  imgsSlider[activeSlide].classList.remove("active");
  dots[activeDot].classList.remove("active-dot");
}

function nextSlide() {
  let activeSlide = findActives()[0];
  let activeDot = findActives()[1];
  removeActive(activeSlide, activeDot);
  if (activeSlide < imgsSlider.length - 1) {
    activeSlide += 1;
    activeDot += 1;
  } else {
    activeSlide = 0;
    activeDot = 0;
  }
  imgsSlider[activeSlide].classList.add("active");
  dots[activeDot].classList.add("active-dot");
}
function prevSlide() {
  let activeSlide = findActives()[0];
  let activeDot = findActives()[1];
  removeActive(activeSlide, activeDot);
  if (activeSlide > 0) {
    activeSlide -= 1;
    activeDot -= 1;
  } else {
    activeSlide = imgsSlider.length - 1;
    activeDot = dots.length - 1;
  }
  imgsSlider[activeSlide].classList.add("active");
  dots[activeDot].classList.add("active-dot");
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    let activeSlide = findActives()[0];
    let activeDot = findActives()[1];
    removeActive(activeSlide, activeDot);

    dot.classList.add("active-dot");
    imgsSlider[i].classList.add("active");
  });
});

arrowRight.addEventListener("click", nextSlide);
arrowLeft.addEventListener("click", prevSlide);
