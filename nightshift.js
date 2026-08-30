// variables for checking active settings
let darkModeActive = false;
let filterActive = false;

// checks if site is has saved settings, if so automatically sets them
async function autoSet(){
  const hostname = window.location.hostname;
  const { siteSettings = {} } = await browser.storage.local.get("siteSettings");
  const saved = siteSettings[hostname];

  if (!saved) return;

  const { html, allElements } = getElements();

  if (saved.darkmode) {
    darkmode(html, allElements);
  } else if (saved.filter) {
    filter(html, allElements);
  }
}

function getElements() {
  const html = document.querySelectorAll('html');
  const allElements = document.querySelectorAll('*');
  return { html, allElements };
}

// sets darkmode to site
function darkmode(html, allElements){
  if (darkModeActive) {
    return;
  }

  reset(html, allElements);
  darkModeActive = true;

  html.forEach(html => html.classList.add("night-shift"))
  allElements.forEach(element => {
    const bg = getComputedStyle(element).backgroundImage;
    if (bg && bg !== "none"){
      element.classList.add("night-shift");
    }
  });
  }

// sets filter to site
function filter(html, allElements){
  if (filterActive){
    return;
  }

  reset(html, allElements);
  filterActive = true;

  html.forEach(element => {
    element.style.filter = "sepia(35%) brightness(90%)";
  });
  
}

// resets site to original style
function reset(html, allElements) {
  darkModeActive = false;
  filterActive = false;
  html.forEach(element => element.style.filter = "none");
  allElements.forEach(element => element.classList.remove("night-shift"));
  
}

// saves settings for current site
async function save() {
  if (!darkModeActive && !filterActive) {
    return;
  }
  
  const hostname = window.location.hostname;
  const {siteSettings = {} } = await browser.storage.local.get("siteSettings");
  let settings;

  if (darkModeActive) {
    settings = {darkmode: true, filter: false};
  } else {
    settings = {darkmode: false, filter: true};
  }

  siteSettings[hostname] = {...siteSettings[hostname], ...settings};
  await browser.storage.local.set({siteSettings});
}

if (document.readyState === "complete") {
    autoSet();
} else {
    window.addEventListener("load", autoSet);
}

// waits for popup response
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { html, allElements } = getElements();

  if (message.type === "dark") {
    darkmode(html, allElements);
    // Send a response back synchronously
    sendResponse({ reply: "Active Darkmode" });
  }
  else if (message.type === "filter"){
    filter(html, allElements);
    sendResponse({ reply: "Active Filter" });
  }
  else if (message.type === "save") {
    save();
    sendResponse({ reply: "Saved Settings" });
  }
  else if (message.type === "reset"){
    reset(html, allElements);
    sendResponse({ reply: "Reset site" });
  }
});