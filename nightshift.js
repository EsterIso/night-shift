// variables for checking active settings
let darkModeActive = false;
let filterActive = false;

// checks if site is has saved settings, if so automatically sets them
async function autoSet(){
  const hostname = window.location.hostname;
  const { siteSettings = {} } = await browser.storage.local.get("siteSettings");
  const saved = siteSettings[hostname];
  if (!saved) return;

  const view = document.querySelectorAll('html');
  const allElements = document.querySelectorAll('*');

  if (saved.darkmode) {
    darkmode(view, allElements);
  } else if (saved.filter) {
    filter(view, allElements);
  }
}

// sets darkmode to site
function darkmode(view, allElements){
  if (darkModeActive) {
    return;
  }

  reset(view, allElements);
  darkModeActive = true;

  view.forEach(view => changeStyle(view))
  allElements.forEach(element => {
    const bg = getComputedStyle(element).backgroundImage;
    if (bg && bg !== "none"){
      changeStyle(element)
    }
  });

  function changeStyle(el) {
    if (el.tagName === 'HTML'){
      el.className = darkModeActive ? el.className + " night-shift" : el.className.replace(" night-shift", "");
    }
    else {
      el.className = darkModeActive ? el.className + " night-shift" : el.className.replace(" night-shift", "");
    }
    }
  }

// sets filter to site
function filter(view, allElements){
  if (filterActive){
    return;
  }

  reset(view, allElements);
  filterActive = true;

  view.forEach(element => changeFilter(element));

  function changeFilter(el) {
    el.className = el.className.replace(" night-shift", "");
    el.style.filter = filterActive ? "sepia(35%) brightness(90%)" : "none";
  }
  
}

// resets site to original style
function reset(view, allElements) {
  if (!darkModeActive && !filterActive) {
    return;
  }
  darkModeActive = false;
  view.forEach(element => original(element));
  allElements.forEach(element => original(element));

  function original(el) {
    
    if (filterActive && el.tagName == 'HTML') {
      el.style.filter = 'none'
      filterActive = false;
      return;
    }

    el.className = el.className.toString().replace(" night-shift", "");
  }
  
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

// runs autoSet at document loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoSet);
} else {
  autoSet();
}

// waits for popup response
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const view = document.querySelectorAll('html');
  const allElements = document.querySelectorAll('*');
  if (message.type === "dark") {
    darkmode(view, allElements);
    // Send a response back synchronously
    sendResponse({ reply: "Active Darkmode" });
  }
  else if (message.type === "filter"){
    filter(view, allElements);
    sendResponse({ reply: "Active Filter" });
  }
  else if (message.type === "save") {
    save();
    sendResponse({ reply: "Saved Settings" });
  }
  else if (message.type === "reset"){
    reset(view, allElements);
    sendResponse({ reply: "Reset site" });
  }
});