



function setup() {
  let c = createCanvas(windowWidth, windowHeight);

  // saveFileBtn = createButton("Save");
  // saveFileBtn.position(120, 8);
  // saveFileBtn.mousePressed(saveToFile);
}

document.querySelector("button")?.addEventListener("click", async () => {
  // Tone.start()
  console.log("audio is ready");
});

function saveToFile() {
  // Save the current canvas to file as png
  saveCanvas("mycanvas", "png");
}

let mouseCount = 0;

//tone.js
let synth = new Tone.Synth({ oscillator: { type: "square8" } }).toDestination();

Tone.Master.volume.value = -15;


let revWet = 0.3;

 let reverb = new Tone.Reverb([1]).toDestination();
 reverb.wet.rampTo(revWet, 3);

 chorusDelayTime = 880
 let chorus = new Tone.Chorus(20, chorusDelayTime, 1).toDestination();

 chorus.wet.value = 1

let feedback = 0.5;
 let pingPong = new Tone.PingPongDelay("16n", feedback).toDestination();

synth.connect(chorus)
chorus.connect(pingPong)
pingPong.connect(reverb)



let note = "";
let notes = [];

function checkNote() {

   // ROW 1

  // X1 Y1
  if (mouseX <= width / 4 && mouseY <= height / 4 && mouseX > 1 && mouseY > 1) {
    note = "G5";
  }

   // X2 Y1
  if (mouseX > width / 4 && mouseX < (width / 4) * 2 && mouseY < height / 4) {
    // synth.triggerAttackRelease("D4", "8n");
    note = "A4"
    // console.log(notes)
  }

  // X3 Y1
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY < height / 4
  ) {
    
    note = 'Bb4'
    
  }

  // X4 Y1
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY < height / 4
  ) {
    // synth.triggerAttackRelease("D4", "8n");
    note = "C4"
    // console.log(notes)
  }

  // ROW 2

  // X1 Y2
  if (
    mouseX <= width / 4 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "D3" 
    // console.log(notes)
  }

  // X2 Y2
  if (
    mouseX > width / 4 &&
    mouseX < (width / 4) * 2 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "Bb3"
    // console.log(notes)
  }

  // X3 Y2
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = 'F3'
    // console.log(notes)
  }

  // X4 Y2
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY <= height / 2 &&
    mouseY > height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = 'G3'
    // console.log(notes)
  }

  // ROW 3

  // X1 Y3
  if (
    mouseX <= width / 4 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = 'A2'
    // console.log(notes)
  }

  // X2 Y3
  if (
    mouseX > width / 4 &&
    mouseX < (width / 4) * 2 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4
  ) {
   
    note = 'F4'

    // console.log(notes)
  }

  // X3 Y3
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4
  ) {
    // synth.triggerAttackRelease("D4", "8n");
    note = "C4"
    // console.log(notes)
  }

  // X4 Y3
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY > height / 2 &&
    mouseY < height / 2 + height / 4
  ) {
    // synth.triggerAttackRelease("D4", "8n");
    note = "D4"
    // console.log(notes)
  }

  // ROW 4

  // X1 Y4
  if (
    mouseX <= width / 4 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "G3"
    // console.log(notes)
  }

  // X2 Y4
  if (
    mouseX > width / 4 &&
    mouseX < (width / 4) * 2 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "A3"
    // console.log(notes)
  }

  // X3 Y4
  if (
    mouseX > (width / 4) * 2 &&
    mouseX < (width / 4) * 3 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "Bb3"
    // console.log(notes)
  }

  // X4 Y4
  if (
    mouseX > (width / 4) * 3 &&
    mouseX < (width / 4) * 4 &&
    mouseY > height / 2 + height / 4 &&
    mouseX > 1 &&
    mouseY > 1
  ) {
    note = "C3"
    // console.log(notes)

}
}


function mousePressed() {

    //circle
    loop();
    strokeWeight(0);
    fill(0);
  
    circle(mouseX, mouseY, 29);
    noLoop();

  checkNote()
  notes.push(note)


Tone.Transport.bpm.value = 30;


Tone.Transport.pause();

const seq = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note,0.1, time);
   
  },notes,"4n").start();

Tone.Transport.start();

console.log(notes);

}


  

function draw() {
  if (mouseIsPressed === true) {
    mouseCount += 1;
    // console.log(mouseCount)
  }

  //line

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
    // console.log(chorus)
  }
}

// const sequence = new Composition({notes:'A5'})

// // console.log('fa')
// composition.save().then(() => console.log('user saved'))


// console.log(chorus)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
