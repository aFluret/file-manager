import * as nwd from './nwd.js';
import * as fileOps from './fileOps.js';
import * as osInfo from './osInfo.js';
import * as hash from './hash.js';
import * as compress from './compress.js';

export async function startFileManager(command, currentDir, username, updateDir) {
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd) {
        case 'up':
            await nwd.up(currentDir, updateDir);
            break;

        case 'cd':
            await nwd.cd(args[0], currentDir, updateDir);
            break;

        case 'ls':
            await nwd.ls(currentDir);
            break;

        case 'cat':
            await fileOps.cat(args[0], currentDir);
            break;

        case 'add':
            await fileOps.add(args[0], currentDir);
            break;

        case 'mkdir':
            await fileOps.mkdir(args[0], currentDir);
            break;

        case 'rn':
            await fileOps.rn(args[0], args[1], currentDir);
            break;

        case 'cp':
            await fileOps.cp(args[0], args[1], currentDir);
            break;

        case 'mv':
            await fileOps.mv(args[0], args[1], currentDir);
            break;

        case 'rm':
            await fileOps.rm(args[0], currentDir);
            break;

        case 'os':
            await osInfo.handleOSCommand(args);
            break;

        case 'hash':
            await hash.calculateHash(args[0], currentDir);
            break;

        case 'compress':
            await compress.compress(args[0], args[1], currentDir);
            break;

        case 'decompress':
            await compress.decompress(args[0], args[1], currentDir);
            break;

        default:
            console.log('Invalid input');
    }
}