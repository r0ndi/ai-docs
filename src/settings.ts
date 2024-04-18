import { Settings } from './types/local'
import dotenv from 'dotenv'
import path from 'path'

const configPath = path.join(__dirname, '../.env')
dotenv.config({ path: configPath })

export const settings: Settings = {
  llm: {
    host: process.env.OLLAMA_HOST || '',
    model: process.env.LLM_MODEL || '',
  },
  qdrant: {
    url: process.env.QDRANT_URL || '',
    scoreThreshold: parseFloat(process.env.QDRANT_SCORE_THRESHOLD || ''),
    vectorSize: parseInt(process.env.QDRANT_VECTOR_DIM || ''),
    onDisk: process.env.QDRANT_ON_DISK === 'true',
  }
}
