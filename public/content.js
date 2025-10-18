// content.js

// Create a host element for our shadow DOM
const host = document.createElement('div');
host.id = 'study-buddy-host';
document.body.appendChild(host);

// Create the shadow root
const shadowRoot = host.attachShadow({ mode: 'open' });

// Create the root element for the React app inside the shadow DOM
const appRoot = document.createElement('div');
appRoot.id = 'root';
shadowRoot.appendChild(appRoot);

// Load the React app by fetching the index.html from the extension's files
fetch(chrome.runtime.getURL('index.html'))
  .then(response => response.text())
  .then(html => {
    // We use a DOMParser to avoid issues with script execution
    const doc = new DOMParser().parseFromString(html, 'text/html');
    shadowRoot.append(...doc.head.childNodes);
    shadowRoot.append(...doc.body.childNodes);
  })
  .catch(err => {
    console.error('Study Buddy: Error loading React app.', err);
  });