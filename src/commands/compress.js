import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';

export async function compress(src, dest, currentDir) {
    const srcPath = path.resolve(currentDir, src);
    const destPath = path.resolve(currentDir, dest);

    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(destPath + '.br');
    const brotli = createBrotliCompress();

    readStream
        .pipe(brotli)
        .pipe(writeStream)
        .on('finish', () => {
            console.log('Compression completed.');
        })
        .on('error', (err) => {
            throw err;
        });
}