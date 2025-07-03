const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 300; // Altura do cabeçalho
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Criar estrelas com posição base
const starCount = 7;
const stars = [];
const connections = [];

for (let i = 0; i < starCount; i++) {
  let x = (i + 1) * (canvas.width / (starCount + 1));
  let yBase = 160 + Math.sin(i * 1.2) * 40;
  stars.push({
    x,
    yBase,
    y: yBase,
    radius: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5 + 0.5,
    pulse: Math.random() * 0.02 + 0.005,
    offset: Math.random() * 50,
  });

  if (i > 0) {
    connections.push([i - 1, i]);
  }
}

let time = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  time += 0.01;

  // Desenha as estrelas
  for (let star of stars) {
    // Suave movimento de subida/descida
    star.y = star.yBase + Math.sin(time + star.offset) * 4;

    // Piscar sutil
    star.alpha += star.pulse;
    if (star.alpha >= 1 || star.alpha <= 0.4) {
      star.pulse *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }

  // Desenha as linhas da constelação
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let [a, b] of connections) {
    ctx.moveTo(stars[a].x, stars[a].y);
    ctx.lineTo(stars[b].x, stars[b].y);
  }
  ctx.stroke();

  requestAnimationFrame(animate);
}

animate();
