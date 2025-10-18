import { useState, useEffect } from 'react';
import './App.css';

// Define the shape of our state object for type safety
interface BuddyState {
  image: string;
  message: string;
}

// --- List of Approved Study Websites ---
// IMPORTANT: This list should match the one in your public/background.js file.
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

function App() {
  // State to hold the buddy's current image and message
  const [buddyState, setBuddyState] = useState<BuddyState>({
    image: 'images/kitty.png',
    message: 'Loading...',
  });

  // This `useEffect` hook runs once when the popup is opened.
  // It's the "workhorse" that checks the current tab's URL.
  useEffect(() => {
    // Chrome extension APIs are asynchronous. We use `chrome.tabs.query`
    // to find the currently active tab in the current window.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];

      // Make sure we have a valid tab and URL
      if (currentTab && currentTab.url) {
        try {
          const url = new URL(currentTab.url);
          const isStudySite = studySites.some(site => url.hostname.includes(site));

          if (isStudySite) {
            // If it's a study site, set a happy state
            setBuddyState({
              image: 'images/kitty.png',
              message: 'Great job studying!',
            });
          } else {
            // Otherwise, set a mad state
            setBuddyState({
              image: 'images/mad.png',
              message: 'Hey! Get back to studying!',
            });
          }
        } catch (error) {
          // Handle invalid URLs like chrome://newtab
          setBuddyState({
            image: 'images/kitty.png',
            message: 'Ready for a study session?',
          });
        }
      }
    });
  }, []); // The empty array `[]` means this effect runs only once.

  return (
    <div className="App">
      <img src={buddyState.image} className="buddy-image" alt="Study Buddy status" />
      <h2>{buddyState.message}</h2>
    </div>
  );
}

export default App;
