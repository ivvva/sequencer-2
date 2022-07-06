function setup() {
  let c = createCanvas(windowWidth, windowHeight);
  console.log('first')
}

document.querySelector("button")?.addEventListener("click", async () => {
  console.log("audio is ready");
});

function saveToFile() {
  saveCanvas("mycanvas", "png");
}

let mouseCount = 0;
let synth = new Tone.Synth({ oscillator: { type: "square8" } }).toDestination();

Tone.Master.volume.value = -15;

let revWet = 0.3;
let reverb = new Tone.Reverb([1]).toDestination();
reverb.wet.rampTo(revWet, 3);

chorusDelayTime = 880;
let chorus = new Tone.Chorus(20, chorusDelayTime, 1).toDestination();

chorus.wet.value = 1;

let feedback = 0.5;
let pingPong = new Tone.PingPongDelay("16n", feedback).toDestination();

synth.connect(chorus);
chorus.connect(pingPong);
pingPong.connect(reverb);

let note = "";
let notes = [];

function checkNote() {
  if (mouseX <= width / 4 && mouseY <= height / 4 && mouseX > 1 && mouseY > 1) {
    note = "G5";
  }
  if (mouseX > width / 4 && mouseX < (width / 4) * 2 && mouseY < height / 4) {
    note = "A4";
  }
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY < height / 4
  ) {
    note = "Bb4";
  }
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY < height / 4
  ) {
    note = "C4";
  }
  if (
    mouseX <= width / 4 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "D3";
  }
  if (
    mouseX > width / 4 &&
    mouseX < (width / 4) * 2 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "Bb3";
  }
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "F3";
  }
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "G3";
  }
  if (
    mouseX <= width / 4 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "A2";
  }
  if (
    mouseX > width / 4 &&
    mouseX < (width / 4) * 2 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4
  ) {
    note = "F4";
  }
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4
  ) {
    note = "C4";
  }
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4
  ) {
    note = "D4";
  }
  if (
    mouseX <= width / 4 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "G3";
  }
  if (
    mouseX > width / 4 &&
    mouseX < (width / 4) * 2 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "A3";
  }

  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "Bb3";
  }

  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "C3";
  }
}

let drawingCoordinatesX = [];
//288.609375, 481.609375, 454.609375, 370.609375, 556.609375, 634.609375]
  let drawingCoordinatesY = [];
  //[301, 468, 528, 538, 350, 486]

  console.log(notes)
 
  //['Bb3', 'F4', 'F4', 'F4', 'F3', 'C4']


function mousePressed() {
  loop();
  strokeWeight(0);
  fill(0);

  circle(mouseX, mouseY, 29);
  noLoop();

  checkNote();
  notes.push(note);


  drawingCoordinatesX.push(mouseX)
  drawingCoordinatesY.push(mouseY)

  console.log(drawingCoordinatesX,drawingCoordinatesY )

  Tone.Transport.bpm.value = 30;
  Tone.Transport.pause();

  const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
    },
    notes,
    "4n"
  ).start();

  Tone.Transport.start();
}




function draw() {
  if (mouseIsPressed === true) {
    mouseCount += 1;
  }

  if (mouseCount > 1) {
    strokeWeight(4);
    fill(230, 0, 0);
    line(pmouseX - 3, pmouseY + 3, mouseX, mouseY);
  }

  if (mouseCount > 10) {
    revWet += 0.7;
  }

  if (mouseCount > 8) {
    chorusDelayTime = 220;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}