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
              const textarea = await waitForElement('div.ql-editor[contenteditable="true"][role="textbox"][aria-label="Enter a prompt here"]');

              // Set the value and dispatch input event
              textarea.textContent = query;
              dispatchInputEvents(textarea);

              // Simulate Enter key press
              pressEnter(textarea);
          };

          selectModel(modelName).then(() => fillInput());
      }
  });

  async function selectModel(modelName) {
      // Click main dropdown button
      const dropdownButton = await waitForElement('button[data-test-id="bard-mode-menu-button"]');
      dropdownButton.click();

      // Click specific model button
      const modelButton = await waitForElement('span.gds-label-l', modelName);
      modelButton.closest('button[mat-menu-item]').click();
  }
})(); 