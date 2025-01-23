const MODELS = {
  'claude-35-sonnet': {
    id: 'claude-35-sonnet',
    name: 'Claude 3.5 Sonnet',
    baseUrl: 'https://claude.ai/new',
    queryHandler: {
      type: 'url',
      queryParam: 'q'
    }
  },
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    baseUrl: 'https://chatgpt.com',
    queryHandler: {
      type: 'url',
      queryParam: 'q'
    }
  },
  'gemini-flash-15': {
    id: 'gemini-flash-15',
    name: 'Gemini 1.5 Flash',
    baseUrl: 'https://gemini.google.com/app',
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
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY',
      modelName: '2.0 Flash Experimental'
    }
  }
};

export default MODELS; 