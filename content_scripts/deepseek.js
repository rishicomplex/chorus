(async () => {
  const { waitForElement, dispatchInputEvents } = await import(chrome.runtime.getURL('content_scripts/utils.js'));

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'PASTE_QUERY') {
        const query = message.query;
    
        // Function to find and fill the input
        const fillInput = async () => {
          // Wait for the textarea to appear
          const textarea = await waitForElement('textarea#chat-input');
          
          // Set the value and dispatch input event
          textarea.textContent = query;
          dispatchInputEvents(textarea);

          // Simulate Enter key press
          const enterEvent = new KeyboardEvent('keydown', {
              key: 'Enter',
              code: 'Enter',
              keyCode: 13,
              which: 13,
              bubbles: true,
              cancelable: true,
              composed: true
          });
          textarea.dispatchEvent(enterEvent);
        };
    
        fillInput();
      }
  });
})();
  