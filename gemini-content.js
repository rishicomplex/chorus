// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PASTE_QUERY') {
    const query = message.query;
    
    // Function to find and fill the input
    const fillInput = async () => {
      // Wait for the textarea to appear
      const textarea = await waitForElement('div.ql-editor[contenteditable="true"][role="textbox"][aria-label="Enter a prompt here"]');
      
      // Set the value and dispatch input event
      textarea.textContent = query;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Simulate Enter key press with all necessary events
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true,
        composed: true
      });
      
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      textarea.dispatchEvent(enterEvent);
    };

    fillInput();
  }
});

// Helper function to wait for an element to appear
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      observer.disconnect();
      reject(new Error('Timeout waiting for element'));
    }, timeout);
  });
} 