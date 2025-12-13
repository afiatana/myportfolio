import { useState } from 'react';
import styles from './Projects.module.css';

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    imageUrl?: string;
}

interface ProjectsProps {
    data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="projects" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Featured Projects</h2>
                    <p className={styles.subtitle}>A selection of my recent work.</p>
                </div>

                <div className={styles.grid}>
                    {data.map((project) => (
                        <div key={project.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                        onClick={() => setSelectedImage(project.imageUrl!)}
                                    />
                                ) : (
                                    <span className={styles.imagePlaceholder}>🖼️</span>
                                )}
                            </div>
                            <div className={styles.content}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.description}>{project.description}</p>
                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <div className={styles.links}>
                                    <a href={project.link} className={styles.link}>Live Demo ↗</a>
                                    <a href={project.github} className={styles.link}>GitHub ↗</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
                            ×
                        </button>
                        <img src={selectedImage} alt="Project Detail" className={styles.modalImage} />
                    </div>
                </div>
            )}
        </section>
    );
}
