import { TextLoader } from 'langchain/document_loaders/fs/text'
import { parseContent, parseTitle } from '../helpers/utils'
import { QdrantItem, SourceFile } from '../types/local'
import { handleError } from '../helpers/error-handler'
import { v5 } from 'uuid'
import * as ollamaService from '../services/ollama'
import * as qdrantService from '../services/qdrant'
import * as path from 'path'
import * as R from 'ramda'
import * as fs from 'fs'

process.on('unhandledRejection', handleError)

const BATCH_SIZE = 10
const COLLECTION_NAME = 'documents'
const UUID_NAMESPACE = '00000000-0000-0000-0000-000000000000'

async function main(): Promise<void> {
  const sources = await getSources()
  await checkCollection()
  await insertItems(sources)

  console.log('Database build!')
}

async function insertItems(sources: SourceFile[]): Promise<void> {
  const client = qdrantService.createClient()
  
  let processed = 0
  for (const batch of R.splitEvery(BATCH_SIZE, sources)) {
    processed += batch.length
    const items = await prepareItems(batch)
    await qdrantService.upsertItems(client, COLLECTION_NAME, items)
    console.log(`Processing ${processed}/${sources.length}`)
  }
}

async function prepareItems(sources: SourceFile[]): Promise<QdrantItem[]> {
  const client = await ollamaService.createClient()
  const prepareItem = async ({ content, title, source }: SourceFile): Promise<QdrantItem> => ({
    vector: await ollamaService.getEmbedding(client, content),
    id: v5(title, UUID_NAMESPACE),
    payload: { title, source, content },
  })

  return Promise.all(sources.map(prepareItem))
}

async function checkCollection(): Promise<void> {
  const client = qdrantService.createClient()
  if (!await qdrantService.isCollectionExists(client, COLLECTION_NAME)) {
    return qdrantService.createCollection(client, COLLECTION_NAME)
  }
}

async function getSources(): Promise<SourceFile[]> {
  const sourceDir = path.join(__dirname, '../../sources')
  const files = fs.readdirSync(sourceDir).filter(file => file.match(/(\.md$)/))
  const sources = await Promise.all(files.map(file => parseSourceFile(sourceDir, file)))
  return sources.flat()
}

async function parseSourceFile(sourceDir: string, filename: string): Promise<SourceFile[]> {
  const loader = new TextLoader(`${sourceDir}/${filename}`)
  const [{ pageContent }] = await loader.load()
  const contents = parseContent(pageContent)
  return contents.map((content: string, index: number): SourceFile => ({
    content,
    source: filename,
    title: `${index}: ${parseTitle(content)}`,
  }))
}

main()