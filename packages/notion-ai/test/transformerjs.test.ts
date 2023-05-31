import { test } from 'vitest'

import { pipeline } from '@xenova/transformers'

import type { QuestionAnsweringPipeline } from '@xenova/transformers'

test(
  `Ask Question`,
  async () => {
    const pipe: QuestionAnsweringPipeline = await pipeline('text2text-generation', 'Xenova/distilbart-cnn-6-6')
    const out = await pipe('Tell me about Relativity Mechanics')
    console.info(out)
  },
  1000 * 60
)
