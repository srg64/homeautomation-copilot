import { basename } from "node:path"; // Verifies Node.js type definitions work

const greeting: string = `Hello, TypeScript with Node.js! Basename: ${basename("./src/index.ts")}`;
console.log(greeting);
