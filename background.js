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
        chatgpt: true
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

      console.log(tabIds);
      // Create a tab group if we opened any tabs
      if (tabIds.length > 0) {
        const group = await chrome.tabs.group({ tabIds });
        await chrome.tabGroups.update(group, { 
          title: groupTitle,
          color: 'blue'
        });
      }
    }
  );
}); 