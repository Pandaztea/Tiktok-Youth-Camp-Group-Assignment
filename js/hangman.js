const country_names = [
	"china",
	"india",
	"indonesia",
	"pakistan",
	"brazil",
	"nigeria",
	"bangladesh",
	"russia",
	"mexico",
	"japan",
	"ethiopia",
	"philippines",
	"egypt",
	"vietnam",
	"turkey",
	"iran",
	"germany",
	"thailand",
  "france",
	"italy",
	"tanzania",
	"myanmar",
	"kenya",
]

let answer = "";
let maxWrong = 7;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

const correctsound = new Audio('./sound/Correct-answer.mp3');
const wrongsound = new Audio('./sound/Wrong-Clakson-Sound-Effect.mp3');

function randcount() {
  answer = country_names[Math.floor(Math.random() * country_names.length)];
}

function genlettter() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="processguess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function processguess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guesscount();
    checkwin();
    correctsound.play();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    wrongsound.play();
    collateerrors();
    checkwinorlose();
    drawline();
  }
}

function drawline() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '-1'+ '.png';
}

function checkwin() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkwinorlose() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guesscount() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function collateerrors() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0-1.png';

  randcount();
  guesscount();
  collateerrors();
  genlettter();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randcount();
genlettter();
guesscount();
