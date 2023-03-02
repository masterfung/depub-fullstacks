export type CardType = {
    id: string | number;
    author: string;
    title: string;
    description: string;
    version: string | number;
}

export type CardsType = CardType[];

export type FileType = {
    name: string;
    size: string;
    format: string;
    versions: string[];
    publishedDate: string;
}

export type PostType = {
    id: string | number;
    title: string;
    description: string;
    tags: string[],
    author: string,
}