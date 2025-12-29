import { getPortfolioData } from './portfolioData';

// KONFIGURASI: Ganti dengan URL dan ID Author Anda
const EXTERNAL_CONFIG = {
    wordpress: {
        enabled: true,
        endpoint: 'https://mahidara.co/wp-json/wp/v2/posts',
        authorId: 3 as number | null, // Set null jika ingin semua author
        siteName: 'Mahidara.co'
    },
    wordpress2: {
        enabled: true,
        endpoint: 'https://infotekno.net/wp-json/wp/v2/posts',
        authorId: null as number | null, // Ambil semua author
        siteName: 'InfoTekno.net'
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

// Helper untuk membersihkan tag HTML untuk excerpt
function stripHtml(html: string) {
    return html.replace(/<[^>]*>?/gm, '');
}

async function fetchWordPressPosts(config: typeof EXTERNAL_CONFIG.wordpress, sourcePrefix: string): Promise<BlogPost[]> {
    if (!config.enabled || config.endpoint.includes('YOUR_SITE')) return [];

    try {
        let url = `${config.endpoint}?_embed&per_page=10`;
        if (config.authorId) {
            url += `&author=${config.authorId}`;
        }

        console.log(`Fetching WP Posts from ${config.siteName}:`, url);
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://myportfolio.com)'
            },
            next: { revalidate: 0 }
        } as any);

        if (!res.ok) throw new Error(`Failed to fetch from ${config.siteName}`);

        const posts = await res.json();

        return posts.map((p: any) => ({
            id: `${sourcePrefix}-${p.id}`,
            title: p.title.rendered,
            slug: p.slug,
            date: p.date.split('T')[0],
            content: p.content.rendered,
            excerpt: stripHtml(p.excerpt.rendered).substring(0, 150) + '...',
            imageUrl: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            tags: [config.siteName],
            source: 'wordpress',
            link: p.link
        }));
    } catch (e) {
        console.error(`${config.siteName} Fetch Error:`, e);
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

    // Fetch dari kedua WordPress sites
    const [wpPosts, wpPosts2] = await Promise.allSettled([
        fetchWordPressPosts(EXTERNAL_CONFIG.wordpress, 'wp1'),
        fetchWordPressPosts(EXTERNAL_CONFIG.wordpress2, 'wp2')
    ]);

    const externalPosts = [
        ...(wpPosts.status === 'fulfilled' ? wpPosts.value : []),
        ...(wpPosts2.status === 'fulfilled' ? wpPosts2.value : [])
    ];

    const allPosts = [...localPosts, ...externalPosts];

    // Sort by date descending
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
