import styles from './Skills.module.css';

interface SkillsProps {
    data: {
        [category: string]: (string | { name: string; iconUrl?: string })[];
    };
}

// Function to auto-generate icon URL from skill name
function generateIconUrl(skillName: string): string {
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
        'html5': 'html5',
        'html': 'html5',
        'javascript': 'javascript',
        'js': 'javascript',
        'typescript': 'typescript',
        'ts': 'typescript',
        'react': 'react',
        'reactjs': 'react',
        'nextdotjs': 'nextdotjs',
        'next': 'nextdotjs',
        'nodejs': 'nodedotjs',
        'nodedotjs': 'nodedotjs',
        'node': 'nodedotjs',
        'vuedotjs': 'vuedotjs',
        'vue': 'vuedotjs',
        'angular': 'angular',
        'svelte': 'svelte',
        'tailwindcss': 'tailwindcss',
        'tailwind': 'tailwindcss',
        'bootstrap': 'bootstrap',
        'sass': 'sass',
        'scss': 'sass',
        'php': 'php',
        'python': 'python',
        'java': 'openjdk',
        'mysql': 'mysql',
        'postgresql': 'postgresql',
        'mongodb': 'mongodb',
        'redis': 'redis',
        'firebase': 'firebase',
        'graphql': 'graphql',
        'restapi': 'swagger',
        'git': 'git',
        'github': 'github',
        'figma': 'figma',
        'wordpress': 'wordpress',
        'laravel': 'laravel',
        'django': 'django',
        'express': 'express',
        'expressjs': 'express',
        'seooptimization': 'googlesearchconsole',
        'seo': 'googlesearchconsole',
        'googleanalytics': 'googleanalytics',
        'analytics': 'googleanalytics',
        'docker': 'docker',
        'kubernetes': 'kubernetes',
        'aws': 'amazonaws',
        'vercel': 'vercel',
        'netlify': 'netlify',
    };

    const iconSlug = simpleIconsMapping[normalized] || normalized;
    return `https://cdn.simpleicons.org/${iconSlug}/00FF41`;
}

export default function Skills({ data }: SkillsProps) {
    return (
        <section id="skills" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>My Skills</h2>
                    <p>Technologies I work with.</p>
                </div>

                <div className={styles.categories}>
                    {Object.entries(data).map(([category, skills]) => (
                        <div key={category} className={styles.categoryGroup}>
                            <h3 className={styles.categoryTitle}>{category}</h3>
                            <div className={styles.grid}>
                                {skills.map((skill, index) => {
                                    const skillName = typeof skill === 'string' ? skill : skill.name;
                                    const customIconUrl = typeof skill === 'object' ? skill.iconUrl : undefined;

                                    // Use custom icon if available, otherwise auto-generate
                                    const iconUrl = customIconUrl || generateIconUrl(skillName);

                                    return (
                                        <div key={index} className={styles.skillCard}>
                                            <span className={styles.icon}>
                                                <img
                                                    src={iconUrl}
                                                    alt={skillName}
                                                    style={{
                                                        width: '1em',
                                                        height: '1em',
                                                        objectFit: 'contain',
                                                        // Convert all icons to Matrix green (#00FF41)
                                                        filter: 'brightness(0) saturate(100%) invert(88%) sepia(26%) saturate(6726%) hue-rotate(54deg) brightness(102%) contrast(101%)'
                                                    }}
                                                    onError={(e) => {
                                                        // Fallback to a code icon if the specific icon fails
                                                        (e.target as HTMLImageElement).src =
                                                            'https://cdn.simpleicons.org/visualstudiocode/00FF41';
                                                    }}
                                                />
                                            </span>
                                            <p className={styles.skillName}>{skillName}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
