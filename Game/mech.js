let Gold = parseInt(localStorage.getItem("Gold")) || 0;
let GoldPerSecond = parseInt(localStorage.getItem("GoldSec")) || 0;
let GoldPerClick = parseInt(localStorage.getItem("GoldClick")) || 1;
let upgradeCostClick = parseInt(localStorage.getItem("UpCostClick")) || 10;
let upgradeCostSec = parseInt(localStorage.getItem("UpCostSec")) || 100;
let firstClick = JSON.parse(localStorage.getItem("FClick"));
if(firstClick === null) firstClick = true;
let clickLevel = parseInt(localStorage.getItem("ClickLevel")) || 0;
const clickLevelMilestones = [9, 24, 49, 99, 199, 499, 999];
const clickLevel2x = [10, 25, 50, 100, 200, 500, 1000];


function initDisplay() {
  document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
  document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
updateUpgradeClickButton();
  document.getElementById("upgradeCostSec").innerHTML = "Cost: " + upgradeCostSec;
  document.getElementById("ClickLvl").innerHTML = "Level: " + clickLevel;
  updateClickPowerDisplay();

  // Supprime les <p> d'intro si déjà achetés
    if (firstClick) {
        const intro = document.createElement("p");
        intro.id = "intro-text";
        intro.innerHTML = "Click to earn gold!";
        document.body.appendChild(intro);
    } else {
        const intro = document.getElementById("intro-text");
  if (!firstClick) {
    const intro = document.getElementById("intro-text");
    if (intro) intro.remove();
  }
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

function updateUpgradeClickButton() {
  document.getElementById("upgradeCostClick").innerHTML = "Level: " + clickLevel + "<br>Cost: " + upgradeCostClick;
}

function checkClickLevelMilestone() {
    if (clickLevel2x.includes(clickLevel)) {
        GoldPerClick *=2;
        alert("Congratulations! Your click power has doubled to " + GoldPerClick + "!");
        updateClickPowerDisplay();
        localStorage.setItem("GoldClick", GoldPerClick);
    }
}

function buyUpgradeClick() {
    
  if (Gold >= upgradeCostClick) {
    Gold -= upgradeCostClick;
    GoldPerClick += 1;
    clickLevel += 1;
    if(clickLevelMilestones.includes(clickLevel)) {
        upgradeCostClick = Math.floor(upgradeCostClick * 2.5);
    }else {
        upgradeCostClick = Math.floor(upgradeCostClick * 1.25);
    }

    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    updateUpgradeClickButton();


    localStorage.setItem("UpCostClick", upgradeCostClick);
    localStorage.setItem("GoldClick", GoldPerClick);
    localStorage.setItem("ClickLevel", clickLevel);

    updateClickPowerDisplay();
    checkClickLevelMilestone();
  } else {
    alert("Not enough gold!");
  }
}

function updateClickPowerDisplay() {
  const pClickElements = document.getElementsByClassName("PClick");
  for (let el of pClickElements) {
    el.innerHTML = "Click Power: " + GoldPerClick;
  }
}


function buyUpgradeSec() {
   
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