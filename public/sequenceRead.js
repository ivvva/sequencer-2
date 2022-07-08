
let note = "";
let notes = ['Bb3', 'F4', 'F3', 'F3', 'C4', 'Bb3', 'Bb3', 'A4', 'D3', 'D3', 'F4', 'F4', 'Bb3', 'A4', 'A4', 'A4'];

let drawingCoordinatesX = [471.4921875, 471.4921875, 603.4921875, 585.4921875, 570.4921875, 366.4921875, 356.4921875, 366.4921875, 237.4921875, 237.4921875, 256.4921875, 271.4921875, 390.4921875, 430.4921875, 454.4921875, -22.5078125];
//
let drawingCoordinatesY = [249, 433, 299, 349, 406, 388, 222, 188, 265, 265, 406, 434, 204, 169, 175, 399];

document.querySelector('#open').addEventListener('click', () => {

  
  let url = window.location.href.slice(44)
  console.log(url)

 axios.get(`/compositionData/${url}`)
  
  .then(function (response) {
   console.log(response.data.composition.drawingX)
   console.log(response.data.composition.drawingY)
   console.log(response.data.composition.notes)

  // notes = response.data.composition.notes
  // drawingCoordinatesX = response.data.composition.drawingX
  // drawingCoordinatesY = response.data.composition.drawingY
      
  
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

 
})


//
let totalDrawingDots = drawingCoordinatesY.length

let mouseCount = 0;

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







