import fs from 'fs';
import { createReadStream, createWriteStream } from 'fs';
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
export async function rn(oldPath, newPath, currentDir) {
    const oldFullPath = path.resolve(currentDir, oldPath);
    const newFullPath = path.resolve(currentDir, newPath);

    try {
        await fs.promises.rename(oldFullPath, newFullPath);
        console.log(`"${oldPath}" renamed to "${newPath}" successfully.`);
    } catch (err) {
        console.error('Operation failed');
    }
}
export async function cp(sourcePath, destinationPath, currentDir) {
    const sourceFullPath = path.resolve(currentDir, sourcePath);
    const destinationFullPath = path.resolve(currentDir, destinationPath);

    try {
        const readStream = createReadStream(sourceFullPath);
        const writeStream = createWriteStream(destinationFullPath);

        readStream.pipe(writeStream);

        readStream.on('error', () => console.error('Operation failed'));
        writeStream.on('error', () => console.error('Operation failed'));
        writeStream.on('finish', () => console.log('File copied successfully.'));
    } catch (err) {
        console.error('Operation failed');
    }
}
export async function mv(sourcePath, destinationPath, currentDir) {
    try {
        await cp(sourcePath, destinationPath, currentDir); // Копируем файл
        await rm(sourcePath, currentDir); // Удаляем исходный файл
        console.log('File moved successfully.');
    } catch (err) {
        console.error('Operation failed');
    }
}
export async function rm(filePath, currentDir) {
    const fullPath = path.resolve(currentDir, filePath);

    try {
        await fs.promises.unlink(fullPath);
        console.log(`File "${filePath}" deleted successfully.`);
    } catch (err) {
        console.error('Operation failed');
    }
}