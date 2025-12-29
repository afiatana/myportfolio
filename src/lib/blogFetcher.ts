
import Parser from 'rss-parser';
import { getPortfolioData } from './portfolioData';

// KONFIGURASI: Ganti dengan URL dan ID Author Anda
const EXTERNAL_CONFIG = {
    wordpress: {
        enabled: true,
        endpoint: 'https://mahidara.co/wp-json/wp/v2/posts', // Ganti dengan URL WP API Anda
        // Jika self-hosted: 'https://yourdomain.com/wp-json/wp/v2/posts'
        authorId: 3, // Ganti dengan ID number, misal: 101. Set null jika ingin semua author.
    },
    blogspot: {
        enabled: true,
        rssUrl: 'https://infotekno.net/feed/' // WordPress Feed kedua
    }
};

export type BlogPost = {
    id: string | number;
    title: string;
    slug: string;
    date: string;
    content: string; // HTML content
    excerpt: string;
    imageUrl: string;
    tags: string[];
    source: 'local' | 'wordpress' | 'blogspot';
    link: string; // External link for WP/Blogspot
};

const parser = new Parser();

// Helper untuk membersihkan tag HTML untuk excerpt
function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, '');
}

async function fetchWordPressPosts(): Promise<BlogPost[]> {
    if (!EXTERNAL_CONFIG.wordpress.enabled || EXTERNAL_CONFIG.wordpress.endpoint.includes('YOUR_SITE')) return [];

    try {
        let url = `${EXTERNAL_CONFIG.wordpress.endpoint}?_embed&per_page=10`;
        if (EXTERNAL_CONFIG.wordpress.authorId) {
            url += `&author=${EXTERNAL_CONFIG.wordpress.authorId}`;
        }

        console.log('Fetching WP Posts from:', url);
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://myportfolio.com)'
            },
            next: { revalidate: 0 }
        }); // Disable cache for debugging
        if (!res.ok) throw new Error('Failed to fetch WP');

        const posts = await res.json();

        return posts.map((p: any) => ({
            id: `wp-${p.id}`,
            title: p.title.rendered,
            slug: p.slug,
            date: p.date.split('T')[0],
            content: p.content.rendered,
            excerpt: stripHtml(p.excerpt.rendered).substring(0, 150) + '...',
            imageUrl: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            tags: ['WordPress'],
            source: 'wordpress',
            link: p.link
        }));
    } catch (e) {
        console.error('WP Fetch Error:', e);
        return [];
    }
}

async function fetchBlogspotPosts(): Promise<BlogPost[]> {
    if (!EXTERNAL_CONFIG.blogspot.enabled || EXTERNAL_CONFIG.blogspot.rssUrl.includes('YOUR_BLOG_NAME')) return [];

    try {
        const feed = await parser.parseURL(EXTERNAL_CONFIG.blogspot.rssUrl);

        return feed.items.map((item: any, idx: number) => {
            // Extract image from content if possible
            const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
            const imageUrl = imgMatch ? imgMatch[1] : '';

            return {
                id: `bs-${idx}`,
                title: item.title || 'Untitled',
                slug: item.link ? item.link.split('/').pop()?.replace('.html', '') || `bs-${idx}` : `bs-${idx}`,
                date: item.isoDate ? item.isoDate.split('T')[0] : new Date().toISOString().split('T')[0],
                content: item.content || item.summary || '',
                excerpt: item.contentSnippet?.substring(0, 150) + '...' || '',
                imageUrl: imageUrl,
                tags: ['Blogspot'],
                source: 'blogspot',
                link: item.link
            };
        });
    } catch (e) {
        console.error('Blogspot Fetch Error:', e);
        return [];
    }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const localData = await getPortfolioData();
    const localPosts = (localData.blog || []).map((p: any) => ({
        ...p,
        source: 'local',
        link: `/blog/${p.slug}`
    }));

    // Promise.allSettled agar jika satu gagal, yang lain tetap muncul
    const [wpPosts, bsPosts] = await Promise.allSettled([
        fetchWordPressPosts(),
        fetchBlogspotPosts()
    ]);

    const externalPosts = [
        ...(wpPosts.status === 'fulfilled' ? wpPosts.value : []),
        ...(bsPosts.status === 'fulfilled' ? bsPosts.value : [])
    ];

    const allPosts = [...localPosts, ...externalPosts];

    // Sort by date descending
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
