import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'content.json');

// Configuration for GitHub Sync
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'afiatana';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'myportfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main'; // or 'master', check your repo
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getPortfolioData() {
    // In production, fetch from GitHub Raw to ensure we get the latest "committed" data
    // This solves the ephemeral file system issue on Vercel
    if (process.env.NODE_ENV === 'production') {
        try {
            // Use GitHub API (if token) or Raw URL
            // Using API is better for private repos, but rate limited.
            // Using Raw is good for public. 
            // Let's use Raw with cache busting for speed + freshness
            const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/src/data/content.json`;
            const headers: HeadersInit = {};
            if (GITHUB_TOKEN) {
                headers['Authorization'] = `token ${GITHUB_TOKEN}`;
            }

            const res = await fetch(url, {
                headers,
                next: { tags: ['portfolio-data'], revalidate: 0 } // No cache suitable for "dashboard updates"
            });

            if (res.ok) {
                return await res.json();
            }
            console.warn('Failed to fetch from GitHub, falling back to local file (might be stale)');
        } catch (error) {
            console.error('Error fetching from GitHub:', error);
        }
    }

    // Local fallback (Dev environment or backup)
    if (fs.existsSync(dataPath)) {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileContents);
    }
    return {};
}

export async function savePortfolioData(data: any) {
    // 1. Save locally (always good for local dev or build cache)
    // Create dir if not exists
    const dir = path.dirname(dataPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

    // 2. If in Production OR if Token is present, sync to GitHub
    if (process.env.NODE_ENV === 'production' || GITHUB_TOKEN) {
        if (!GITHUB_TOKEN) {
            console.error('GITHUB_TOKEN is missing. Changes will NOT persist significantly.');
            throw new Error('GITHUB_TOKEN is required for permanent updates.');
        }

        const filePath = 'src/data/content.json';
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`;

        // Get SHA of current file
        const getRes = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
            cache: 'no-store'
        });

        if (!getRes.ok) {
            const err = await getRes.json();
            throw new Error(`Failed to fetch file SHA: ${err.message}`);
        }

        const fileData = await getRes.json();
        const sha = fileData.sha;

        // Encode content
        const contentEncoded = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

        // Push update
        const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Update portfolio content via Dashboard',
                content: contentEncoded,
                sha: sha,
                branch: BRANCH
            })
        });

        if (!putRes.ok) {
            const err = await putRes.json();
            throw new Error(`GitHub Update Failed: ${err.message}`);
        }
    }
}
