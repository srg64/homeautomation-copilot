import "dotenv/config";
import { basename } from "node:path"; // Verifies Node.js type definitions work

import { measurements, schema } from "./constants.js";

export { measurements, schema };

const greeting: string = `Hello, TypeScript with Node.js! Basename: ${basename("./src/app.ts")}`;
console.log(greeting);
