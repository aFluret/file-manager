// src/commands/osInfo.js
import os from 'os';

export function handleOSCommand(args) {
    const [command] = args;

    switch (command) {
        case '--EOL':
            console.log(`Default system EOL: ${JSON.stringify(os.EOL)}`);
            break;

        case '--cpus':
            const cpus = os.cpus();
            console.log(`Total CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: ${cpu.model}, Clock rate: ${cpu.speed / 1000} GHz`);
            });
            break;

        case '--homedir':
            console.log(`Home directory: ${os.homedir()}`);
            break;

        case '--username':
            console.log(`Current system user: ${os.userInfo().username}`);
            break;

        case '--architecture':
            console.log(`CPU architecture: ${os.arch()}`);
            break;

        default:
            console.log('Invalid input');
    }
}