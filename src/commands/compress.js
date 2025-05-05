import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import path from 'path';

export async function compress(sourcePath, destinationPath, currentDir) {
    const sourceFullPath = path.resolve(currentDir, sourcePath);
    const destinationFullPath = path.resolve(currentDir, destinationPath + '.br');

    try {
        const readStream = createReadStream(sourceFullPath);
        const writeStream = createWriteStream(destinationFullPath);
        const brotli = createBrotliCompress();

        readStream.pipe(brotli).pipe(writeStream);

        writeStream.on('finish', () => console.log('File compressed successfully.'));
        writeStream.on('error', () => console.error('Operation failed'));
    } catch (err) {
        console.error('Operation failed');
    }
}

export async function decompress(sourcePath, destinationPath, currentDir) {
    const sourceFullPath = path.resolve(currentDir, sourcePath);
    const destinationFullPath = path.resolve(currentDir, destinationPath);

    try {
        const readStream = createReadStream(sourceFullPath);
        const writeStream = createWriteStream(destinationFullPath);
        const brotli = createBrotliDecompress();

        readStream.pipe(brotli).pipe(writeStream);

        writeStream.on('finish', () => console.log('File decompressed successfully.'));
        writeStream.on('error', () => console.error('Operation failed'));
    } catch (err) {
        console.error('Operation failed');
    }
}