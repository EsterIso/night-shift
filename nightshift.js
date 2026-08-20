let darkModeActive = false;
let filterActive = false;

function activate(allElements){
  if (filterActive) {
    filterActive = !filterActive;
  }
  darkModeActive = !darkModeActive;
  allElements.forEach(element => changeStyle(element));
  function changeStyle(el) {
    el.className = darkModeActive ? "night-shift" : "none"
    el.style.filter = darkModeActive ? "invert(100%) hue-rotate(180deg)" : "none";
  }
}

function filter(allElements){
  if (darkModeActive){
    darkModeActive = !darkModeActive;
  }
  filterActive = !filterActive;
  allElements.forEach(element => changeFilter(element));
  function changeFilter(el) {
    el.className = "none";
    el.style.filter = filterActive ? "sepia(20%) saturate(140%) contrast(105%)" : "none";
  }
  
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const allElements = document.querySelectorAll('html');
  if (message.type === "activate") {
    activate(allElements);
    // Send a response back synchronously
    sendResponse({ reply: "Active Darkmode" });
  }
  else if (message.type === "filter"){
    filter(allElements);
    sendResponse({ reply: "Active Filter" });
  }
});