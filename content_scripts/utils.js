// Helper function to wait for an element to appear
export function waitForElement(selector, textMatch = null, timeout = 5000) {
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

// Helper function to dispatch common events
export function dispatchInputEvents(element) {
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
} 