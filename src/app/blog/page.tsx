
import { getPortfolioData } from '@/lib/portfolioData';
import Link from 'next/link';

export default function BlogIndex() {
    const data = getPortfolioData();
    const posts = data.blog || [];

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#050505', color: '#e0e0e0', fontFamily: "'Inter', sans-serif" }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', paddingBottom: '4rem' }}>
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        background: 'linear-gradient(90deg, #fff, #888)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-2px'
                    }}>
                        Latest Writings
                    </h1>
                    <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Thoughts, tutorials, and insights about web development and technology.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                    {posts.map((post: any) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} style={{ textDecoration: 'none' }}>
                            <article style={{
                                background: '#0a0a0a',
                                border: '1px solid #222',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ height: '220px', background: '#111', position: 'relative', overflow: 'hidden' }}>
                                    {post.imageUrl ? (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: `linear-gradient(45deg, #111, #1a1a1a)`,
                                            color: '#333',
                                            fontSize: '4rem',
                                            fontWeight: 'bold'
                                        }}>
                                            Aa.
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#00FF41', fontFamily: 'monospace' }}>{post.date}</span>
                                        {post.tags && (
                                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                                {post.tags.slice(0, 2).map((tag: string) => (
                                                    <span key={tag} style={{
                                                        fontSize: '0.7rem',
                                                        background: 'rgba(0, 255, 65, 0.1)',
                                                        color: '#00FF41',
                                                        padding: '0.2rem 0.5rem',
                                                        borderRadius: '100px'
                                                    }}>
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <h2 style={{
                                        fontSize: '1.5rem',
                                        color: '#fff',
                                        marginBottom: '0.8rem',
                                        fontWeight: '600',
                                        lineHeight: '1.3'
                                    }}>
                                        {post.title}
                                    </h2>

                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#aaa',
                                        lineHeight: '1.6',
                                        marginBottom: '1.5rem',
                                        flex: 1
                                    }}>
                                        {post.excerpt}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#00FF41',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}>
                                        Read Article
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem',
                        border: '1px dashed #333',
                        borderRadius: '12px',
                        marginTop: '2rem'
                    }}>
                        <p style={{ color: '#666', fontSize: '1.1rem' }}>No posts found yet.</p>
                        <Link href="/admin/login" style={{ marginTop: '1rem', display: 'inline-block', color: '#00FF41' }}>
                            Go to Admin Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
