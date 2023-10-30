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


//variables
let A = document.getElementById('blue');
let B = document.getElementById('yellow');
let C = document.getElementById('red');
let D = document.getElementById('green');
let E = document.getElementById('bluebtn');
let F = document.getElementById('yellowbtn');
let G = document.getElementById('redbtn');
let H = document.getElementById('greenbtn');

let roundList = [];
let container = [];

const colors = ['blue', 'yellow', 'red', 'green'];

let expectedInput = ''
let actualInput;

let score = 0;
let scoreText = document.getElementById('score');
scoreText.innerText = `Score: ${score}`;

let interval, i = 0;
interval = setInterval(order, 500);

let j = 0;

let repeat;


//functions
function reset(color){
    if(color == 'blue'){
        A.style.backgroundColor = '#33f';
        A.style.boxShadow = '0 0 0 0';
        A.style.borderStyle = 'outset';
        A.style.borderColor = '#000'
    } else if(color == 'yellow'){
        B.style.backgroundColor = "#ff3";
        B.style.boxShadow = '0 0 0 0';
        B.style.borderStyle = 'outset';
        B.style.borderColor = '#000'
    } else if(color == 'red'){
        C.style.backgroundColor = "#f33";
        C.style.boxShadow = "0 0 0 0";
        C.style.borderStyle = 'outset';
        C.style.borderColor = '#000'
    } else if(color == 'green'){
        D.style.backgroundColor = "#3f3";
        D.style.boxShadow = '0 0 0 0';
        D.style.borderStyle = 'outset';
        D.style.borderColor = '#000'
    }
}

function playNoise(color){
    if(color == 'blue'){
        A.style.backgroundColor = '#88f';
        A.style.boxShadow = '0 0 20px 10px #88f';
        A.style.borderStyle = 'inset';
        A.style.borderColor = '#005'
        playFrequency(440);
        setTimeout(function(){ reset('blue') }, 400);
    } else if(color == 'yellow'){
        B.style.backgroundColor = '#ff8';
        B.style.boxShadow = '0 0 20px 10px #ff8';
        B.style.borderStyle = 'inset';
        B.style.borderColor = '#550'
        playFrequency(554.3653);
        setTimeout(function(){ reset('yellow') }, 400);
    } else if(color == 'red'){
        C.style.backgroundColor = '#f88';
        C.style.boxShadow = '0 0 20px 10px #f88';
        C.style.borderStyle = 'inset';
        C.style.borderColor = '#500'
        playFrequency(659.2551);
        setTimeout(function(){ reset('red') }, 400);
    } else if(color == 'green'){
        D.style.backgroundColor = '#8f8';
        D.style.boxShadow = '0 0 20px 10px #8f8';
        D.style.borderStyle = 'inset';
        D.style.borderColor = '#050'
        playFrequency(880);
        setTimeout(function(){ reset('green') }, 400);
    }
}



function randomColor(){
    let result = Math.ceil(Math.random() * 4);
    switch(result){
        case 1:
            result = 'blue';
            playNoise('blue');
            break;
        case 2:
            result = 'yellow';
            playNoise('yellow');
            break;
        case 3:
            result = 'red';
            playNoise('red');
            break;
        case 4:
            result = 'green';
            playNoise('green');
            break;
        default:
            console.log('not 1');
            break;
    }
    expectedInput = result;
    container[0] = expectedInput;
}

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
        case 'blue':
            actualInput = 'blue';
            break;
        case 'yellow':
            actualInput = 'yellow';
            break;
        case 'red':
            actualInput = 'red';
            break;
        case 'green':
            actualInput = 'green';
            break;
    }
    if(actualInput == expectedInput){
        j++;
        console.log(j);
        console.log(roundList.length + 1)
        if(j == roundList.length + 1){
            score += 1;
            scoreText.innerText = `Score: ${score}`;
            roundList.push(expectedInput);
            console.log(j);
            nextRound();
        }
    } else {
        scoreText.innerText = `you lose || score: ${score}`;
        disable();
        document.getElementById("start").innerText = "Refresh";
        document.getElementById("start").disabled = false;
        switch(expectedInput){
            case 'blue':
                A.style.backgroundColor = '#88f';
                A.style.boxShadow = '0 0 20px 10px #88f';
                A.style.borderColor = '#005'
                break;
            case 'yellow':
                B.style.backgroundColor = '#ff8';
                B.style.boxShadow = '0 0 20px 10px #ff8';
                B.style.borderColor = '#550'
                break;
            case 'red':
                C.style.backgroundColor = '#f88';
                C.style.boxShadow = '0 0 20px 10px #f88';
                C.style.borderColor = '#500'
                break;
            case 'green':
                D.style.backgroundColor = '#8f8';
                D.style.boxShadow = '0 0 20px 10px #8f8';
                D.style.borderColor = '#050'
                break;
        }
        switch(actualInput){
            case 'blue':
                A.style.backgroundColor = '#000';
                A.style.borderColor = '#f00';
                break;
            case 'yellow':
                B.style.backgroundColor = '#000';
                B.style.borderColor = '#f00';
                break;
            case 'red':
                C.style.backgroundColor = '#000';
                C.style.borderColor = '#f00';
                break;
            case 'green':
                D.style.backgroundColor = '#000';
                D.style.borderColor = '#f00';
                break;
        }
    }
}

function disableStartButton(){
    document.getElementById('start').disabled = true;
}

function refresh(){
    if(E.disabled && F.disabled && G.disabled && H.disabled){
        location.reload();
    }
}

function stop(){
    clearInterval(repeat);
} 

function nextRound() {
    disable();
    stop();
    i = 0
    repeat = setInterval(order, 500);
    let delay = 500 * (roundList.length);
    setTimeout(stop, delay);
    setTimeout(randomColor, delay + 500);
    setTimeout(setExpectedToZero, delay + 1000);
    setTimeout(enable, delay + 1000);
    setTimeout(j = 0, delay + 1000);
}

function firstRound(){
    randomColor();
}

function order(){
    if(i < roundList.length){
        i++;
        expectedInput = roundList[i-1]
        switch(expectedInput){
            case 'blue':
                playNoise('blue');
                break;
            case 'yellow':
                playNoise('yellow');
                break;
            case 'red':
                playNoise('red');
                break;
            case 'green':
                playNoise('green');
                break;
        }
    } else clearInterval(interval);
}

function setExpectedToZero(){
    expectedInput = roundList[j];
    E.addEventListener('click', function(){
        console.log(roundList[j - 1]);
        console.log(j);
        console.log(expectedInput);
    });
    F.addEventListener('click', function(){
        console.log(roundList[j - 1]);
        console.log(j);
        console.log(expectedInput);
    });
    G.addEventListener('click', function(){
        console.log(roundList[j - 1]);
        console.log(j);
        console.log(expectedInput);
    });
    H.addEventListener('click', function(){
        console.log(roundList[j - 1]);
        console.log(j);
        console.log(expectedInput);
    });
}