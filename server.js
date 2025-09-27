// 简单的HTTP服务器来托管寻宝游戏
const http = require('http');
const fs = require('fs');
const path = require('path');

// 服务器配置
const PORT = 3000;
const HOST = 'localhost';

// MIME类型映射
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain'
};

// 创建服务器
const server = http.createServer((req, res) => {
    console.log(`请求: ${req.url}`);
    
    // 确定要提供的文件路径
    let filePath = '.' + req.url;
    
    // 如果请求根路径，则提供index.html
    if (filePath === './') {
        filePath = './treasure_game.html';
    }
    
    // 确定文件扩展名
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // 读取文件并发送响应
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // 文件不存在，返回404错误
                fs.readFile('./404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // 其他错误，返回500错误
                res.writeHead(500);
                res.end(`服务器错误: ${error.code}`);
                res.end();
            }
        } else {
            // 成功读取文件，发送响应
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// 启动服务器
server.listen(PORT, HOST, () => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] 寻宝游戏服务器已启动！`);
    console.log(`[${timestamp}] 请在浏览器中访问 http://${HOST}:${PORT}`);
    console.log(`[${timestamp}] 按 Ctrl+C 停止服务器`);
});

// 处理服务器错误
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`端口 ${PORT} 已被占用，请关闭其他占用该端口的应用程序，或修改server.js中的PORT变量`);
    } else {
        console.error('服务器启动失败:', error);
    }
});

// 创建404页面
fs.writeFile('./404.html', `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面未找到 - 寻宝冒险记</title>
    <style>
        body {
            font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2rem;
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #f39c12, #e74c3c);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            color: #b0b0b0;
        }
        
        a {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: bold;
            text-decoration: none;
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
            border-radius: 50px;
            transition: all 0.3s ease;
        }
        
        a:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }
    </style>
</head>
<body>
    <h1>404</h1>
    <p>抱歉，您寻找的页面不存在...</p>
    <a href="/">返回寻宝游戏</a>
</body>
</html>
`, (err) => {
    if (err) {
        console.log('创建404页面时出错:', err);
    }
});

// 为了方便用户启动，创建一个简单的启动脚本提示
fs.writeFile('./start_game.bat', `@echo off
node server.js
pause`, (err) => {
    if (err) {
        console.log('创建启动脚本时出错:', err);
    } else {
        console.log('已创建启动脚本 start_game.bat，双击即可启动游戏服务器');
    }
});