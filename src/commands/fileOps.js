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
export async function add(fileName, currentDir) {
    const filePath = path.resolve(currentDir, fileName);

    try {
        await fs.promises.writeFile(filePath, '');
        console.log(`File "${fileName}" created successfully.`);
    } catch (err) {
        console.error('Operation failed');
    }
}
export async function mkdir(dirName, currentDir) {
    const dirPath = path.resolve(currentDir, dirName);

    try {
        await fs.promises.mkdir(dirPath);
        console.log(`Directory "${dirName}" created successfully.`);
    } catch (err) {
        console.error('Operation failed');
    }
}