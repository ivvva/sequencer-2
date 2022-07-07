let note = "";
let notes = [];

let drawingCoordinatesX = [288.609375, 481.609375, 454.609375, 370.609375, 556.609375, 634.609375]
//
let drawingCoordinatesY = [301, 468, 528, 538, 350, 486]
//
let totalDrawingDots = drawingCoordinatesX.length

let mouseCount = 0;

notes = ['Bb3', 'F4', 'F4', 'F4', 'F3', 'C4']

//Synth enigne
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

function setup() {
    let c = createCanvas(windowWidth, windowHeight);

    for(let i = 0; i < totalDrawingDots; i++ ) {
       
        circle(drawingCoordinatesX[i],drawingCoordinatesY[i] , 29);
    line(drawingCoordinatesX[i], drawingCoordinatesY[i] , drawingCoordinatesX[i+1], drawingCoordinatesY[i+1])      
    }

   
    
  }
  
  document.querySelector("button")?.addEventListener("click", async () => {
    console.log("audio is ready");
  });
  

  


function mousePressed() {

  mouseCount += 1;
  console.log(mouseCount)

  if (mouseCount === 1 ) {
    
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

}




function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}