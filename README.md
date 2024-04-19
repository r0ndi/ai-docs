# AI Docs
Chatbot for company documentation based on local LLM model and vector db

## Requirements
1. Local model like Llama2 -  https://ollama.com/
1. Local vector db like qdrant - https://qdrant.tech/documentation/quick-start/
1. Common sense

## Configuration and usage
1. Install the dependencies
    ```shell
    npm ci
    ```

1. Copy and configure environment variables
    ```shell
    cp .env.example .env
    ```

1. Build application
    ```shell
    npm run build
    ```

1. Build vector db
    ```shell
    copy .md files to ./sources
    npm run scripts:build-database
    ```

1. Start application
    ```shell
    npm run start -- your query
    ```

## Scripts and others
- `npm run start:dev -- your query` - start application from ts
- `npm run scripts:build-database` - scrap and build .md files from sources

## Author
Konrad Sądel @ 2024
