
import { getPortfolioData } from '@/lib/portfolioData';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
    const data = getPortfolioData();
    return (data.blog || []).map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost(
    props: {
        params: Promise<{ slug: string }>
    }
) {
    const params = await props.params;
    const data = getPortfolioData();
    const post = data.blog?.find((p: any) => p.slug === params.slug);

    if (!post) {
        return notFound();
    }

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#050505', color: '#e0e0e0' }}>
            <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 6rem 2rem' }}>
                <Link href="/blog" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#666',
                    textDecoration: 'none',
                    marginBottom: '3rem',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    BACK TO BLOG
                </Link>

                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                            fontFamily: 'monospace',
                            color: '#00FF41',
                            background: 'rgba(0, 255, 65, 0.1)',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                        }}>
                            {post.date}
                        </span>
                        {post.tags?.map((tag: string) => (
                            <span key={tag} style={{ fontSize: '0.9rem', color: '#888' }}>#{tag}</span>
                        ))}
                    </div>

                    <h1 style={{
                        fontSize: '3rem',
                        lineHeight: '1.2',
                        fontWeight: '800',
                        marginBottom: '2rem',
                        color: '#fff',
                        letterSpacing: '-1px'
                    }}>
                        {post.title}
                    </h1>

                    {post.imageUrl && (
                        <div style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '3rem',
                            border: '1px solid #222'
                        }}>
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </header>

                <div
                    className="blog-content"
                    style={{
                        fontSize: '1.15rem',
                        lineHeight: '1.8',
                        color: '#ccc',
                        fontFamily: "'Georgia', serif",
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {post.content}
                </div>

                <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid #222' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>Thanks for reading!</h3>
                    <p style={{ color: '#666' }}>
                        If you enjoyed this post, check out my other articles on the <Link href="/blog" style={{ color: '#00FF41' }}>blog index</Link>.
                    </p>
                </div>
            </article>
        </div>
    );
}
