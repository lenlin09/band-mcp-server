import { spawn } from 'child_process';

async function testMCPServer() {
  const server = spawn('node', ['dist/index.js']);
  
  // 测试获取工具列表
  const listToolsRequest = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {}
  }) + '\n';
  
  // 测试调用hello_world工具
  const callToolRequest = JSON.stringify({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "hello_world",
      arguments: { name: "测试用户" }
    }
  }) + '\n';
  
  server.stdout.on('data', (data) => {
    console.log('响应:', data.toString());
  });
  
  server.stderr.on('data', (data) => {
    console.log('日志:', data.toString());
  });
  
  // 发送请求
  setTimeout(() => {
    server.stdin.write(listToolsRequest);
  }, 100);
  
  setTimeout(() => {
    server.stdin.write(callToolRequest);
  }, 200);
  
  setTimeout(() => {
    server.kill();
  }, 1000);
}

testMCPServer();