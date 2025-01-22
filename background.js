// Handle when user selects an option
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Encode the query for URL safety
  const encodedQuery = encodeURIComponent(text);
  
  // Create group title from query (first 15 chars + ellipsis if longer)
  const groupTitle = text.length > 15 ? `${text.substring(0, 15)}...` : text;
  
  // Get enabled LLMs from storage
  chrome.storage.sync.get(
    {
      enabledLLMs: {
        claude: true,
        chatgpt: true,
        gemini: true
      }
    },
    async (items) => {
      // Array to store created tab IDs
      const tabIds = [];
      
      if (items.enabledLLMs.claude) {
        // Claude's URL with the query
        const claudeUrl = `https://claude.ai/new?q=${encodedQuery}`;
        // Open Claude in a new tab
        const tab = await chrome.tabs.create({ url: claudeUrl });
        tabIds.push(tab.id);
      }
      
      if (items.enabledLLMs.chatgpt) {
        // ChatGPT's URL with the query
        const chatgptUrl = `https://chatgpt.com/?q=${encodedQuery}`;
        // Open ChatGPT in a new tab
        const tab = await chrome.tabs.create({ url: chatgptUrl });
        tabIds.push(tab.id);
      }

      if (items.enabledLLMs.gemini) {
        const geminiUrl = 'https://gemini.google.com/app';
        const tab = await chrome.tabs.create({ url: geminiUrl });
        tabIds.push(tab.id);

        // Create a flag to track if we've sent the message
        let messageSent = false;
        
        // Wait for the tab to load and then send the query
        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
          if (tabId === tab.id && changeInfo.status === 'complete' && !messageSent) {
            messageSent = true;
            chrome.tabs.sendMessage(tabId, {
              type: 'PASTE_QUERY',
              query: text
            });
          }
        });
      }

      console.log(tabIds);
      // Create a tab group if we opened any tabs
      if (tabIds.length > 0) {
        const group = await chrome.tabs.group({ tabIds });
        await chrome.tabGroups.update(group, { 
          title: groupTitle,
          color: 'blue'
        });
        // Focus the first tab
        await chrome.tabs.update(tabIds[0], { active: true });
      }
    }
  );
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getApiKey') {
    chrome.storage.sync.get(['apiKey'], (result) => {
      sendResponse({ apiKey: result.apiKey });
    });
    return true;
  }
}); 