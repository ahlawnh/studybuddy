// background.js

// --- List of Approved Study Websites ---
const studySites = [
  "wikipedia.org",
  "khanacademy.org",
  "coursera.org",
  "edx.org",
  "stackoverflow.com",
  "github.com",
  "react.dev",
  "developer.mozilla.org"
];

// Function to check the tab's URL and send a message to the side panel
function checkTabAndSendMessage(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    // Don't run on invalid tabs or URLs
    if (!tab || !tab.url) {
      return;
    }

    try {
      const url = new URL(tab.url);
      const isStudySite = studySites.some(site => url.hostname.includes(site));

      // Send a message to the side panel with the result
      chrome.runtime.sendMessage({ type: 'URL_STATUS', isStudySite });

    } catch (error) {
      // Ignore errors for special URLs like chrome://
    }
  });
}

// --- Event Listeners ---

// 1. When the user clicks the extension icon
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// 2. When the user switches to a different tab
chrome.tabs.onActivated.addListener((activeInfo) => {
  checkTabAndSendMessage(activeInfo.tabId);
});

// 3. When the user navigates to a new URL in the current tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only check if the URL has changed and the tab is active
  if (changeInfo.url && tab.active) {
    checkTabAndSendMessage(tabId);
  }
});