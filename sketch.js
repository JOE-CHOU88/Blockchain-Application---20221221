let noiseScaleX = 0.00003;
let noiseScaleY = 0.00003;
let noiseAngleRange = 720;

async function setup() {
  createCanvas(600, 600);
  background(30);
  // stroke(126, 168, 237);
  // drawArrows(30, 30);

  let baseHue = random(100, 300);
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let xPos = random(0, width);
      let yPos = random(0, height);
      let steps = random(10, 100);

      colorMode(HSB);
      let colorAHue = baseHue + random(-60, 60);
      let colorASat = random(30, 90);
      let colorABri = random(30, 100);
      let colorA = color(colorAHue, colorASat, colorABri);

      let colorBHue = baseHue + random(30, 60);
      let colorBSat = random(30, 90);
      let colorBBri = random(30, 100);
      let colorB = color(colorBHue, colorBSat, colorBBri);

      noStroke();
      drawFlowLine(xPos, yPos, steps, 10, colorA, colorB);
      drawFlowLine(xPos, yPos, steps, 5, colorB, colorA);
      drawFlowLine(xPos, yPos, steps, 1, color(0, 0, 0), color(255, 255, 255));
    }
  }

  for (let i = 0; i < 50; i++) {
    let xPos = random(0, width);
    let yPos = random(0, height);
    let steps = random(10, 100);

    colorMode(HSB);
    let colorAHue = baseHue + random(-60, 60);
    let colorASat = random(30, 90);
    let colorABri = random(30, 100);
    let colorA = color(colorAHue, colorASat, colorABri);

    let colorBHue = baseHue + random(30, 60);
    let colorBSat = random(30, 90);
    let colorBBri = random(30, 100);
    let colorB = color(colorBHue, colorBSat, colorBBri);

    noStroke();
    drawFlowLine(xPos, yPos, steps, 50, colorA, colorB);
    drawFlowLine(xPos, yPos, steps, 25, colorB, colorA);
    drawFlowLine(xPos, yPos, steps, 6, color(0, 0, 0), color(255, 255, 255));
  }
}

function drawFlowLine(_startX, _startY, _steps, _radius, _fromColor, _toColor) {
  let x = _startX;
  let y = _startY;
  for (let i = 0; i < _steps; i++) {
    let ratio = i / _steps;
    let drawColor = lerpColor(_fromColor, _toColor, ratio);

    fill(drawColor);
    circle(x, y, _radius);

    let noiseValue = noise(x * noiseScaleX, y * noiseScaleY) * noiseAngleRange;

    x += sin(noiseValue);
    y += cos(noiseValue);
  }
}

function drawArrows(_xCount, _yCount) {
  let xSpace = width / _xCount;
  let ySpace = height / _yCount;

  for (let y = 0; y < _yCount; y++) {
    for (let x = 0; x < _xCount; x++) {
      let xPos = x * xSpace + 0.5 * xSpace;
      let yPos = y * ySpace + 0.5 * ySpace;

      let noiseAngle =
        noise(xPos * noiseScaleX, yPos * noiseScaleY) * noiseAngleRange;

      // circle(xPos, yPos, 6);
      push();

      translate(xPos, yPos);
      rotate(radians(-noiseAngle));
      line(0, -0.4 * ySpace, 0, 0.4 * ySpace);
      line(0, -0.4 * ySpace, 0.3 * xSpace, 0);
      line(0, -0.4 * ySpace, -0.3 * xSpace, 0);

      pop();
    }
  }
}

function draw() {}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
