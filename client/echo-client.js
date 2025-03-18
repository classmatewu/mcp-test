import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server/echo-server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
  }
);

await client.connect(transport);

console.log('connect success');

// List prompts
const prompts = await client.listPrompts();
console.log('=== prompts:', prompts);

// // Get a prompt
// const prompt = await client.getPrompt("echo", {
//   arg1: "value"
// });
// console.log('=== prompt:', prompt);

// // List resources
// const resources = await client.listResources();
// console.log('=== resources:', resources);

// // Read a resource
// const resource = await client.readResource("file:///example.txt");
// console.log('=== resource:', resource);

// Call a tool
const toolResult = await client.callTool({
  name: "echo",
  arguments: {
    message: "Hello~"
  }
});
console.log('=== toolResult:', toolResult);
