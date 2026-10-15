import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.string(),
    discipline: z.string(),
    role: z.string(),
    summary: z.string(),
    image: z.string(),
    accent: z.string(),
    order: z.number(),
    tags: z.array(z.string()),
    stats: z.array(z.object({ label: z.string(), value: z.string() })),
    liveUrl: z.string().optional(),
    content: z.string(),
  }),
})

export default defineConfig({
  collections: [projects],
})
