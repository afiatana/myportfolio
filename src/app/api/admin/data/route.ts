import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/portfolioData';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Helper to check auth
async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_token')?.value === 'authenticated';
}

export async function GET() {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await getPortfolioData();
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const newData = await req.json();
        await savePortfolioData(newData);
        revalidatePath('/'); // Clear cache for home page
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
