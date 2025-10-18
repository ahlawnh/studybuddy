// A simple list of approved "study" websites.
const studySites = [
    "wikipedia.org",
    "khanacademy.org",
    "stackoverflow.com",
    "github.com",
    "react.dev" // Add your favorite study sites!
];

// This function checks the URL and updates the icon accordingly.
function updateIcon(tabId, url) {
    try {
        const hostname = new URL(url).hostname;
        const isStudySite = studySites.some(site => hostname.includes(site));

        if (isStudySite) {
            chrome.action.setIcon({ path: "images/kitty.png", tabId: tabId });
        } else {
            chrome.action.setIcon({ path: "images/mad.png", tabId: tabId });
        }
    } catch (e) {
        // Handle invalid URLs like chrome://extensions
        chrome.action.setIcon({ path: "images/kitty.png", tabId: tabId });
    }
}

// Listen for when a tab is updated (e.g., user navigates to a new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        updateIcon(tabId, tab.url);
    }
});

// Listen for when the user switches to a different active tab
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.url) {
            updateIcon(tab.id, tab.url);
        }
    });
});