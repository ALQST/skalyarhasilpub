const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultDiv = document.getElementById("result");

function updateVisualization() {
  const magnitudeA = parseFloat(document.getElementById("magnitudeA").value);
  const magnitudeB = parseFloat(document.getElementById("magnitudeB").value);
  const angleDegrees = parseFloat(document.getElementById("angle").value);
  const angleRadians = (angleDegrees * Math.PI) / 180;

  // Calculate dot product
  const dotProduct = magnitudeA * magnitudeB * Math.cos(angleRadians);

  // Clear canvas and draw grid
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  // Draw vectors
  drawVector(magnitudeA, 0, "blue"); // Vector A along x-axis
  drawVector(magnitudeB * Math.cos(angleRadians), magnitudeB * Math.sin(angleRadians), "red"); // Vector B at angle

  // Draw angle arc
  drawAngleArc(angleRadians);

  // Update result with formula display
  resultDiv.innerHTML = `
    Skalyar hasil düsturu: |A| * |B| * cos(θ) <br>
    Skalyar hasil= ${magnitudeA} * ${magnitudeB} * cos(${angleDegrees}°) = ${dotProduct.toFixed(2)}
  `;
}

function drawGrid() {
  const gridSize = 20;
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 0.5;

  for (let x = gridSize; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  for (let y = gridSize; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Draw x and y axes in darker color
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

function drawVector(x, y, color) {
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2); // Center of the canvas
  ctx.lineTo(canvas.width / 2 + x * 20, canvas.height / 2 - y * 20); // Scale by 20 for visibility
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawAngleArc(angleRadians) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const arcRadius = 30; // Radius of the angle arc

  ctx.beginPath();
  ctx.arc(centerX, centerY, arcRadius, 0, -angleRadians, true); // Draw arc from x-axis to Vector B
  ctx.strokeStyle = "green";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Label the angle
  ctx.font = "16px Arial";
  ctx.fillStyle = "green";
  const labelX = centerX + arcRadius * Math.cos(-angleRadians / 2);
  const labelY = centerY - arcRadius * Math.sin(-angleRadians / 2);
  ctx.fillText(`${(angleRadians * 180 / Math.PI).toFixed(1)}°`, labelX, labelY);
}

// Initial rendering
updateVisualization();
