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

        selectModel(modelName).then(() => fillInput());
    }
});

async function selectModel(modelName) {
    // Click main dropdown button
    const dropdownButton = await waitForElement('button[data-test-id="bard-mode-menu-button"]');
    dropdownButton.click();

    // Click specific model button - waits for menu items to appear after dropdown opens
    const modelButton = await waitForElement('span.gds-label-l', modelName);
    modelButton.closest('button[mat-menu-item]').click();
}

// Helper function to wait for an element to appear
function waitForElement(selector, textMatch = null, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const checkElement = () => {
            let elements = document.querySelectorAll(selector);
            if (textMatch) {
                elements = Array.from(elements).filter(el => 
                    el.textContent.trim() === textMatch
                );
            }
            return elements[0];
        };

        const element = checkElement();
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations) => {
            const element = checkElement();
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        // Timeout after specified time
        setTimeout(() => {
            observer.disconnect();
            reject(new Error('Timeout waiting for element'));
        }, timeout);
    });
} 