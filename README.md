# Chorus
Compare LLMs in their native browser UI.

## Overview

Chorus lets you start conversations with the top LLM chatbots directly from your browser's omnibox. Type a message once, and watch as ChatGPT, Claude, and Gemini each open in their own tabs.

This can be useful if you're looking to ensemble the responses of various LLMs, eg on a query like "give me gift ideas...", or if you're looking to compare the responses of top LLMs. Since it uses the native browser UI for each chatbot (rather than making API calls), you can use all the custom UI affordances these chatbots offer like code extensions and conversation links. This also lets you use your existing subscriptions rather than being charged for API access.

## Demo
![demo](assets/output.gif)

## Installation

### Chrome web store
TODO: Add Chrome extension link.

### Local installation

1. Clone the repository.
2. Follow the instructions [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) to load a local Chrome extension.

## Usage

To invoke Chorus, type <kbd>ch</kbd> <kbd>Space</kbd> followed by your query in the omnibox and press enter. A new tab group will be created with your message sent to each chatbot you've enabled.

## Options

Click on the extension icon to access the options page. Here, you can select which models you want to use.
