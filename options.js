import MODELS from './models.js';

// Saves options to chrome.storage
function saveOptions() {
  const enabledLLMs = {};
  
  Object.keys(MODELS).forEach(modelId => {
    enabledLLMs[modelId] = document.getElementById(modelId).checked;
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
    Object.keys(MODELS).map(id => [id, true])
  );

  chrome.storage.sync.get(
    { enabledLLMs: defaultEnabledLLMs },
    (items) => {
      Object.keys(MODELS).forEach(modelId => {
        document.getElementById(modelId).checked = items.enabledLLMs[modelId];
      });
    }
  );
}

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
    document.getElementById(model.id).addEventListener('change', saveOptions);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createModelOptions();
  restoreOptions();
}); 