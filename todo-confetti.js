// Confetti animation for To-Do List
window.launchConfetti = function() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  const confettiColors = ['#2563eb', '#60a5fa', '#f59e42', '#16a34a', '#f43f5e', '#a21caf'];
  const confetti = Array.from({length: 42}, () => ({
    x: W/2,
    y: H/2,
    r: Math.random() * 7 + 4,
    d: Math.random() * 120 + 80,
    color: confettiColors[Math.floor(Math.random()*confettiColors.length)],
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0,
    tiltAngleInc: (Math.random() * 0.07) + 0.05,
    angle: Math.random() * 2 * Math.PI,
    speed: Math.random() * 6 + 4
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,W,H);
    confetti.forEach(c => {
      c.x += Math.cos(c.angle) * c.speed;
      c.y += Math.sin(c.angle) * c.speed + frame*0.1;
      c.tiltAngle += c.tiltAngleInc;
      c.tilt = Math.sin(c.tiltAngle) * 12;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r, c.r/2, c.tilt, 0, 2*Math.PI);
      ctx.fillStyle = c.color;
      ctx.globalAlpha = 0.85;
      ctx.fill();
    });
  }
  function animate() {
    draw();
    frame++;
    if (frame < 60) requestAnimationFrame(animate);
    else ctx.clearRect(0,0,W,H);
  }
  animate();
}; 