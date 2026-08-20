async function activateNightShift(type) {
    // 1. Get the current active tab
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) return;
    // 2. Send a message to that specific tab's content script
    let response;
    switch (type) {
        case "activate":
            response = await browser.tabs.sendMessage(tab.id, { type: "activate" });
            break;
        case "filter":
            response = await browser.tabs.sendMessage(tab.id, { type: "filter" });
            break;
    }
    
    console.log("Content script responded:", response);
}

const container = document.getElementById('style-buttons');
container.addEventListener('click', (event) => {
    
    activateNightShift(event.target.id);
   
});
