
# Barebones LLM

BarebonesLLM is an AI client with a goal to simply and easily allow chatting with chosen AI model.
Running locally, you can choose remote AI providers or even your local one.

## Getting started
- Download and open: [GitHub Releases](https://github.com/xxxmoney/barebones-llm/releases)

## Note: UX rework
- New videos to address the current UX rework are work in progress

## Videos to get you started easily
<video src="https://github.com/user-attachments/assets/903a7dc0-fe63-42a8-a3c8-b431b47b62bc" autoplay loop muted playsinline width="100%"></video>

## Supported AI Providers
- Remote  
    - [OpenRouter](https://openrouter.ai/workspaces/default/keys)
        - `https://openrouter.ai/api/v1/`
    - [OpenAI](https://platform.openai.com/api-keys)
        - `https://api.openai.com/v1/`
    - [Google](https://aistudio.google.com/api-keys?project=gen-lang-client-0820887008)
        - `https://generativelanguage.googleapis.com/v1beta/openai/`
    - Other that support [OpenAI API](https://lightning.ai/docs/litserve/features/open-ai-spec)
- Local
    - [LM Studio](https://lmstudio.ai)
    - [TextGen](https://github.com/oobabooga/textgen)

## Usage
<video src="https://github.com/user-attachments/assets/c9d6715c-582f-411f-8fda-a83eba17377b" autoplay loop muted playsinline width="100%"></video>
<video src="https://github.com/user-attachments/assets/4e077c8d-c7ef-4552-9b38-4aa82be4fa90" autoplay loop muted playsinline width="100%"></video>
<video src="https://github.com/user-attachments/assets/9d30afc2-08f8-4980-8fd7-0c1d4253f03b" autoplay loop muted playsinline width="100%"></video>

## Developing locally
- Runing with Docker
    - `docker compose up -d --build`
- Running locally
    - Check `/frontend` and `/backend` READMEs

## Roadmap
- [Trello](https://trello.com/b/wU1YRHXb)

## Tech stack
- Python (FastAPI, pywebview, pyinstaller), React (TypeScript, Axios, Zustand, Immer, DaisyUI, TailwindCSS)
