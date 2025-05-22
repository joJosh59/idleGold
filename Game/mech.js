let Gold = parseInt(localStorage.getItem("Gold")) || 0;
let GoldPerSecond = parseInt(localStorage.getItem("GoldSec")) || 0;
let GoldPerClick = parseInt(localStorage.getItem("GoldClick")) || 1;
let upgradeCostClick = parseInt(localStorage.getItem("UpCostClick")) || 10;
let upgradeCostSec = parseInt(localStorage.getItem("UpCostSec")) || 100;
let firstClick = JSON.parse(localStorage.getItem("FClick"));
if(firstClick === null) firstClick = true;
let clickLevel = parseInt(localStorage.getItem("ClickLevel")) || 0;
let idleLevel = parseInt(localStorage.getItem("IdleLevel")) || 0;

// Tableau des niveaux de clics et des multiplicateurs
const clickLevelMilestones = [9, 24, 49, 99, 199, 499, 999];
const clickLevel2x = [10, 25, 50, 100, 200, 500, 1000];


// initialisation de l'affichage
function initDisplay() {
  document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
  document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
updateUpgradeClickButton();
  document.getElementById("upgradeCostSec").innerHTML = "Cost: " + upgradeCostSec;
  updateClickPowerDisplay();
  updateIdlePowerDisplay();
  updateUpgradeSecButton();


  // Supprime les <p> d'intro si déjà achetés
   if (!firstClick) {
  const intro = document.getElementById("intro-text");
  if (intro) intro.remove();
} else if (!document.getElementById("intro-text")) {
  const intro = document.createElement("p");
  intro.id = "intro-text";
  intro.innerHTML = "Click to earn gold!";
  document.body.appendChild(intro);
}
}

// Ajout d'un écouteur d'événements pour l'initialisation de l'affichage
document.addEventListener("DOMContentLoaded", initDisplay);

// Fonction pour gérer le clic sur le bouton
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

// Fonction pour générer de l'or chaque seconde
function generateGold() {
  Gold += GoldPerSecond;
  document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;
    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    localStorage.setItem("Gold", Gold);
}

// Fonction pour générer de l'or chaque seconde
setInterval(generateGold, 1000);

// Fonction pour mettre à jour le bouton d'achat de mise à niveau
function updateUpgradeClickButton() {
  document.getElementById("upgradeCostClick").innerHTML = "Level: " + clickLevel + "<br>Cost: " + upgradeCostClick;
}

// Fonction pur mettre a jour le bouton d'achat de mise à niveau de génération d'or par seconde
function updateUpgradeSecButton() {
  document.getElementById("upgradeCostSec").innerHTML = "Level:"+ idleLevel + "<br>Cost: " + upgradeCostSec;
}

// Fonction pour vérifier si le niveau de clic a atteint un jalon
function checkClickLevelMilestone() {
    if (clickLevel2x.includes(clickLevel)) {
        GoldPerClick *=2;
        alert("Congratulations! Your click power has doubled to " + GoldPerClick + "!");
        updateClickPowerDisplay();
        localStorage.setItem("GoldClick", GoldPerClick);
    }
}

// Fonction pour verifier si le niveau d'inactivité a atteint un jalon
function checkIdleLevelMilestone() {
    if (clickLevel2x.includes(idleLevel)) {
        GoldPerSecond *=2;
        alert("Congratulations! Your idle power has doubled to " + GoldPerSecond + "!");
        updateIdlePowerDisplay();
        localStorage.setItem("GoldSec", GoldPerSecond);
    }
}

// Fonction pour acheter une mise à niveau de clic
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

function updateIdlePowerDisplay() {
  const pIdleElements = document.getElementsByClassName("PIdle");
  for (let el of pIdleElements) {
    el.innerHTML = "Idle Power: " + GoldPerSecond;
  }
}

// Fonction pour acheter une mise à niveau de génération d'or par seconde
function buyUpgradeSec() {
   
  if (Gold >= upgradeCostSec) {
    Gold -= upgradeCostSec;
    GoldPerSecond += 1;
    idleLevel += 1;

    if (clickLevelMilestones.includes(idleLevel)) {
        upgradeCostSec = Math.floor(upgradeCostSec * 2.5);
    } else {
        upgradeCostSec = Math.floor(upgradeCostSec * 1.25);
    }
    updateIdlePowerDisplay();
    updateUpgradeSecButton();
    checkIdleLevelMilestone();
    

    document.getElementById("goldDisplay").innerHTML = "Gold: " + Gold;
    document.getElementById("GoldPerSec").innerHTML = "Gold/sec: " + GoldPerSecond;

    localStorage.setItem("UpCostSec", upgradeCostSec);
    localStorage.setItem("GoldSec", GoldPerSecond);
    localStorage.setItem("IdleLevel", idleLevel);
    
  } else {
    alert("Not enough gold!");
  }
}