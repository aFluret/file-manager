// src/commands/hash.js
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

export async function calculateHash(filePath, currentDir) {
    const fullPath = path.resolve(currentDir, filePath);

    try {
        const hash = createHash('sha256');
        const stream = createReadStream(fullPath);

        stream.on('data', (chunk) => hash.update(chunk));
        stream.on('end', () => {
            console.log(`SHA256 hash of "${filePath}": ${hash.digest('hex')}`);
        });

        stream.on('error', () => console.error('Operation failed'));
    } catch (err) {
        console.error('Operation failed');
    }
}