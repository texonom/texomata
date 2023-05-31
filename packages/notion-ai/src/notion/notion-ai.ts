import type { BaseLLM } from 'langchain/llms/base'
import type { BaseChain } from 'langchain/chains'
import type { VectorStore, VectorStoreRetriever } from 'langchain/vectorstores/base'

export abstract class NotionAI<
  LLM extends BaseLLM = BaseLLM,
  Chain extends BaseChain = BaseChain,
  Store extends VectorStore = VectorStore
> {
  llm: LLM
  chain: Chain
  vectorStore: Store
  retriever: VectorStoreRetriever<Store>
}
