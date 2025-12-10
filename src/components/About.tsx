import styles from './About.module.css';

interface AboutProps {
    data: {
        bio: string[];
        stats: { number: string; label: string }[];
    };
}

export default function About({ data }: AboutProps) {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>About Me</h2>
                    <p className={styles.subtitle}>
                        Passionate about creating digital experiences that matter.
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.bio}>
                        {data.bio.map((paragraph, index) => (
                            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/Web Developer|SEO/g, (match) => `<span class="${styles.highlight}">${match}</span>`) }} />
                        ))}
                    </div>

                    <div className={styles.stats}>
                        {data.stats.map((stat, index) => (
                            <div key={index} className={styles.statItem}>
                                <span className={styles.statNumber}>{stat.number}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
