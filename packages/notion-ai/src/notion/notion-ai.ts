import type { BaseLLM } from 'langchain/llms/base'
import type { BaseChain } from 'langchain/chains'
import type { VectorStore, VectorStoreRetriever } from 'langchain/vectorstores/base'

export abstract class NotionAI {
  llm: BaseLLM
  chain: BaseChain
  vectorStore: VectorStore
  retriever: VectorStoreRetriever
}
