var audioContext = new AudioContext();
function playFrequency(frequency) {
    // create 2 second worth of audio buffer, with single channels and sampling rate of your device.
    var sampleRate = audioContext.sampleRate;
    var duration = 2*sampleRate;
    var numChannels = 1;
    var buffer  = audioContext.createBuffer(numChannels, duration, sampleRate);
    // fill the channel with the desired frequency's data
    var channelData = buffer.getChannelData(0);
    for (var i = 0; i < sampleRate; i++) {
      channelData[i]=Math.sin(2*Math.PI*frequency*i/(sampleRate));
    }

    // create audio source node.
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);

    // finally start to play
    source.start(0);
}

$(document).ready(function () {
    $(document).on("click", "#green", function(e) {
        playFrequency(440);
    })
});


//code
let A = document.getElementById('green');
let B = document.getElementById('red');
let C = document.getElementById('blue');
let D = document.getElementById('yellow');
function reset(color){
    if(color == 'green'){
        A.style.backgroundColor = '#3f3';
        A.style.boxShadow = '0 0 0 0';
    }
}

const colors = ['green', 'red', 'blue', 'yellow'];
function random(){
    let result = Math.ceil(Math.random() * 4);
    switch(result){
        case 1:
            A.style.backgroundColor = '#8f8';
            A.style.boxShadow = '0 0 20px #8f8';
            // setTimeout(reset('green'), 1000);
            break;
        default:
            console.log('not 1');
            break;
    }
}