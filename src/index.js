import { startCLI } from './cli.js';
console.log('Received arguments:', process.argv);
const args = process.argv.slice(2);
console.log('Received arguments:', process.argv);
console.log('Received arguments:', args);

const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';


startCLI(username);