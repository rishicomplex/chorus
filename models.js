const MODELS = {
  claude: {
    id: 'claude',
    name: 'Claude',
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
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    baseUrl: 'https://gemini.google.com/app',
    queryHandler: {
      type: 'content_script',
      messageType: 'PASTE_QUERY'
    }
  }
};

export default MODELS; 