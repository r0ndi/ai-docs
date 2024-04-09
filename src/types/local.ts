export type Settings = {
  llm: {
    host: string
    model: Model
    embeddingModel: Model
  }
  qdrant: {
    url: string
    vectorSize: number
    scoreThreshold: number
  }
}

export type ErrorHandler = {
  data?: { status: { error: string }}
  response?: { data: { msg: string }}
  message?: string
}

export type SourceFile = {
  source: string
  title: string
  content: string
}

export enum Model {
  LLAMA2 = 'llama2',
  LLAMA2_13B = 'llama2:13b',
  LLAMA2_70B = 'llama2:70b',
}

export type QdrantItem = {
  id: string
  payload: Record<string, string>
  vector: number[]
}

export type QdrantSearchResponse<T> = {
  payload: T
}

export type AssistentResponse = {
  sources: string[]
  message: string
}

export type Document = {
  content: string
  title: string
  source: string
}