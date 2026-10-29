
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
<video src="https://github-production-user-asset-6210df.s3.amazonaws.com/61245332/682827782-4938460d-fd09-4904-9289-77df8fb13de1.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20261029%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261029T140755Z&X-Amz-Expires=300&X-Amz-Signature=4677c70ceee7ef28918c3686f64a9b69db9b7841a734bcf4be9ee8adac868650&X-Amz-SignedHeaders=host&response-content-type=video%2Fmp4" autoplay loop muted playsinline width="100%"></video>

## Usage
<video src="https://github-production-user-asset-6210df.s3.amazonaws.com/61245332/682827930-5000e5da-b4cd-47d9-87e5-cbeab5436c4b.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20261029%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20261029T140613Z&X-Amz-Expires=300&X-Amz-Signature=a8913734e20139afc02c7dc2291af1d5111e8732424ba9608295c6ed35673d5f&X-Amz-SignedHeaders=host&response-content-type=video%2Fmp4" autoplay loop muted playsinline width="100%"></video>

## Developing locally
- Runing with Docker
    - `docker compose up -d --build`
- Running locally
    - Check `/frontend` and `/backend` READMEs

## Roadmap
- [Trello](https://trello.com/b/wU1YRHXb)

## Tech stack
- Python (FastAPI, pywebview, pyinstaller), React (TypeScript, Axios, Zustand, Immer, DaisyUI, TailwindCSS)


