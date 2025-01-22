// Handle input changes in the omnibox
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // You could add suggestions here if desired
});

// Handle when user selects an option
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Encode the query for URL safety
  const encodedQuery = encodeURIComponent(text);
  
  // Claude's URL with the query
  const claudeUrl = `https://claude.ai/new?q=${encodedQuery}`;
  
  // Open Claude in a new tab
  chrome.tabs.create({ url: claudeUrl });
}); 