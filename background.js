import MODELS from './models.js';

// Helper function to send message with retries
async function sendMessageWithRetry(tabId, message, maxAttempts = 5, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await new Promise(resolve => setTimeout(resolve, delay));
      await chrome.tabs.sendMessage(tabId, message);
      return; // Success
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error; // Rethrow if we're out of attempts
      }
      // Otherwise continue to next attempt
    }
  }
}

// Handle when user selects an option
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Encode the query for URL safety
  const query = encodeURIComponent(text);
  // Create group title from query (first 15 chars + ellipsis if longer)
  const groupTitle = text.length > 15 ? `${text.substring(0, 15)}...` : text;
  
  // Get enabled LLMs from storage with defaults from MODELS
  const defaultEnabledLLMs = Object.fromEntries(
    Object.keys(MODELS).map(id => [id, MODELS[id].defaultEnabled])
  );

  // Get enabled models from storage
  chrome.storage.sync.get({ enabledLLMs: defaultEnabledLLMs }, async (result) => {
    try {
      // Create all tabs first
      const tabs = await Promise.all(
        Object.entries(result.enabledLLMs)
          .filter(([_, isEnabled]) => isEnabled)
          .map(async ([modelId, _]) => {
            const model = MODELS[modelId];
            let url = model.baseUrl;

            if (model.queryHandler.type === 'url') {
              url += `?${model.queryHandler.queryParam}=${query}`;
              if (model.queryHandler.modelName) {
                url += `&model=${model.queryHandler.modelName}`;
              }
            }

            const tab = await chrome.tabs.create({ url });
            return { tab, modelId };
          })
      );

      if (tabs.length > 0) {
        // Group the tabs
        const tabIds = tabs.map(t => t.tab.id);
        const groupId = await chrome.tabs.group({ tabIds });
        await chrome.tabGroups.update(groupId, { title: groupTitle, color: 'blue' });
        await chrome.tabs.update(tabIds[0], { active: true });

        // Send messages to content scripts after tabs are created and grouped
        for (const { tab, modelId } of tabs) {
          const model = MODELS[modelId];
          if (model.queryHandler.type === 'content_script') {
            try {
              await sendMessageWithRetry(tab.id, {
                type: model.queryHandler.messageType,
                query: text,
                modelName: model.queryHandler.modelName
              });
            } catch (error) {
              console.error(`Error sending message to ${modelId} after retries:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error creating tabs:', error);
    }
  });
}); 