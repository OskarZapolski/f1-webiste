const teamLogoDivs = document.querySelectorAll("[data-key]");
const LogoA = document.querySelectorAll(".img-logo-link");
const imgsSlider = [...document.querySelectorAll(".img-slider")];
const dots = [...document.querySelectorAll(".circle")];
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const hiddenElements = document.querySelectorAll(".hidden");

let indexInterval;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.5 }
);
hiddenElements.forEach((el) => observer.observe(el));

fetch("http://ergast.com/api/f1/2023/constructors.json", { mode: "cors" })
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

function setSliderInterval() {
  indexInterval = setInterval(nextSlide, 2000);
}
setSliderInterval();

function findActives() {
  let activeSLide = imgsSlider.findIndex((img) => {
    return img.classList.contains("active-slide");
  });
  let activeDot = dots.findIndex((dot) => dot.classList.contains("active-dot"));
  return [activeSLide, activeDot];
}
function removeActive(activeSlide, activeDot) {
  imgsSlider[activeSlide].classList.remove("active-slide");
  dots[activeDot].classList.remove("active-dot");
}
function addActive(activeSlide, activeDot) {
  imgsSlider[activeSlide].classList.add("active-slide");
  dots[activeDot].classList.add("active-dot");
}

function nextSlide() {
  clearInterval(indexInterval);
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
  addActive(activeSlide, activeDot);
  setTimeout(() => {
    setSliderInterval();
  }, 1);
}
function prevSlide() {
  clearInterval(indexInterval);
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
  addActive(activeSlide, activeDot);
  setTimeout(() => {
    setSliderInterval();
  }, 1);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    clearInterval(indexInterval);
    let activeSlide = findActives()[0];
    let activeDot = findActives()[1];

    removeActive(activeSlide, activeDot);

    addActive(i, i);
    setTimeout(() => {
      setSliderInterval();
    }, 1);
  });
});

arrowRight.addEventListener("click", nextSlide);
arrowLeft.addEventListener("click", prevSlide);
