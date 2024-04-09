import { QdrantClient } from '@qdrant/js-client-rest'
import { QdrantItem, QdrantSearchResponse } from '../types/local'
import { settings } from '../settings'

export function createClient(): QdrantClient {
  return new QdrantClient({ url: settings.qdrant.url })
}

export async function deleteCollection(client: QdrantClient, collectionName: string): Promise<boolean> {
  return client.deleteCollection(collectionName)
}

export async function createCollection(
  client: QdrantClient, collectionName: string, onDisk: boolean = false,
): Promise<void> {
  await client.createCollection(collectionName, {
    vectors: { size: settings.qdrant.vectorSize, distance: 'Cosine', on_disk: onDisk },
  })
}

export async function isCollectionExists(client: QdrantClient, collectionName: string): Promise<boolean> {
  const { collections } = await client.getCollections()
  return collections.findIndex(({ name }) => name === collectionName) >= 0
}

export async function isEmptyCollection(client: QdrantClient, collectionName: string): Promise<boolean> {
  const { points_count } = await client.getCollection(collectionName)
  return !points_count
}

export async function upsertItems(client: QdrantClient, collectionName: string, items: QdrantItem[]): Promise<void> {
  await client.upsert(collectionName, {
    wait: true,
    batch: {
      ids: items.map(({ id }) => id),
      vectors: items.map(({ vector }) => vector),
      payloads: items.map(({ payload }) => payload),
    },
  })
}

export async function searchItem<T>(
  client: QdrantClient, collectionName: string, queryEmbedding: number[],
): Promise<QdrantSearchResponse<T>> {
  const search = await client.search(collectionName, {
    vector: queryEmbedding,
    limit: 1,
  })
  return search[0] as QdrantSearchResponse<T>
}

export async function searchItems<T>(
  client: QdrantClient, collectionName: string, queryEmbedding: number[], limit: number = 1,
): Promise<QdrantSearchResponse<T>[]> {
  const search = await client.search(collectionName, {
    score_threshold: settings.qdrant.scoreThreshold,
    vector: queryEmbedding,
    limit,
  })
  return search as QdrantSearchResponse<T>[]
}
