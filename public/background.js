// Declare the chrome variable
const chrome = window.chrome

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId })
})

// Keep side panel open across navigation
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {
  // Ignore errors for older Chrome versions
})
