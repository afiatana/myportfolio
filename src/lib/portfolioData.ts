import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'content.json');

// Configuration for GitHub Sync
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'afiatana';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'myportfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main'; // or 'master', check your repo
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function getPortfolioData() {
    // In production, fetch from GitHub API to avoid Raw CDN Caching
    if (process.env.NODE_ENV === 'production') {
        try {
            const filePath = 'src/data/content.json';
            // Use contents API with timestamp to bust any lingering cache
            // Note: We use the API, not Raw, because API is atomic and usually fresher for small files
            const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}&t=${Date.now()}`;

            const headers: HeadersInit = {
                'Accept': 'application/vnd.github.v3+json',
                'Cache-Control': 'no-cache'
            };
            if (GITHUB_TOKEN) {
                headers['Authorization'] = `token ${GITHUB_TOKEN}`;
            }

            // revalidate: 0 is CRITICAL here
            const res = await fetch(url, {
                headers,
                next: { tags: ['portfolio-data'], revalidate: 0 },
                cache: 'no-store'
            });

            if (res.ok) {
                const data = await res.json();
                // API returns content in Base64
                if (data.content && data.encoding === 'base64') {
                    const decoded = Buffer.from(data.content, 'base64').toString('utf8');
                    return JSON.parse(decoded);
                }
            }
            console.warn('Failed to fetch from GitHub API, falling back to Raw or Local');

            // Fallback to Raw if API fails (e.g. rate limit)
            const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/src/data/content.json?t=${Date.now()}`;
            const rawRes = await fetch(rawUrl, { next: { revalidate: 0 } });
            if (rawRes.ok) return await rawRes.json();

        } catch (error) {
            console.error('Error fetching from GitHub:', error);
        }
    }

    // Local fallback
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
