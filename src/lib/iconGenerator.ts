/**
 * Auto-generates icon URL for a given skill/technology name
 * Uses Simple Icons CDN (https://simpleicons.org/)
 */

export function generateIconUrl(skillName: string): string {
    // Normalize the skill name for Simple Icons
    // Simple Icons uses lowercase, no spaces, no dots
    const normalized = skillName
        .toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, 'dot')
        .replace(/\+/g, 'plus')
        .replace(/#/g, 'sharp');

    // Special cases mapping
    const specialCases: { [key: string]: string } = {
        'html5': 'html5',
        'css3': 'css3',
        'javascript': 'javascript',
        'js': 'javascript',
        'typescript': 'typescript',
        'ts': 'typescript',
        'react': 'react',
        'reactjs': 'react',
        'nextdotjs': 'nextdotjs',
        'next': 'nextdotjs',
        'nodejs': 'nodedotjs',
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
        'less': 'less',
        'webpack': 'webpack',
        'vite': 'vite',
        'php': 'php',
        'python': 'python',
        'java': 'openjdk',
        'csharp': 'csharp',
        'cplusplus': 'cplusplus',
        'c': 'c',
        'go': 'go',
        'rust': 'rust',
        'ruby': 'ruby',
        'kotlin': 'kotlin',
        'swift': 'swift',
        'dart': 'dart',
        'mysql': 'mysql',
        'postgresql': 'postgresql',
        'mongodb': 'mongodb',
        'redis': 'redis',
        'sqlite': 'sqlite',
        'firebase': 'firebase',
        'supabase': 'supabase',
        'graphql': 'graphql',
        'restapi': 'swagger',
        'docker': 'docker',
        'kubernetes': 'kubernetes',
        'git': 'git',
        'github': 'github',
        'gitlab': 'gitlab',
        'bitbucket': 'bitbucket',
        'vscode': 'visualstudiocode',
        'visualstudiocode': 'visualstudiocode',
        'visualstudio': 'visualstudio',
        'intellijidea': 'intellijidea',
        'pycharm': 'pycharm',
        'webstorm': 'webstorm',
        'androidstudio': 'androidstudio',
        'xcode': 'xcode',
        'figma': 'figma',
        'adobephotoshop': 'adobephotoshop',
        'photoshop': 'adobephotoshop',
        'adobeillustrator': 'adobeillustrator',
        'illustrator': 'adobeillustrator',
        'sketch': 'sketch',
        'wordpress': 'wordpress',
        'shopify': 'shopify',
        'woocommerce': 'woocommerce',
        'magento': 'magento',
        'laravel': 'laravel',
        'django': 'django',
        'flask': 'flask',
        'express': 'express',
        'expressjs': 'express',
        'nestjs': 'nestjs',
        'fastapi': 'fastapi',
        'spring': 'spring',
        'springboot': 'springboot',
        'seooptimization': 'googlesearchconsole',
        'seo': 'googlesearchconsole',
        'googleanalytics': 'googleanalytics',
        'analytics': 'googleanalytics',
        'jest': 'jest',
        'mocha': 'mocha',
        'cypress': 'cypress',
        'playwright': 'playwright',
        'selenium': 'selenium',
        'npm': 'npm',
        'yarn': 'yarn',
        'pnpm': 'pnpm',
        'aws': 'amazonaws',
        'azure': 'microsoftazure',
        'gcp': 'googlecloud',
        'googlecloud': 'googlecloud',
        'vercel': 'vercel',
        'netlify': 'netlify',
        'heroku': 'heroku',
        'linux': 'linux',
        'ubuntu': 'ubuntu',
        'debian': 'debian',
        'centos': 'centos',
        'windows': 'windows',
        'macos': 'macos',
        'android': 'android',
        'ios': 'ios',
        'flutter': 'flutter',
        'reactnative': 'react',
        'ionic': 'ionic',
        'redux': 'redux',
        'mobx': 'mobx',
        'zustand': 'react',
        'jotai': 'react',
        'recoil': 'react',
    };

    const iconSlug = specialCases[normalized] || normalized;

    // Return Simple Icons CDN URL
    return `https://cdn.simpleicons.org/${iconSlug}/00FF41`;
}

/**
 * Check if an icon URL is valid by attempting to fetch it
 */
export async function validateIconUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}
