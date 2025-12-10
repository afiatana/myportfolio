import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src', 'data', 'content.json');

export function getPortfolioData() {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
}

export function savePortfolioData(data: any) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}
