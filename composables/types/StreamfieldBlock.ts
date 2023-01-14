import Image from "./Image";
import { ArticlePage } from "./Page";

export type BlockQuoteBlock = {
    id: string,
    type: 'block_quote';
    value: { blockQuote: string };
}

export type CodeBlock = {
    id: string,
    type: 'code';
    value: { code: string };
}

export type ContentCollectionBlock = {
    id: string;
    type: 'content_collection';
    value: { pages: ArticlePage[] };
}

export type EmbedBlock = {
    id: string;
    type: 'embed';
    value: { embed: string };
}

export type HeadingBlock = {
    id: string;
    type: 'heading';
    value: string;
}

export type ImageBlock = {
    id: string;
    type: 'image';
    value: { heading: string, image: Image };
}

export type ParagraphBlock = {
    id: string;
    type: 'paragraph';
    value: string;
}

export type PullQuoteBlock = {
    id: string;
    type: 'pull_quote';
    value: { pullQuote: string, attribution: string };
}

// Factbox blocks
export type TextBlock = {
    id: string;
    type: 'text';
    value: string;
}

export type CustomListBlock = {
    id: string;
    type: 'custom_list';
    value: { listItemLabel: string, listItemText: string }[];
}

export type FactboxBodyBlock = TextBlock | CustomListBlock

export type FactboxBlock = {
    id: string;
    type: 'factbox';
    value: {
        heading: string,
        image: { image: Image, caption: string },
        caption: string, body: FactboxBodyBlock[]
    };
}

export type StreamfieldBlock = BlockQuoteBlock | CodeBlock | ContentCollectionBlock | EmbedBlock | HeadingBlock | ImageBlock | ParagraphBlock | PullQuoteBlock | FactboxBlock
