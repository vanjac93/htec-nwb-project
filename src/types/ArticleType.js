
export type ArticleType = {
    author: string,
    cotent: string,
    description: string,
    publishedAt: string,
    source: {
        id: string | null,
        name: string
    },
    title: string,
    url: string,
    urlToImage: string,
    content: string
}