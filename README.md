
# Barebones LLM

A fast, lightweight, and private desktop client for your favorite AI models.

**BarebonesLLM** is a minimalist AI chat interface designed for simplicity. Whether you want to plug in a cloud API key (OpenAI, Google) or chat completely offline with a local model (Ollama, LM Studio). 

BarebonesLLM provides a clean, native desktop experience with zero tracking and zero subscriptions.

## Getting started
- Download and open: [GitHub Releases](https://github.com/xxxmoney/barebones-llm/releases)

## Supported AI Providers
- Remote  
    - [OpenRouter](https://openrouter.ai/workspaces/default/keys)
    - [OpenAI](https://platform.openai.com/api-keys)
    - [Google](https://aistudio.google.com/api-keys?project=gen-lang-client-0820887008)
    - Other that support [OpenAI API](https://lightning.ai/docs/litserve/features/open-ai-spec)
- Local
    - [LM Studio](https://lmstudio.ai)
    - [TextGen](https://github.com/oobabooga/textgen)

## Setting up
<video src="https://github.com/user-attachments/assets/c54c7274-be3a-4fd5-a753-06743c286ab7" autoplay loop muted playsinline width="100%"></video>

## Usage
<video src="https://github.com/user-attachments/assets/238fd94d-1729-4bc6-9cae-573666fee494" autoplay loop muted playsinline width="100%"></video>

## Developing locally
- Runing with Docker
    - `docker compose up -d --build`
- Running locally
    - Check `/frontend` and `/backend` READMEs

## Roadmap
- [Trello](https://trello.com/b/wU1YRHXb)

## Tech stack
- Python (FastAPI, pywebview, pyinstaller), React (TypeScript, Axios, Zustand, Immer, DaisyUI, TailwindCSS)
