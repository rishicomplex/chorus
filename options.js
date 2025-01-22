// Saves options to chrome.storage
function saveOptions() {
  const claude = document.getElementById('claude').checked;
  const chatgpt = document.getElementById('chatgpt').checked;
  const gemini = document.getElementById('gemini').checked;
  
  chrome.storage.sync.set(
    {
      enabledLLMs: {
        claude: claude,
        chatgpt: chatgpt,
        gemini: gemini
      }
    },
    () => {
      // Show save status
      const saveStatus = document.getElementById('saveStatus');
      saveStatus.style.display = 'block';
      setTimeout(() => {
        saveStatus.style.display = 'none';
      }, 1500);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get(
    {
      enabledLLMs: {
        claude: true,
        chatgpt: true,
        gemini: true
      }
    },
    (items) => {
      document.getElementById('claude').checked = items.enabledLLMs.claude;
      document.getElementById('chatgpt').checked = items.enabledLLMs.chatgpt;
      document.getElementById('gemini').checked = items.enabledLLMs.gemini;
    }
  );
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiKey'], (result) => {
    document.getElementById('apiKey').value = result.apiKey || '';
  });

  document.getElementById('save').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({ apiKey }, () => {
      document.getElementById('status').textContent = 'Settings saved';
      setTimeout(() => {
        document.getElementById('status').textContent = '';
      }, 2000);
    });
  });
});

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('claude').addEventListener('change', saveOptions);
document.getElementById('chatgpt').addEventListener('change', saveOptions);
document.getElementById('gemini').addEventListener('change', saveOptions); 