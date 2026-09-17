(function () {
  const canvas = document.getElementById("matrixRain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const fontSize = 16;
  const chars = "アカサタナハマヤラワ0123456789ZummChat";
  let cols, drops, rafId, stopped = false, last = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = new Array(cols).fill(1);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw(t) {
    if (stopped) return;
    rafId = requestAnimationFrame(draw);
    if (t - last < 50) return;
    last = t;
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff66";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  rafId = requestAnimationFrame(draw);

  window.stopMatrixRain = () => { stopped = true; cancelAnimationFrame(rafId); };
})();
