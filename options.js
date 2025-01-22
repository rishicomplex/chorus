// Saves options to chrome.storage
function saveOptions() {
  const claude = document.getElementById('claude').checked;
  const chatgpt = document.getElementById('chatgpt').checked;
  
  chrome.storage.sync.set(
    {
      enabledLLMs: {
        claude: claude,
        chatgpt: chatgpt
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
        chatgpt: true
      }
    },
    (items) => {
      document.getElementById('claude').checked = items.enabledLLMs.claude;
      document.getElementById('chatgpt').checked = items.enabledLLMs.chatgpt;
    }
  );
}

// Add event listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('claude').addEventListener('change', saveOptions);
document.getElementById('chatgpt').addEventListener('change', saveOptions); 