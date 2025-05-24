// ------------------------
// content-script.js
// Listens for messages from popup and applies scaling to the video element on the page
// ------------------------

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleScale') {
    // Select the first <video> element on the page
    const video = document.querySelector('video');

    if (!video) {
      console.warn('No video element found on the page to scale.');
      return;
    }

    // Apply or remove the CSS scale transform based on the toggle state
    video.style.transform = message.enabled ? 'scale(1.34)' : 'scale(1)';
    video.style.transition = 'transform 0.3s ease'; // Smooth transition effect
  }
});
