import fs from 'fs';
import path from 'path';

export async function cat(filePath, currentDir) {
    const fullPath = path.resolve(currentDir, filePath);
    const readStream = fs.createReadStream(fullPath, 'utf-8');

    readStream.on('data', (text) => {
        process.stdout.write(text);
    });

    readStream.on('end', () => {
        console.log('\n');
    });

    readStream.on('error', (err) => {
        throw err;
    });
}