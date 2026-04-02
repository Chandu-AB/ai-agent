import readline from "readline";
import { runAgent } from "./agent/ollamaAgent.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ask AI: ", async (input) => {
  await runAgent(input);
  rl.close();
});