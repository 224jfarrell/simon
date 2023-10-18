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


//code
let A = document.getElementById('green');
let B = document.getElementById('red');
let C = document.getElementById('blue');
let D = document.getElementById('yellow');
function reset(color){
    if(color == 'green'){
        A.style.backgroundColor = '#3f3';
        A.style.boxShadow = '0 0 0 0';
    } else if(color == 'red'){
        B.style.backgroundColor = "#f33";
        B.style.boxShadow = '0 0 0 0';
    } else if(color == 'blue'){
        C.style.backgroundColor = "#33f";
        C.style.boxShadow = "0 0 0 0";
    } else if(color == 'yellow'){
        D.style.backgroundColor = "#ff3";
        D.style.boxShadow = '0 0 0 0';
    }
}

const colors = ['green', 'red', 'blue', 'yellow'];
function random(){
    let result = Math.ceil(Math.random() * 4);
    switch(result){
        case 1:
            A.style.backgroundColor = '#8f8';
            A.style.boxShadow = '0 0 20px #8f8';
            playFrequency(440);
            setTimeout(function(){ reset('green') }, 1000);
            break;
        case 2:
            B.style.backgroundColor = '#f88';
            B.style.boxShadow = '0 0 20px #f88';
            playFrequency(554.3653);
            setTimeout(function(){ reset('red') }, 1000);
            break;
        case 3:
            C.style.backgroundColor = '#88f';
            C.style.boxShadow = '0 0 20px #88f';
            playFrequency(659.2551);
            setTimeout(function(){ reset('blue') }, 1000);
            break;
        case 4:
            D.style.backgroundColor = '#ff8';
            D.style.boxShadow = '0 0 20px #ff8';
            playFrequency(880);
            setTimeout(function(){ reset('yellow') }, 1000);
            break;
        default:
            console.log('not 1');
            break;
    }
}
