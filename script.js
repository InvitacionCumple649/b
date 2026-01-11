const start = document.getElementById("start");
const scene = document.querySelector(".scene");
const card = document.getElementById("card");
const flipBtn = document.getElementById("flipBtn");
const backBtn = document.getElementById("backBtn");

const truenoCard = document.getElementById("truenoCard");
const fondotrueno = document.getElementById("fondoTrueno");
const fondoeco = document.getElementById("fondoEco"); // nuevo sonido de fondo
const flash = document.querySelector(".flash");

// rayo
const lightning = document.createElement("div");
lightning.className = "lightning";
document.body.appendChild(lightning);

truenoCard.volume = 1;
fondotrueno.volume = 0.75;
fondoeco.volume = 0.6; // volumen del nuevo sonido

// Función para hacer el rayo visual
function flashThunder(intense = false) {
  flash.classList.add("active");

  // ángulo aleatorio y zigzag
  let skew = Math.random() * 60 - 30; // -30 a 30 grados
  lightning.style.transform = `translateX(-50%) skewX(${skew}deg)`;
  lightning.style.left = Math.random() * 80 + 10 + "%";
  lightning.classList.add("active");

  if (intense) {
    setTimeout(() => {
      flash.classList.add("active");
      lightning.classList.add("active");
    }, 80);
  }

  setTimeout(() => {
    flash.classList.remove("active");
    lightning.classList.remove("active");
  }, 220);
}

// CLICK INICIAL
start.addEventListener("click", () => {
  start.style.display = "none";

  // Trueno principal
  truenoCard.currentTime = 0;
  truenoCard.play();

  // Tarjeta aparece tras medio segundo
  setTimeout(() => {
    scene.style.display = "block";

    // Rayo fuerte al aparecer la tarjeta
    flashThunder(true);

    // Mostrar tarjeta
    card.classList.add("show");
    flipBtn.classList.remove("hidden");

    // Sonido de fondo
    fondotrueno.currentTime = 0;
    fondotrueno.play();

    // Nuevo fondo loop
    fondoeco.currentTime = 0;
    fondoeco.play();
  }, 800); // retraso ajustable
});

// FLIP
flipBtn.addEventListener("click", () => {
  card.style.animation = "none";
  card.offsetHeight; // reflow

  card.classList.add("flipped");

  // rayo visual
  flashThunder();

  // trueno suave
  truenoCard.volume = 0.2;
  truenoCard.currentTime = 0;
  truenoCard.play();

  flipBtn.classList.add("hidden");
  backBtn.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
  card.classList.remove("flipped");

  // rayo visual
  flashThunder();

  // trueno suave
  truenoCard.volume = 0.2;
  truenoCard.currentTime = 0;
  truenoCard.play();

  backBtn.classList.add("hidden");
  flipBtn.classList.remove("hidden");
});
