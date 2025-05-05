import readline from 'readline';
import path from 'path';
import fs from 'fs';
import { startFileManager } from './commands/index.js';

export function startCLI(username) {
    console.log(`Welcome to the File Manager, ${username}!`);

    let currentDir = process.cwd();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = () => {
        console.log(`You are currently in ${currentDir}`);
        rl.question('> ', async (input) => {
            if (input.trim() === '.exit') {
                rl.close();
                return;
            }

            try {
                await startFileManager(input, currentDir, username, (newDir) => {
                    currentDir = newDir;
                });
            } catch (e) {
                console.log('Operation failed');
            }

            ask();
        });
    };

    ask();

    rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    });
}