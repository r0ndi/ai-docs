export type Settings = {
  llm: {
    host: string
    model: string
  }
  qdrant: {
    url: string
    vectorSize: number
    scoreThreshold: number
    onDisk: boolean
  }
}

export type ErrorHandler = {
  data?: { status: { error: string }}
  response?: { data: { msg: string }}
  message?: string
}

export type SourceFile = {
  id: string
  parentId: string
  source: string
  title: string
  content: string
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