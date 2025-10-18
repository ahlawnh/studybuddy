// src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

interface BuddyState {
  image: string;
  message: string;
}

function App() {
  const [buddyState, setBuddyState] = useState<BuddyState>({
    image: 'images/kitty.png',
    message: 'Welcome! Navigate to a page.',
  });

  // This useEffect hook sets up a listener for messages from the background script.
  useEffect(() => {
    const messageListener = (message: any) => {
      // Check if the message is the one we care about
      if (message.type === 'URL_STATUS') {
        if (message.isStudySite) {
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
      }
    };

    // Add the listener when the component mounts
    chrome.runtime.onMessage.addListener(messageListener);

    // Return a cleanup function to remove the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []); // The empty array [] means this effect runs only once to set up the listener.

  return (
    <div className="App">
      <img src={buddyState.image} className="buddy-image" alt="Study Buddy status" />
      <h2>{buddyState.message}</h2>
    </div>
  );
}

export default App;