// Handle when user selects an option
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Encode the query for URL safety
  const encodedQuery = encodeURIComponent(text);
  
  // Get enabled LLMs from storage
  chrome.storage.sync.get(
    {
      enabledLLMs: {
        claude: true,
        chatgpt: true
      }
    },
    (items) => {
      if (items.enabledLLMs.claude) {
        // Claude's URL with the query
        const claudeUrl = `https://claude.ai/new?q=${encodedQuery}`;
        // Open Claude in a new tab
        chrome.tabs.create({ url: claudeUrl });
      }
      
      if (items.enabledLLMs.chatgpt) {
        // ChatGPT's URL with the query
        const chatgptUrl = `https://chatgpt.com/?q=${encodedQuery}`;
        // Open ChatGPT in a new tab
        chrome.tabs.create({ url: chatgptUrl });
      }
    }
  );
}); 