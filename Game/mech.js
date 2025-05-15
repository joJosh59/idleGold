let Gold = parseInt(localStorage.getItem("Gold")) || 0;
let GoldPerSecond = parseInt(localStorage.getItem("GoldSec")) || 0;
let GoldPerClick = parseInt(localStorage.getItem("GoldClick")) || 1;
let upgradeCostClick = parseInt(localStorage.getItem("UpCostClick")) || 10;
let upgradeCostSec = parseInt(localStorage.getItem("UpCostSec")) || 100;
let firstClick = JSON.parse(localStorage.getItem("FClick"));
if(firstClick === null) firstClick = true;
let firstBuySec =JSON.parse(localStorage.getItem("FBuySec")) || true;
let firstBuyClick = JSON.parse(localStorage.getItem("FBuyClick")) || true;


function initDisplay() {
  document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
  document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
  document.getElementById("upgradeCostClick").innerHTML = "Cost: " + upgradeCostClick;
  document.getElementById("PClick").innerHTML = "+" + GoldPerClick + " Gold";
  document.getElementById("upgradeCostSec").innerHTML = "Cost: " + upgradeCostSec;

  // Supprime les <p> d'intro si déjà achetés
  if (!firstBuyClick) {
    const introBuy = document.getElementById("firstBuyCl");
    if (introBuy) introBuy.remove();
  }
  if (!firstBuySec) {
    const introBuyS = document.getElementById("firstBuySec");
    if (introBuyS) introBuyS.remove();
  }
  if (!firstClick) {
    const intro = document.getElementById("intro-text");
    if (intro) intro.remove();
  }
}

document.addEventListener("DOMContentLoaded", initDisplay);

function earnGold() {
    if (firstClick) {
    const intro = document.getElementById("intro-text");
    if (intro) intro.remove();
    firstClick = false;
    localStorage.setItem("FClick", JSON.stringify(firstClick));
  }
  Gold += GoldPerClick;
  document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
  localStorage.setItem("Gold", Gold);
}

function generateGold() {
  Gold += GoldPerSecond;
  document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    localStorage.setItem("Gold", Gold);
}

setInterval(generateGold, 1000); // Generate Gold every second


function buyUpgradeClick() {
     if (firstBuyClick) {
    const introBuy = document.getElementById("firstBuyCl");
    if (introBuy) introBuy.remove();
    firstBuyClick = false;
    localStorage.setItem("FBuyClick", JSON.stringify(firstBuyClick));
  }
  if (Gold >= upgradeCostClick) {
    Gold -= upgradeCostClick;
    GoldPerClick += 1;
    upgradeCostClick = Math.floor(upgradeCostClick * 1.25);

    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("upgradeCostClick").innerHTML = "Cost: " + upgradeCostClick;
    document.getElementById("PClick").innerHTML = "+" + GoldPerClick + " Gold";

    localStorage.setItem("UpCostClick", upgradeCostClick);
    localStorage.setItem("GoldClick", GoldPerClick);
  } else {
    alert("Not enough gold!");
  }
}

function buyUpgradeSec() {
     if (firstBuySec) {
    const introBuyS = document.getElementById("firstBuySec");
    if (introBuyS) introBuyS.remove();
    firstBuySec = false;
    localStorage.setItem("FBuySec", JSON.stringify(firstBuySec));  
  }
  if (Gold >= upgradeCostSec) {
    Gold -= upgradeCostSec;
    GoldPerSecond += 1;
    upgradeCostSec = Math.floor(upgradeCostSec * 1.25);

    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("upgradeCostSec").innerHTML = "Cost: " + upgradeCostSec;

    localStorage.setItem("UpCostSec", upgradeCostSec);
    localStorage.setItem("GoldSec", GoldPerSecond);
  } else {
    alert("Not enough gold!");
  }
}