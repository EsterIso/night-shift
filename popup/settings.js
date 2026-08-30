async function activateNightShift(type) {
    // 1. Get the current active tab
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) return;
    // 2. Send a message to that specific tab's content script
    let response;
    
    response = await browser.tabs.sendMessage(tab.id, { type: type });
    
    
    console.log("Content script responded:", response);
}

const container = document.querySelector('.popup-content');
container.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    activateNightShift(btn.id);
    
});

const styleButtons = document.querySelector('.style-buttons');
const buttons = styleButtons.querySelectorAll(':scope > button');

buttons.forEach(button => button.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
}));