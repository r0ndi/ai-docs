import { Model, Settings } from './types/local'
import dotenv from 'dotenv'
import path from 'path'

const configPath = path.join(__dirname, '../.env')
dotenv.config({ path: configPath })

export const settings: Settings = {
  llm: {
    host: process.env.OLLAMA_HOST || '',
    embeddingModel: Model.LLAMA2_13B,
    model: Model.LLAMA2_13B,
  },
  qdrant: {
    url: process.env.QDRANT_URL || '',
    scoreThreshold: 0.4,
    vectorSize: 5120,
  }
}
