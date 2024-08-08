import type Image from './Image'
import type { ArticlePage } from './Page'

export interface BlockQuoteBlock {
  id: string
  type: 'block_quote'
  value: { blockQuote: string }
}

export interface CodeBlock {
  id: string
  type: 'code'
  value: { code: string }
}

export interface ContentCollectionBlock {
  id: string
  type: 'content_collection'
  value: { pages: ArticlePage[] }
}

export interface EmbedBlock {
  id: string
  type: 'embed'
  value: { embed: string }
}

export interface HeadingBlock {
  id: string
  type: 'heading'
  value: string
}

export interface ImageBlock {
  id: string
  type: 'image'
  value: { heading: string, image: Image }
}

export interface ParagraphBlock {
  id: string
  type: 'paragraph'
  value: string
}

export interface PullQuoteBlock {
  id: string
  type: 'pull_quote'
  value: { pullQuote: string, attribution: string }
}

// Factbox blocks
export interface TextBlock {
  id: string
  type: 'text'
  value: string
}

export interface CustomListBlock {
  id: string
  type: 'custom_list'
  value: { listItemLabel: string, listItemText: string }[]
}

export type FactboxBodyBlock = TextBlock | CustomListBlock

export interface FactboxBlock {
  id: string
  type: 'factbox'
  value: {
    heading: string
    image: { image: Image, caption: string }
    caption: string
    body: FactboxBodyBlock[]
  }
}

export type StreamfieldBlock = BlockQuoteBlock | CodeBlock | ContentCollectionBlock | EmbedBlock | HeadingBlock | ImageBlock | ParagraphBlock | PullQuoteBlock | FactboxBlock
