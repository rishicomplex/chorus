const MODELS = {
  'claude-35-sonnet': {
    id: 'claude-35-sonnet',
    name: 'Claude 3.5 Sonnet',
    baseUrl: 'https://claude.ai/new',
    defaultEnabled: true,
    queryHandler: {
      type: 'url',
      queryParam: 'q'
    }
  },
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'ChatGPT 4o',
    baseUrl: 'https://chatgpt.com',
    defaultEnabled: true,
    queryHandler: {
      type: 'url',
      queryParam: 'q',
      modelName: 'gpt-4o'
    }
  },
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    name: 'ChatGPT 4o Mini',
    baseUrl: 'https://chatgpt.com',
    defaultEnabled: false,
    queryHandler: {
      type: 'url',
      queryParam: 'q',
      modelName: 'gpt-4o-mini'
    }
  },
  'o1': {
    id: 'o1',
    name: 'ChatGPT o1',
    baseUrl: 'https://chatgpt.com',
    defaultEnabled: false,
    queryHandler: {
      type: 'url',
      queryParam: 'q',
      modelName: 'o1'
    }
  },
  'o1-mini': {
    id: 'o1-mini',
    name: 'ChatGPT o1 Mini',
    baseUrl: 'https://chatgpt.com',
    defaultEnabled: false,
    queryHandler: {
      type: 'url',
      queryParam: 'q',
      modelName: 'o1-mini'
    }
  },
  'gemini-pro-15': {
    id: 'gemini-pro-15',
    name: 'Gemini 1.5 Pro',
    baseUrl: 'https://gemini.google.com/app',
    defaultEnabled: false,
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY',
      modelName: '1.5 Pro'
    }
  },
  'gemini-flash-15': {
    id: 'gemini-flash-15',
    name: 'Gemini 1.5 Flash',
    baseUrl: 'https://gemini.google.com/app',
    defaultEnabled: false,
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY',
      modelName: '1.5 Flash'
    }
  },
  'gemini-flash-20': {
    id: 'gemini-flash-20',
    name: 'Gemini 2.0 Flash',
    baseUrl: 'https://gemini.google.com/app',
    defaultEnabled: true,
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY',
      modelName: '2.0 Flash Experimental'
    }
  },
  'deepseek-v3': {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    baseUrl: 'https://chat.deepseek.com/',
    defaultEnabled: false,
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY',
      modelName: 'V3'
    }
  },
  'deepseek-r1': {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    baseUrl: 'https://chat.deepseek.com/',
    defaultEnabled: false,
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY',
      modelName: 'R1'
    }
  }
};

export default MODELS; 