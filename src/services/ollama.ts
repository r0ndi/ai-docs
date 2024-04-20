import { Ollama } from 'ollama'
import { settings } from '../settings'

export async function createClient(): Promise<Ollama> {
  return new Ollama({ host: settings.llm.host })
}

export async function chat(ollama: Ollama, systemMessage: string, userMessage: string): Promise<string> {
  const { message } = await ollama.chat({
    model: settings.llm.model,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],
  })
  return message.content
}

export async function getEmbedding(ollama: Ollama, prompt: string): Promise<number[]> {
  const { embedding } = await ollama.embeddings({ model: settings.llm.embeddingModel, prompt })
  return embedding
}
