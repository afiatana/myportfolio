import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';
import fs from 'fs/promises';

// Helper to check auth
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_token')?.value === 'authenticated';
}

// Config
const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'afiatana';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'myportfolio';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function POST(req: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean filename
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${Date.now()}_${cleanName}`;

        // If Production/GITHUB_TOKEN exists, upload to GitHub
        if (process.env.NODE_ENV === 'production' || GITHUB_TOKEN) {
            if (!GITHUB_TOKEN) {
                return NextResponse.json({ error: 'GitHub Token missing for upload' }, { status: 500 });
            }

            // Path in repo
            const repoPath = `public/uploads/${filename}`;
            const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}`;

            // Encoder
            const contentEncoded = buffer.toString('base64');

            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Upload image ${filename} via Dashboard`,
                    content: contentEncoded,
                    branch: BRANCH
                })
            });

            if (!res.ok) {
                const err = await res.json();
                console.error('GitHub Upload Error:', err);
                return NextResponse.json({ error: 'Failed to upload to GitHub' }, { status: 500 });
            }

            // Return Raw URL (GitHub Raw CDN)
            // Use 'raw.githubusercontent.com' to serve it
            const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/public/uploads/${filename}`;

            return NextResponse.json({ url: rawUrl });
        } else {
            // Local Fallback (Dev Only)
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }

            const filepath = path.join(uploadDir, filename);
            await fs.writeFile(filepath, buffer);

            return NextResponse.json({ url: `/uploads/${filename}` });
        }

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
