// ------------------------
// popup.js
// Handles UI interactions, saves toggle state, and communicates with content script
// ------------------------

// Select GitHub button and toggle switch elements
const githubButton = document.querySelector('.github-button');
const toggle = document.getElementById('toggle-ultrawide');

// Open the GitHub repository in a new tab when the GitHub button is clicked
githubButton.addEventListener('click', () => {
  const githubURL = 'https://github.com/AlexysGromard/MyCanalZoom';
  window.open(githubURL, '_blank');
});

// Listen for toggle state changes
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;

  // Save the toggle state to extension local storage
  chrome.storage.local.set({ ultrawideEnabled: enabled });

  // Send message to content script to update video scaling
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'toggleScale',
      enabled: enabled,
    });
  });
});

// Restore toggle state when popup is loaded
chrome.storage.local.get(['ultrawideEnabled'], (result) => {
  const enabled = result.ultrawideEnabled || false;
  toggle.checked = enabled;

  // Optionally, update the page immediately in case it changed while popup was closed
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;

    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'toggleScale',
      enabled: enabled,
    });
  });
});
