(async () => {
  const { waitForElement, dispatchInputEvents, pressEnter } = await import(chrome.runtime.getURL('content_scripts/utils.js'));

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'PASTE_QUERY') {
        const query = message.query;
        const modelName = message.modelName;
    
        // Function to find and fill the input
        const fillInput = async () => {
          // Wait for the textarea to appear
          const textarea = await waitForElement('textarea#chat-input');
          
          // Set the value and dispatch input event
          textarea.textContent = query;
          dispatchInputEvents(textarea);

          pressEnter(textarea);
        };

        // Execute async operations in sequence
        (async () => {
          if (modelName === 'R1') {
            await clickR1Button();
          }
          await fillInput();
        })();
      }
  });

  async function clickR1Button() {
    const r1Span = await waitForElement('span', 'DeepThink (R1)');
    r1Span.closest('[role="button"]').click();
  }
})();
  