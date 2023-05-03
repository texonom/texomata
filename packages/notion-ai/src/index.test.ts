import { test } from 'vitest'
import dotenv from 'dotenv'

import { NotionQA } from './'

dotenv.config()

test(`Ask Question`, async () => {
  const notionqa = new NotionQA()
  await notionqa.ingest('ef6f408bd429422eb864ce4d506a965a')
  const answer = await notionqa.ask('What is the meaning of life?')
  console.info(answer)
})
