document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('autoClickToggle');

    chrome.storage.local.get(['autoClickEnabled'], (result) => {
        toggle.checked = !!result.autoClickEnabled;
    });

    toggle.addEventListener('change', () => {
        chrome.storage.local.set({ autoClickEnabled: toggle.checked });
    });
});
