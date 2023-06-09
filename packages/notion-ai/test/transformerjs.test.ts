import { test } from 'vitest'

import { pipeline } from '@xenova/transformers'

import type { QuestionAnsweringPipeline } from '@xenova/transformers'

test(
  `Ask Question`,
  async () => {
    const pipe: QuestionAnsweringPipeline = await pipeline('text2text-generation', 'Xenova/gpt2', { quantized: false })
    const out = await pipe(
      'Tell me about Relative Mechanics',
      `
      General Relativity and Special Relativity are two main topics in Relative Mechanics.
      Einstein Field Equations is mathmetical model for General Relativity
    `
    )
    console.info(out)
  },
  1000 * 60 * 10
)
