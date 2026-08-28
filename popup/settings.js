async function activateNightShift(type) {
    // 1. Get the current active tab
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) return;
    // 2. Send a message to that specific tab's content script
    let response;
    
    response = await browser.tabs.sendMessage(tab.id, { type: type });
    
    
    console.log("Content script responded:", response);
}

const container = document.getElementById('style-buttons');
container.addEventListener('click', (event) => {
    
    activateNightShift(event.target.id);
   
});
