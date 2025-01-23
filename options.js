import MODELS from './models.js';

// Generate model checkboxes dynamically
function createModelOptions() {
  const container = document.getElementById('model-options');
  
  Object.values(MODELS).forEach(model => {
    const div = document.createElement('div');
    div.className = 'llm-option';
    
    div.innerHTML = `
      <label>
        <input type="checkbox" id="${model.id}" name="${model.id}">
        ${model.name}
      </label>
    `;
    
    container.appendChild(div);
  });
}

// Saves options to chrome.storage
function saveOptions() {
  console.log('saveOptions called');
  const enabledLLMs = {};
  
  Object.keys(MODELS).forEach(modelId => {
    const checkbox = document.getElementById(modelId);
    if (checkbox) {  // Add null check
      enabledLLMs[modelId] = checkbox.checked;
    }
  });
  
  chrome.storage.sync.set(
    { enabledLLMs },
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
  const defaultEnabledLLMs = Object.fromEntries(
    Object.keys(MODELS).map(id => [id, MODELS[id].defaultEnabled])
  );

  chrome.storage.sync.get(
    { enabledLLMs: defaultEnabledLLMs },
    (items) => {
      Object.keys(MODELS).forEach(modelId => {
        const checkbox = document.getElementById(modelId);
        if (checkbox) {
          checkbox.checked = items.enabledLLMs[modelId];
        }
      });
    }
  );
}

// Initialize everything once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // First create the checkboxes
  createModelOptions();
  
  // Then restore their states
  restoreOptions();
  
  // Finally add change listeners to each checkbox
  Object.keys(MODELS).forEach(modelId => {
    const checkbox = document.getElementById(modelId);
    if (checkbox) {  // Add null check
      checkbox.addEventListener('change', saveOptions);
    }
  });
}); 