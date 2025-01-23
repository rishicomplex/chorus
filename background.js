import MODELS from './models.js';

// Handle when user selects an option
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Encode the query for URL safety
  const encodedQuery = encodeURIComponent(text);
  
  // Create group title from query (first 15 chars + ellipsis if longer)
  const groupTitle = text.length > 15 ? `${text.substring(0, 15)}...` : text;
  
  // Get enabled LLMs from storage
  chrome.storage.sync.get(
    {
      enabledLLMs: Object.fromEntries(
        Object.keys(MODELS).map(id => [id, true])
      )
    },
    async (items) => {
      // Array to store created tab IDs
      const tabIds = [];
      
      for (const [modelId, isEnabled] of Object.entries(items.enabledLLMs)) {
        if (!isEnabled) continue;
        
        const model = MODELS[modelId];
        let url = model.baseUrl;
        
        if (model.queryHandler.type === 'url') {
          url += `?${model.queryHandler.queryParam}=${encodedQuery}`;
        }
        
        const tab = await chrome.tabs.create({ url });
        tabIds.push(tab.id);
        
        if (model.queryHandler.type === 'content_script') {
          let messageSent = false;
          chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (tabId === tab.id && changeInfo.status === 'complete' && !messageSent) {
              messageSent = true;
              chrome.tabs.sendMessage(tabId, {
                type: model.queryHandler.messageType,
                query: text
              });
            }
          });
        }
      }

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