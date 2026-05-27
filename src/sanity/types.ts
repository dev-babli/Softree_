export type SanityBlogPost = {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    publishedAt: string;
    categories?: { title: string; slug: { current: string } }[];
    mainImage?: { asset: { url: string }; alt?: string };
};

export type SanityNavCategory = {
    _id: string;
    title: string;
    slug: { current: string };
    posts: {
        _id: string;
        title: string;
        slug: { current: string };
        excerpt?: string;
    }[];
};
