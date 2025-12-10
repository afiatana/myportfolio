"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('hero');
    const router = useRouter();

    useEffect(() => {
        fetch('/api/admin/data')
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(() => router.push('/admin/login'));
    }, [router]);

    const handleSave = async () => {
        await fetch('/api/admin/data', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        alert('SYSTEM UPDATED');
    };

    const handleChange = (section: string, field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    if (loading) return <div style={{ color: '#00FF41', padding: '2rem' }}>LOADING SYSTEM...</div>;

    const inputStyle = {
        width: '100%',
        padding: '0.8rem',
        background: '#050505',
        border: '1px solid #008F11',
        color: '#00FF41',
        marginBottom: '1rem',
        fontFamily: 'inherit'
    };

    const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#00FF41', opacity: 0.8 };

    return (
        <div style={{ padding: '2rem', paddingTop: '8rem', background: '#000', minHeight: '100vh', color: '#00FF41', fontFamily: "'Share Tech Mono', monospace" }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #008F11', paddingBottom: '1rem' }}>
                <h1>ADMIN_CONSOLE_V1</h1>
                <button onClick={handleSave} style={{
                    padding: '0.5rem 2rem', background: '#00FF41', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer'
                }}>SAVE CHANGES</button>
            </header>

            <div style={{ display: 'flex', gap: '2rem' }}>
                <nav style={{ width: '200px' }}>
                    {['hero', 'about', 'skills', 'projects'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                display: 'block', width: '100%', padding: '1rem', textAlign: 'left',
                                background: activeTab === tab ? 'rgba(0, 255, 65, 0.1)' : 'transparent',
                                color: '#00FF41',
                                border: 'none',
                                cursor: 'pointer',
                                borderLeft: activeTab === tab ? '4px solid #00FF41' : '4px solid transparent'
                            }}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </nav>

                <main style={{ flex: 1, background: '#050505', padding: '2rem', border: '1px solid #008F11' }}>
                    {activeTab === 'hero' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px dashed #008F11' }}>HERO SECTION</h2>

                            <label style={labelStyle}>Greeting</label>
                            <input
                                style={inputStyle}
                                value={data.hero.greeting}
                                onChange={e => handleChange('hero', 'greeting', e.target.value)}
                            />

                            <label style={labelStyle}>Headline Name</label>
                            <input
                                style={inputStyle}
                                value={data.hero.headline}
                                onChange={e => handleChange('hero', 'headline', e.target.value)}
                            />

                            <label style={labelStyle}>Role</label>
                            <input
                                style={inputStyle}
                                value={data.hero.role}
                                onChange={e => handleChange('hero', 'role', e.target.value)}
                            />

                            <label style={labelStyle}>Subtext</label>
                            <textarea
                                style={{ ...inputStyle, minHeight: '100px' }}
                                value={data.hero.subtext}
                                onChange={e => handleChange('hero', 'subtext', e.target.value)}
                            />

                            <label style={labelStyle}>Profile Image</label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            const file = e.target.files[0];
                                            const formData = new FormData();
                                            formData.append('file', file);

                                            try {
                                                const res = await fetch('/api/admin/upload', {
                                                    method: 'POST',
                                                    body: formData
                                                });
                                                const result = await res.json();
                                                if (result.url) {
                                                    handleChange('hero', 'imageUrl', result.url);
                                                }
                                            } catch (err) {
                                                alert('UPLOAD FAILED');
                                            }
                                        }
                                    }}
                                    style={{ color: '#00FF41' }}
                                />
                            </div>

                            {data.hero.imageUrl && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <img
                                        src={data.hero.imageUrl}
                                        alt="Preview"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid #00FF41' }}
                                    />
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Current: {data.hero.imageUrl}</p>
                                </div>
                            )}

                            <label style={labelStyle}>Profile Image Size (px): {data.hero.profileImageSize || 400}</label>
                            <input
                                type="range"
                                min="200"
                                max="600"
                                value={data.hero.profileImageSize || 400}
                                onChange={e => handleChange('hero', 'profileImageSize', parseInt(e.target.value))}
                                style={{ width: '100%', marginBottom: '1rem' }}
                            />

                            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#a4ffa4', borderBottom: '1px dashed #008F11', paddingBottom: '0.5rem' }}>Social Media Links</h3>

                            <label style={labelStyle}>Facebook URL</label>
                            <input
                                style={inputStyle}
                                value={data.hero.socialMedia?.facebook || ''}
                                onChange={e => setData((prev: any) => ({
                                    ...prev,
                                    hero: {
                                        ...prev.hero,
                                        socialMedia: { ...prev.hero.socialMedia, facebook: e.target.value }
                                    }
                                }))}
                                placeholder="https://facebook.com/your-profile"
                            />

                            <label style={labelStyle}>Instagram URL</label>
                            <input
                                style={inputStyle}
                                value={data.hero.socialMedia?.instagram || ''}
                                onChange={e => setData((prev: any) => ({
                                    ...prev,
                                    hero: {
                                        ...prev.hero,
                                        socialMedia: { ...prev.hero.socialMedia, instagram: e.target.value }
                                    }
                                }))}
                                placeholder="https://instagram.com/your-username"
                            />

                            <label style={labelStyle}>WhatsApp Link</label>
                            <input
                                style={inputStyle}
                                value={data.hero.socialMedia?.whatsapp || ''}
                                onChange={e => setData((prev: any) => ({
                                    ...prev,
                                    hero: {
                                        ...prev.hero,
                                        socialMedia: { ...prev.hero.socialMedia, whatsapp: e.target.value }
                                    }
                                }))}
                                placeholder="https://wa.me/6281234567890"
                            />

                            <label style={labelStyle}>LinkedIn URL</label>
                            <input
                                style={inputStyle}
                                value={data.hero.socialMedia?.linkedin || ''}
                                onChange={e => setData((prev: any) => ({
                                    ...prev,
                                    hero: {
                                        ...prev.hero,
                                        socialMedia: { ...prev.hero.socialMedia, linkedin: e.target.value }
                                    }
                                }))}
                                placeholder="https://linkedin.com/in/your-profile"
                            />
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px dashed #008F11' }}>ABOUT SECTION</h2>
                            {/* Simple textarea for bio editing for now */}
                            <label style={labelStyle}>Bio (Paragraphs separated by | for this basic editor)</label>
                            <textarea
                                style={{ ...inputStyle, minHeight: '200px' }}
                                value={data.about.bio.join(' | ')}
                                onChange={e => handleChange('about', 'bio', e.target.value.split('|').map((s: string) => s.trim()))}
                            />
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px dashed #008F11' }}>SKILLS MANAGEMENT</h2>
                            <p style={{ marginBottom: '1rem', opacity: 0.7 }}>
                                Icons akan di-generate otomatis berdasarkan nama skill.
                                <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                    Contoh: "React", "JavaScript", "Node.js", "PHP", "MySQL", dll.
                                </span>
                            </p>

                            {Object.entries(data.skills).map(([category, skills]) => (
                                <div key={category} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #008F11' }}>
                                    <h3 style={{ marginBottom: '1rem', color: '#a4ffa4' }}>{category}</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                                        {(skills as any[]).map((skill: any, index: number) => {
                                            const skillName = typeof skill === 'string' ? skill : skill.name;
                                            const skillIcon = typeof skill === 'string' ? '' : skill.iconUrl;

                                            // Auto-generate icon URL
                                            const autoGeneratedIcon = (() => {
                                                const normalized = skillName
                                                    .toLowerCase()
                                                    .replace(/\s+/g, '')
                                                    .replace(/\./g, 'dot')
                                                    .replace(/\+/g, 'plus')
                                                    .replace(/#/g, 'sharp');

                                                // DevIcon mapping for icons that Simple Icons doesn't have or have issues
                                                const deviconMapping: { [key: string]: { slug: string; variant: string } } = {
                                                    'css3': { slug: 'css3', variant: 'plain' },
                                                    'css': { slug: 'css3', variant: 'plain' },
                                                    'vscode': { slug: 'vscode', variant: 'original' },
                                                    'vscodespace': { slug: 'vscode', variant: 'original' },
                                                    'visualstudiocode': { slug: 'vscode', variant: 'original' },
                                                };

                                                // Check if we should use DevIcon
                                                if (deviconMapping[normalized]) {
                                                    const { slug, variant } = deviconMapping[normalized];
                                                    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;
                                                }

                                                // Simple Icons mapping
                                                const simpleIconsMapping: { [key: string]: string } = {
                                                    'html5': 'html5', 'html': 'html5',
                                                    'javascript': 'javascript', 'js': 'javascript', 'typescript': 'typescript', 'ts': 'typescript',
                                                    'react': 'react', 'reactjs': 'react', 'nextdotjs': 'nextdotjs', 'next': 'nextdotjs',
                                                    'nodejs': 'nodedotjs', 'nodedotjs': 'nodedotjs', 'node': 'nodedotjs',
                                                    'vuedotjs': 'vuedotjs', 'vue': 'vuedotjs', 'tailwindcss': 'tailwindcss', 'tailwind': 'tailwindcss',
                                                    'php': 'php', 'python': 'python', 'java': 'openjdk',
                                                    'mysql': 'mysql', 'postgresql': 'postgresql', 'mongodb': 'mongodb',
                                                    'git': 'git', 'github': 'github',
                                                    'figma': 'figma', 'wordpress': 'wordpress', 'laravel': 'laravel',
                                                    'django': 'django', 'express': 'express', 'expressjs': 'express',
                                                    'seooptimization': 'googlesearchconsole', 'seo': 'googlesearchconsole',
                                                    'googleanalytics': 'googleanalytics', 'analytics': 'googleanalytics',
                                                    'docker': 'docker', 'kubernetes': 'kubernetes',
                                                    'sass': 'sass', 'scss': 'sass', 'bootstrap': 'bootstrap',
                                                    'restapi': 'swagger', 'graphql': 'graphql', 'firebase': 'firebase',
                                                };

                                                const iconSlug = simpleIconsMapping[normalized] || normalized;
                                                return `https://cdn.simpleicons.org/${iconSlug}/00FF41`;
                                            })();

                                            const displayIcon = skillIcon || autoGeneratedIcon;

                                            return (
                                                <div key={index} style={{ background: '#000', padding: '1rem', border: '1px solid #008F11' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                        {/* Icon Preview */}
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <img
                                                                src={displayIcon}
                                                                alt={skillName}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    objectFit: 'contain',
                                                                    // Convert all icons to Matrix green (#00FF41)
                                                                    filter: 'brightness(0) saturate(100%) invert(88%) sepia(26%) saturate(6726%) hue-rotate(54deg) brightness(102%) contrast(101%)'
                                                                }}
                                                                onError={(e) => {
                                                                    // Fallback to a default icon if auto-generated fails
                                                                    (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/visualstudiocode/00FF41';
                                                                }}
                                                            />
                                                            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                                                                {skillIcon ? '[Custom]' : '[Auto]'}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const newSkills = (data.skills[category] as any[]).filter((_, i) => i !== index);
                                                                setData((prev: any) => ({
                                                                    ...prev,
                                                                    skills: { ...prev.skills, [category]: newSkills }
                                                                }));
                                                            }}
                                                            style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                                                        >
                                                            [DELETE]
                                                        </button>
                                                    </div>

                                                    <label style={labelStyle}>Skill Name</label>
                                                    <input
                                                        style={inputStyle}
                                                        value={skillName}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            const newSkills = [...(data.skills[category] as any[])];

                                                            // Auto-generate icon when name changes (only if no custom icon)
                                                            if (typeof newSkills[index] === 'string') {
                                                                newSkills[index] = { name: newValue, iconUrl: '' };
                                                            } else {
                                                                newSkills[index] = { ...newSkills[index], name: newValue };
                                                            }

                                                            setData((prev: any) => ({
                                                                ...prev,
                                                                skills: { ...prev.skills, [category]: newSkills }
                                                            }));
                                                        }}
                                                        placeholder="e.g., React, JavaScript, MySQL"
                                                    />

                                                    <label style={{ ...labelStyle, fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                                        Custom Icon (Optional - upload untuk override)
                                                    </label>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            style={{ fontSize: '0.75rem', color: '#00FF41', flex: 1 }}
                                                            onChange={async (e) => {
                                                                if (e.target.files && e.target.files[0]) {
                                                                    const formData = new FormData();
                                                                    formData.append('file', e.target.files[0]);
                                                                    try {
                                                                        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                                                                        const result = await res.json();
                                                                        if (result.url) {
                                                                            const newSkills = [...(data.skills[category] as any[])];
                                                                            if (typeof newSkills[index] === 'string') {
                                                                                newSkills[index] = { name: skillName, iconUrl: result.url };
                                                                            } else {
                                                                                newSkills[index] = { ...newSkills[index], iconUrl: result.url };
                                                                            }
                                                                            setData((prev: any) => ({
                                                                                ...prev,
                                                                                skills: { ...prev.skills, [category]: newSkills }
                                                                            }));
                                                                        }
                                                                    } catch { alert('Upload Failed'); }
                                                                }
                                                            }}
                                                        />
                                                        {skillIcon && (
                                                            <button
                                                                onClick={() => {
                                                                    const newSkills = [...(data.skills[category] as any[])];
                                                                    newSkills[index] = { ...newSkills[index], iconUrl: '' };
                                                                    setData((prev: any) => ({
                                                                        ...prev,
                                                                        skills: { ...prev.skills, [category]: newSkills }
                                                                    }));
                                                                }}
                                                                style={{
                                                                    padding: '0.3rem 0.6rem',
                                                                    background: '#008F11',
                                                                    color: '#00FF41',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            >
                                                                Reset to Auto
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Add New Skill Button */}
                                        <button
                                            onClick={() => {
                                                const newSkills = [...(data.skills[category] as any[]), { name: 'New Skill', iconUrl: '' }];
                                                setData((prev: any) => ({
                                                    ...prev,
                                                    skills: { ...prev.skills, [category]: newSkills }
                                                }));
                                            }}
                                            style={{
                                                border: '1px dashed #008F11',
                                                background: 'transparent',
                                                color: '#00FF41',
                                                cursor: 'pointer',
                                                padding: '1rem',
                                                minHeight: '100px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            + ADD SKILL
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div>
                            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px dashed #008F11' }}>PROJECTS MANAGEMENT</h2>

                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {(data.projects || []).map((project: any, index: number) => (
                                    <div key={index} style={{ border: '1px solid #008F11', padding: '1.5rem', background: '#000' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <h3 style={{ color: '#00FF41' }}>Project #{index + 1}</h3>
                                            <button
                                                onClick={() => {
                                                    const newProjects = data.projects.filter((_: any, i: number) => i !== index);
                                                    setData((prev: any) => ({ ...prev, projects: newProjects }));
                                                }}
                                                style={{ background: 'red', color: 'white', border: 'none', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                                            >
                                                DELETE
                                            </button>
                                        </div>

                                        <label style={labelStyle}>Title</label>
                                        <input
                                            style={inputStyle}
                                            value={project.title}
                                            onChange={(e) => {
                                                const newProjects = [...data.projects];
                                                newProjects[index] = { ...newProjects[index], title: e.target.value };
                                                setData((prev: any) => ({ ...prev, projects: newProjects }));
                                            }}
                                        />

                                        <label style={labelStyle}>Description</label>
                                        <textarea
                                            style={{ ...inputStyle, minHeight: '100px' }}
                                            value={project.description}
                                            onChange={(e) => {
                                                const newProjects = [...data.projects];
                                                newProjects[index] = { ...newProjects[index], description: e.target.value };
                                                setData((prev: any) => ({ ...prev, projects: newProjects }));
                                            }}
                                        />

                                        <label style={labelStyle}>Tags (comma separated)</label>
                                        <input
                                            style={inputStyle}
                                            value={project.tags.join(', ')}
                                            onChange={(e) => {
                                                const newProjects = [...data.projects];
                                                newProjects[index] = { ...newProjects[index], tags: e.target.value.split(',').map((t: string) => t.trim()) };
                                                setData((prev: any) => ({ ...prev, projects: newProjects }));
                                            }}
                                        />

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <label style={labelStyle}>Demo Link</label>
                                                <input
                                                    style={inputStyle}
                                                    value={project.link}
                                                    onChange={(e) => {
                                                        const newProjects = [...data.projects];
                                                        newProjects[index] = { ...newProjects[index], link: e.target.value };
                                                        setData((prev: any) => ({ ...prev, projects: newProjects }));
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>GitHub Link</label>
                                                <input
                                                    style={inputStyle}
                                                    value={project.github}
                                                    onChange={(e) => {
                                                        const newProjects = [...data.projects];
                                                        newProjects[index] = { ...newProjects[index], github: e.target.value };
                                                        setData((prev: any) => ({ ...prev, projects: newProjects }));
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <label style={labelStyle}>Project Image</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            {project.imageUrl && <img src={project.imageUrl} style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid #008F11' }} />}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ color: '#00FF41' }}
                                                onChange={async (e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const formData = new FormData();
                                                        formData.append('file', e.target.files[0]);
                                                        try {
                                                            const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                                                            const result = await res.json();
                                                            if (result.url) {
                                                                const newProjects = [...data.projects];
                                                                newProjects[index] = { ...newProjects[index], imageUrl: result.url };
                                                                setData((prev: any) => ({ ...prev, projects: newProjects }));
                                                            }
                                                        } catch { alert('Upload Failed'); }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => {
                                        const newProject = {
                                            id: Date.now(),
                                            title: 'New Project',
                                            description: 'Project description...',
                                            tags: ['Tag1', 'Tag2'],
                                            link: '#',
                                            github: '#',
                                            imageUrl: ''
                                        };
                                        setData((prev: any) => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
                                    }}
                                    style={{ padding: '1rem', border: '1px dashed #008F11', background: 'transparent', color: '#00FF41', cursor: 'pointer', textTransform: 'uppercase' }}
                                >
                                    + Add New Project
                                </button>
                            </div>
                        </div>
                    )}


                </main>
            </div>
        </div>
    );
}
