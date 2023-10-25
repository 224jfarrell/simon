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
let E = document.getElementById('greenbtn');
let F = document.getElementById('redbtn');
let G = document.getElementById('bluebtn');
let H = document.getElementById('yellowbtn');


function reset(color){
    if(color == 'green'){
        A.style.backgroundColor = '#3f3';
        A.style.boxShadow = '0 0 0 0';
        A.style.borderStyle = 'outset';
    } else if(color == 'red'){
        B.style.backgroundColor = "#f33";
        B.style.boxShadow = '0 0 0 0';
        B.style.borderStyle = 'outset';
    } else if(color == 'blue'){
        C.style.backgroundColor = "#33f";
        C.style.boxShadow = "0 0 0 0";
        C.style.borderStyle = 'outset';
    } else if(color == 'yellow'){
        D.style.backgroundColor = "#ff3";
        D.style.boxShadow = '0 0 0 0';
        D.style.borderStyle = 'outset';
    }
}

function playNoise(color){
    if(color == 'green'){
        A.style.backgroundColor = '#8f8';
        A.style.boxShadow = '0 0 20px 10px #8f8';
        A.style.borderStyle = 'inset';
        playFrequency(440);
        setTimeout(function(){ reset('green') }, 400);
    } else if(color == 'red'){
        B.style.backgroundColor = '#f88';
        B.style.boxShadow = '0 0 20px 10px #f88';
        B.style.borderStyle = 'inset';
        playFrequency(554.3653);
        setTimeout(function(){ reset('red') }, 400);
    } else if(color == 'blue'){
        C.style.backgroundColor = '#88f';
        C.style.boxShadow = '0 0 20px 10px #88f';
        C.style.borderStyle = 'inset';
        playFrequency(659.2551);
        setTimeout(function(){ reset('blue') }, 400);
    } else if(color == 'yellow'){
        D.style.backgroundColor = '#ff8';
        D.style.boxShadow = '0 0 20px 10px #ff8';
        D.style.borderStyle = 'inset';
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
        roundList.push(expectedInput);
        nextRound();
    } else {
        scoreText.innerText = "you lose"
        disable();
        document.getElementById("start").innerText = "Refresh";
        switch(expectedInput){
            case 'green':
                A.style.backgroundColor = '#8f8';
                A.style.boxShadow = '0 0 20px 10px #8f8';
                break;
            case 'red':
                B.style.backgroundColor = '#f88';
                B.style.boxShadow = '0 0 20px 10px #f88';
                break;
            case 'blue':
                A.style.backgroundColor = '#88f';
                A.style.boxShadow = '0 0 20px 10px #88f';
                break;
            case 'yellow':
                D.style.backgroundColor = '#ff8';
                D.style.boxShadow = '0 0 20px 10px #ff8';
                break;
        }
        switch(actualInput){
            case 'green':
                A.style.backgroundColor = '#000';
                A.style.borderColor = '#f00';
                break;
            case 'red':
                B.style.backgroundColor = '#000';
                B.style.borderColor = '#f00';
                break;
            case 'blue':
                C.style.backgroundColor = '#000';
                C.style.borderColor = '#f00';
                break;
            case 'yellow':
                D.style.backgroundColor = '#000';
                D.style.borderColor = '#f00';
                break;
        }
    }
}

function refresh(){
    if(E.disabled && F.disabled && G.disabled && H.disabled){
        location.reload();
    }
}

let roundList = [];

function stop(){
    clearInterval(repeat);
} 

let repeat;   
function nextRound() {
    disable();
    stop();
    repeat = setInterval(thisCouldBreakEverything, 500);
    // repeat = setInterval(randomColor, 500);
    let delay = 500 * (roundList.length);
    console.log(delay);
    setTimeout(stop, delay);
    setTimeout(randomColor, delay + 500);
    setTimeout(enable, delay + 1000);
    console.log(roundList);
}

function firstRound(){
    randomColor();
    console.log(expectedInput);
    console.log(roundList);
}

function thisCouldBreakEverything(){
    for(i = 0; i < roundList.length; setInterval(i++, 500)){
        console.log(i);
        console.log(roundList[i]);
        switch(roundList[i]){
            case 'green':
                playNoise('green');
                break;
            case 'red':
                playNoise('red');
                break;
            case 'blue':
                playNoise('blue');
                break;
            case 'yellow':
                playNoise('yellow');
                break;
        }
    }
}