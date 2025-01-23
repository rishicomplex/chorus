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
  }
};

export default MODELS; 