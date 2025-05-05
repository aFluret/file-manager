import fs from 'fs';
import path from 'path';

export async function ls(currentDir) {
    try {
        const files = fs.readdirSync(currentDir);
        const dirs = [];
        const filesOnly = [];

        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                dirs.push(file);
            } else {
                filesOnly.push(file);
            }
        }

        dirs.sort().forEach(d => console.log(`[DIR]  ${d}`));
        filesOnly.sort().forEach(f => console.log(`[FILE] ${f}`));
    } catch (err) {
        throw err;
    }
}