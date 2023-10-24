var audioContext = new AudioContext();
function playFrequency(frequency) {
    // create 2 second worth of audio buffer, with single channels and sampling rate of your device.
    var sampleRate = audioContext.sampleRate;
    var duration = sampleRate / 2.5;
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

function playNoise(color){
    if(color == 'green'){
        A.style.backgroundColor = '#8f8';
        A.style.boxShadow = '0 0 20px #8f8';
        playFrequency(440);
        setTimeout(function(){ reset('green') }, 400);
    } else if(color == 'red'){
        B.style.backgroundColor = '#f88';
        B.style.boxShadow = '0 0 20px #f88';
        playFrequency(554.3653);
        setTimeout(function(){ reset('red') }, 400);
    } else if(color == 'blue'){
        C.style.backgroundColor = '#88f';
        C.style.boxShadow = '0 0 20px #88f';
        playFrequency(659.2551);
        setTimeout(function(){ reset('blue') }, 400);
    } else if(color == 'yellow'){
        D.style.backgroundColor = '#ff8';
        D.style.boxShadow = '0 0 20px #ff8';
        playFrequency(880);
        setTimeout(function(){ reset('yellow') }, 400);
    }
}

const colors = ['green', 'red', 'blue', 'yellow'];

let expectedInput = ''

function randomColor(){
    let result = Math.ceil(Math.random() * 4);
    switch(result){
        case 1:
            result = 'green';
            playNoise('green');
            break;
        case 2:
            result = 'red';
            playNoise('red');
            break;
        case 3:
            result = 'blue';
            playNoise('blue');
            break;
        case 4:
            result = 'yellow';
            playNoise('yellow');
            break;
        default:
            console.log('not 1');
            break;
    }
    expectedInput = result;
}

let score = 0;
let scoreText = document.getElementById('score');
scoreText.innerText = `Score: ${score}`;
if(score == 1){
    scoreText.innerText = "you win";
}


let actualInput;
let E = document.getElementById('greenbtn');
let F = document.getElementById('redbtn');
let G = document.getElementById('bluebtn');
let H = document.getElementById('yellowbtn');

function disable(){
    E.disabled = true;
    F.disabled = true;
    G.disabled = true;
    H.disabled = true;
}

function enable(){
    E.disabled = false;
    F.disabled = false;
    G.disabled = false;
    H.disabled = false;
}

function check(input){
    switch(input){
        case 'green':
            actualInput = 'green';
            break;
        case 'red':
            actualInput = 'red';
            break;
        case 'blue':
            actualInput = 'blue';
            break;
        case 'yellow':
            actualInput = 'yellow';
            break;
    }
    if(actualInput == expectedInput){
        score += 1;
        scoreText.innerText = `Score: ${score}`;
        nextRound();
    } else {
        scoreText.innerText = "you lose"
        disable();
        document.getElementById("start").innerText = "Refresh";
    }
}

function refresh(){
    if(E.disabled && F.disabled && G.disabled && H.disabled){
        location.reload();
    }
}

let roundList = [0];
let timePassed = 0;

function stop(){
    clearInterval(repeat);
} 

let repeat;   
function nextRound() {
    disable();
    stop();
    repeat = setInterval(randomColor, 500);
    roundList.push(expectedInput);
    let delay = 500 * roundList.length;
    console.log(delay);
    setTimeout(stop, delay);
    setTimeout(enable, delay + 500);
    console.log(roundList);
}

function firstRound(){
    randomColor();
    console.log(expectedInput);
    roundList[0] = expectedInput;
    console.log(roundList);
}


/*  todo 
    - make lightup require click on correct square
*/