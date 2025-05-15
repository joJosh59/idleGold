let Gold = 0;
let GoldPerSecond = 0;
let GoldPerClick = 1;
let upgradeCostClick = 10;
let upgradeCostSec = 100;

function earnGold() {
  Gold += GoldPerClick;
  document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
}

function generateGold() {
  Gold += GoldPerSecond;
  document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
}

setInterval(generateGold, 1000); // Generate Gold every second
// document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
// document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
// document.getElementById("PClick").innerHTML = "actuel: " + GoldPerClick;
// document.getElementById("upgradeCostClick").innerHTML = "Upgrade ClickPower Cost: " + upgradeCostClick;

function buyUpgradeClick() {
  if (Gold >= upgradeCostClick) {
    Gold -= upgradeCostClick;
    GoldPerClick += 1;
    upgradeCostClick = Math.floor(upgradeCostClick * 1.25);
    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("upgradeCostClick").innerHTML = "Upgrade ClickPower Cost: " + upgradeCostClick;
    document.getElementById("PClick").innerHTML = "+" + GoldPerClick + " Gold";
  } else {
    alert("Not enough gold!");
  }
}

function buyUpgradeSec() {
  if (Gold >= upgradeCostSec) {
    Gold -= upgradeCostSec;
    GoldPerSecond += 1;
    upgradeCostSec = Math.floor(upgradeCostSec * 1.25);
    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("upgradeCostSec").innerHTML = "Upgrade gold par seconde Cost: " + upgradeCostSec;
  } else {
    alert("Not enough gold!");
  }
}