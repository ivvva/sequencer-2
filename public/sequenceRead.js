
let note = "";
let notes = [];

let drawingCoordinatesX = ''
//
let drawingCoordinatesY = ''

document.querySelector('#open').addEventListener('click', () => {

  
  let url = window.location.href.slice(44)
  console.log(url)

 axios.get(`/compositionData/${url}`)
  
  .then(function (response) {
   console.log(response.data.composition.drawingX)
  //  console.log(response.data.composition.drawingY)
  //  console.log(response.data.composition.notes)

  notes = response.data.composition.notes
  drawingCoordinatesX = response.data.composition.drawingX
  drawingCoordinatesY = response.data.composition.drawingY
      
  console.log(notes)
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







