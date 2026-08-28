let darkModeActive = false;
let filterActive = false;

function activate(view, allElements){
  if (filterActive) {
    filterActive = !filterActive;
  }
  darkModeActive = !darkModeActive;
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
    el.style.filter = darkModeActive ? "invert(100%) hue-rotate(180deg)" : "none";
    }
  }

function filter(view, allElements){
  if (darkModeActive){
    darkModeActive = !darkModeActive;
  }
  filterActive = !filterActive;
  view.forEach(element => changeFilter(element));
  function changeFilter(el) {
    el.className = el.className.replace(" night-shift", "");
    el.style.filter = filterActive ? "sepia(35%) brightness(90%)" : "none";
  }
  
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const view = document.querySelectorAll('html');
  const allElements = document.querySelectorAll('*');
  if (message.type === "activate") {
    activate(view, allElements);
    // Send a response back synchronously
    sendResponse({ reply: "Active Darkmode" });
  }
  else if (message.type === "filter"){
    filter(view, allElements);
    sendResponse({ reply: "Active Filter" });
  }
});