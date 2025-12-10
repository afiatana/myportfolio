"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                const data = await res.json();
                setError(data.error || 'ACCESS DENIED');
            }
        } catch (err) {
            setError('CONNECTION ERROR');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            color: '#00FF41',
            fontFamily: "'Share Tech Mono', monospace"
        }}>
            <form onSubmit={handleSubmit} style={{
                padding: '2rem',
                border: '1px solid #00FF41',
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
                textAlign: 'center',
                minWidth: '350px'
            }}>
                <h1 style={{ marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    System Access
                </h1>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="USERNAME"
                    required
                    style={{
                        padding: '1rem',
                        background: '#050505',
                        border: '1px solid #008F11',
                        color: '#00FF41',
                        marginBottom: '1rem',
                        width: '100%',
                        outline: 'none',
                        fontFamily: 'inherit'
                    }}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                    required
                    style={{
                        padding: '1rem',
                        background: '#050505',
                        border: '1px solid #008F11',
                        color: '#00FF41',
                        marginBottom: '1rem',
                        width: '100%',
                        outline: 'none',
                        fontFamily: 'inherit'
                    }}
                />

                {error && <p style={{ color: '#ff0000', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '1rem 2rem',
                        background: loading ? '#666' : '#00FF41',
                        color: '#000',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        width: '100%',
                        textTransform: 'uppercase'
                    }}
                >
                    {loading ? 'AUTHENTICATING...' : 'LOGIN'}
                </button>
            </form>
        </div>
    );
}
