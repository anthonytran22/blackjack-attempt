let deck = [];
let playerHand = [];
let dealerHand = [];

const bustGifs = [
  "https://i.kym-cdn.com/photos/images/newsfeed/003/051/073/a42.gif",
  "https://media1.tenor.com/m/bdmGf6BTKVkAAAAd/squidward-squidward-explodes.gif",
  "https://media1.tenor.com/m/3E-N0NduBM4AAAAd/dead-space-kamikaze.gif"
];

const winGifs = [
  "https://media1.tenor.com/m/7KpPFEO4uTgAAAAC/pica-pica-funny.gif",
  "https://media1.tenor.com/m/qBtPrUQcEAoAAAAC/kevin-gates-rbs-intro.gif",
  "https://media1.tenor.com/m/rRtcDk4OZcgAAAAC/fentfriday.gif"
];

const loseGifs = [
  "https://media1.tenor.com/m/3xUw0rsM0t4AAAAd/fortnite-take-the-l.gif",
  "https://media1.tenor.com/m/0Ql4irBFLPAAAAAC/red-mist.gif",
  "https://media1.tenor.com/m/LZPTcGE6skgAAAAC/hammer.gif"
];

function getRandomGif(gifArray) {
  const index = Math.floor(Math.random() * gifArray.length);
  return gifArray[index];
}

function cardValues(card) {
  if (['J','Q','K'].includes(card)) return 10;
  if (card == 'A') return 1;
  return parseInt(card);
}

function handValues(hand) {
  let total = 0, amtOfAces = 0;
  for (let card of hand) {
    total += cardValues(card);
    if (card === 'A') amtOfAces++;
  }
  while (amtOfAces > 0 && total + 10 <= 21) {
    total += 10;
    amtOfAces--;
  }
  return total;
}

window.onload = () => {
  // attach click events for character selection
  document.querySelectorAll('.character').forEach(img => { 
    img.addEventListener('click', () => {
      const playerImgFile = img.src
      document.getElementById("sideImage").src = playerImgFile
      document.getElementById("menuScreen").style.display = "none";
      document.getElementById("gameScreen").style.display = "block";
      init();
    });
  });
}

function init() {
  deck = [];
  playerHand = [];
  dealerHand = [];

  const cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  for (let i = 0; i < 4; i++) deck = deck.concat(cards);
  deck.sort(() => Math.random() - 0.5);

  playerHand.push(deck.pop(), deck.pop());
  dealerHand.push(deck.pop(), deck.pop());

  document.getElementById("result").innerText = "";
  document.getElementById("hit").disabled = false;
  document.getElementById("stay").disabled = false;
  document.getElementById("resultGif").style.display = "none";
  document.getElementById("resultGif").src = "";
  document.getElementById("leftBanner").style.display = "none";
  document.getElementById("rightBanner").style.display = "none";
  document.getElementById("wLBanner").style.display = "none";
  document.getElementById("wRBanner").style.display = "none";

  updateDisplay();
}

function updateDisplay() {
  document.getElementById("playerHand").innerText = playerHand.join(", ");
  document.getElementById("playerTotal").innerText = "total: " + handValues(playerHand);

  let firstCard = dealerHand[0];
  let firstCardDisplay = ['J','Q','K'].includes(firstCard) ? 10 :
                          (firstCard === 'A' ? "11 or 1" : firstCard);

  document.getElementById("dealerHand").innerText = firstCard + ", ?";
  document.getElementById("dealerTotal").innerText = "total: " + firstCardDisplay + " + ?";
}

function hit() {
  playerHand.push(deck.pop());
  updateDisplay();
  let playerTotal = handValues(playerHand);

  if (playerTotal > 21) {
    showResult("buustttttttt loser", getRandomGif(bustGifs), true, false);
  }
}

function stand() {
  while (handValues(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }

  let playerTotal = handValues(playerHand);
  let dealerTotal = handValues(dealerHand);

  document.getElementById("dealerHand").innerText = dealerHand.join(", ");
  document.getElementById("dealerTotal").innerText = "total: " + dealerTotal;

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    showResult("winner winner chicken dinner", getRandomGif(winGifs), false, true);
  } else if (playerTotal < dealerTotal) {
    showResult("loser LOL", getRandomGif(loseGifs), true, false);
  } else {
    showResult("tie (dealer wins so u lose)", "https://media1.tenor.com/m/ap6LSaSeQ_kAAAAC/ishowspeed-try-not-to-laugh.gif", true, false);
  }
}

function showResult(text, gifURL, showBanners = false, isWinner = false) {
  document.getElementById("result").innerText = text;
  const gifEl = document.getElementById("resultGif");
  const leftBanner = document.getElementById("leftBanner");
  const rightBanner = document.getElementById("rightBanner");
  const wLBanner = document.getElementById("wLBanner");
  const wRBanner = document.getElementById("wRBanner");

  if (gifURL) {
    gifEl.src = gifURL;
    gifEl.style.display = "block";
  } else {
    gifEl.style.display = "none";
  }

  if(isWinner) {
    wLBanner.style.display = "block";
    wRBanner.style.display = "block";
  } else {
    wLBanner.style.display = "none";
    wRBanner.style.display = "none";
  }

  if (showBanners) {
    leftBanner.style.display = "block";
    rightBanner.style.display = "block";
  } else {
    leftBanner.style.display = "none";
    rightBanner.style.display = "none";
  }

  document.getElementById("hit").disabled = true;
  document.getElementById("stay").disabled = true;
}
