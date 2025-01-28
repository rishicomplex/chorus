(async () => {
  const { waitForElement, dispatchInputEvents, pressEnter } = await import(chrome.runtime.getURL('content_scripts/utils.js'));

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PASTE_QUERY') {
      const query = message.query;

      // Function to find and fill the input
      const fillInput = async () => {
        // Wait for the textarea to appear
        const textarea = await waitForElement('div[contenteditable="true"]');
        textarea.focus();
        
        // Set the value and dispatch input event
        textarea.textContent = query;
        dispatchInputEvents(textarea);
      };

      (async () => {
        await fillInput();
        await clickSend();
      })();
    }
  });

  async function clickSend() {
    const sendButton = await waitForElement('button[aria-label="Send Message"]');
    sendButton.click();
  }

})(); 