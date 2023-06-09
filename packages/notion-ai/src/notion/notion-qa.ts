import { OpenAI } from 'langchain/llms/openai'
import { RetrievalQAChain } from 'langchain/chains'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { NotionAPI } from '@texonom/nclient'
import { Document } from 'langchain/document'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

import { NotionAI } from './notion-ai'

export class NotionQA extends NotionAI<OpenAI, RetrievalQAChain, HNSWLib> {
  declare vectorStore: HNSWLib

  constructor({ temperature, openAIApiKey }: { temperature?: number; openAIApiKey?: string } = {}) {
    super()
    if (temperature === undefined) temperature = 0
    this.llm = new OpenAI({ temperature, openAIApiKey })
  }

  async load(path: string) {
    this.vectorStore = await HNSWLib.load(path, new OpenAIEmbeddings())
    this.retriever = this.vectorStore.asRetriever(1)
    this.chain = RetrievalQAChain.fromLLM(this.llm, this.retriever)
  }

  async ingest(id: string, path: string = 'store') {
    const notionClient = new NotionAPI()
    const page = notionClient.getPage(id)
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 10, chunkOverlap: 1 })
    const splitted = await splitter.splitDocuments([new Document({ pageContent: JSON.stringify(page) })])
    this.vectorStore = await HNSWLib.fromTexts(
      splitted.map(doc => doc.pageContent),
      splitted.map(doc => doc.metadata),
      new OpenAIEmbeddings()
    )
    this.retriever = this.vectorStore.asRetriever(1)
    this.chain = RetrievalQAChain.fromLLM(this.llm, this.retriever)
    this.vectorStore.save(path)
    return id
  }

  async ask(question: string) {
    if (!this.chain) throw new Error('NotionQA not loaded')
    return this.chain.call({ query: question })
  }
}
