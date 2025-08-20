# 🚀 Setup Instructions

Hướng dẫn cài đặt và chạy K8s AI Assistant MCP Server và Backend Server.

## 📋 Prerequisites

- Node.js 16+ (khuyến nghị Node.js 16.20.2)
- Kubernetes cluster với kubectl đã cấu hình
- Ollama server (cho AI model)
- KUBECONFIG_PATH trỏ đến file config của cluster

## 🔧 Cài đặt

### 1. Clone Repository

```bash
git clone https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP.git
cd K8s_AI_Assistant_MCP
```

### 2. Cài đặt Dependencies

```bash
# Cài đặt MCP Server
cd mcp-server-kubernetes
npm install
npm run build

# Cài đặt Backend Server (nếu có)
cd ../backend-server
npm install
```

## 🚀 Chạy MCP Server

### Cách 1: Chạy trực tiếp

```bash
cd mcp-server-kubernetes/dist

# Chạy với cấu hình cơ bản
KUBECONFIG_PATH=/home/hatthanh/.kube/config \
ENABLE_UNSAFE_SSE_TRANSPORT=true \
HOST=0.0.0.0 \
node index.js
```

### Cách 2: Chạy với script

```bash
# Tạo script chạy
cat > run-mcp-server.sh << 'EOF'
#!/bin/bash
export KUBECONFIG_PATH=/home/hatthanh/.kube/config
export ENABLE_UNSAFE_SSE_TRANSPORT=true
export HOST=0.0.0.0

cd mcp-server-kubernetes/dist
node index.js
EOF

chmod +x run-mcp-server.sh
./run-mcp-server.sh
```

### Output mong đợi:

```
SSE server started
✅ MCP-kubernetes-server is listening on port 3000
❓ Use the following url to connect to the server:
   http://0.0.0.0:3000/sse
❓ Resume: http://0.0.0.0:3000/sse?sessionId=<existing-session-id>
♾️ Sessions never expire - manual reconnect required when disconnected
```

## 🌐 Chạy Backend Server

### Cách chạy Backend Server:

```bash
cd backend-server
node server.js
```

### Output mong đợi:

```
API chạy: http://0.0.0.0:8055
Ollama baseURL: http://192.168.10.32:11434/v1 | MODEL: gpt-oss:20b
MCP base: http://192.168.10.18:3000 (HTTP + SSE)

Flow: GET /sse - nhận "event: endpoint" -> POST JSON-RPC vào /messages?sessionId=...
connect() called sessionPath: null, connectionState: disconnected, sessionId: null
Creating new MCP SSE connection to: http://192.168.10.18:3000
Extracted session ID: 5d8d61f7-0587-4e8a-95f8-75e7d7691ce0

MCP RPC (attempt 1): initialize to http://192.168.10.18:3000/messages?sessionId=5d8d61f7-0587-4e8a-95f8-75e7d7691ce0
About to send POST to: http://192.168.10.18:3000/messages?sessionId=5d8d61f7-0587-4e8a-95f8-75e7d7691ce0
POST response status: 202
MCP RPC sent successfully, waiting for SSE response...

MCP session endpoint: /messages?sessionId=5d8d61f7-0587-4e8a-95f8-75e7d7691ce0

Loaded Tools from MCP:
- 'cleanup'
- 'kubectl_describe'
- 'kubectl_delete'
- 'kubectl_logs'
- 'kubectl_patch'
- 'kubectl_context'
- 'kubectl_get'
- 'kubectl_apply'
- 'kubectl_create'
- 'kubectl_scale'
- 'kubectl_rollout'
- 'explain_resource'
- 'install_helm_chart'
- 'upgrade_helm_chart'
- 'uninstall_helm_chart'
- 'port_forward'
- 'stop_port_forward'
- 'exec_in_pod'
- 'list_api_resources'
- 'kubectl_generic'
- 'ping'
```

## ⚙️ Cấu hình

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `KUBECONFIG_PATH` | Đường dẫn đến file kubeconfig | `/home/hatthanh/.kube/config` |
| `ENABLE_UNSAFE_SSE_TRANSPORT` | Bật SSE transport | `true` |
| `HOST` | Host để bind server | `0.0.0.0` |
| `PORT` | Port cho MCP server | `3000` |
| `OLLAMA_BASE_URL` | URL của Ollama server | `http://192.168.10.32:11434/v1` |
| `OLLAMA_MODEL` | Model AI sử dụng | `gpt-oss:20b` |

### Cấu hình Ollama

1. **Cài đặt Ollama:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

2. **Pull model:**
```bash
ollama pull gpt-oss:20b
```

3. **Chạy Ollama server:**
```bash
ollama serve
```

## 🔗 Kết nối

### MCP Server Endpoints

- **SSE Endpoint:** `http://0.0.0.0:3000/sse`
- **Resume Session:** `http://0.0.0.0:3000/sse?sessionId=<session-id>`

### Backend Server Endpoints

- **API Base:** `http://0.0.0.0:8055`
- **MCP Connection:** `http://192.168.10.18:3000`

## 🛠️ Troubleshooting

### Lỗi thường gặp:

1. **KUBECONFIG_PATH không tìm thấy:**
```bash
export KUBECONFIG_PATH=/path/to/your/kubeconfig
```

2. **Ollama server không kết nối được:**
```bash
# Kiểm tra Ollama đang chạy
curl http://192.168.10.32:11434/v1/models

# Restart Ollama nếu cần
sudo systemctl restart ollama
```

3. **Port đã được sử dụng:**
```bash
# Kiểm tra port đang sử dụng
netstat -tulpn | grep :3000

# Kill process nếu cần
kill -9 <PID>
```

4. **MCP connection failed:**
```bash
# Kiểm tra MCP server đang chạy
curl http://0.0.0.0:3000/sse

# Restart MCP server
pkill -f "node index.js"
```

## 📝 Logs

### MCP Server Logs
```bash
# Xem logs real-time
tail -f mcp-server-kubernetes/logs/mcp-server.log

# Xem logs với timestamp
journalctl -u mcp-server -f
```

### Backend Server Logs
```bash
# Xem logs real-time
tail -f backend-server/logs/server.log

# Xem logs với timestamp
journalctl -u backend-server -f
```

## 🔄 Auto-restart với PM2

### Cài đặt PM2:
```bash
npm install -g pm2
```

### Tạo PM2 config:
```bash
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'mcp-server',
      script: 'mcp-server-kubernetes/dist/index.js',
      cwd: './',
      env: {
        KUBECONFIG_PATH: '/home/hatthanh/.kube/config',
        ENABLE_UNSAFE_SSE_TRANSPORT: 'true',
        HOST: '0.0.0.0',
        PORT: '3000'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'backend-server',
      script: 'backend-server/server.js',
      cwd: './',
      env: {
        PORT: '8055',
        OLLAMA_BASE_URL: 'http://192.168.10.32:11434/v1',
        OLLAMA_MODEL: 'gpt-oss:20b'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
};
EOF
```

### Chạy với PM2:
```bash
# Start tất cả services
pm2 start ecosystem.config.js

# Xem status
pm2 status

# Xem logs
pm2 logs

# Restart services
pm2 restart all

# Stop services
pm2 stop all
```

## ✅ Kiểm tra hoạt động

### Test MCP Server:
```bash
# Test SSE connection
curl http://0.0.0.0:3000/sse

# Test kubectl tools
curl -X POST http://0.0.0.0:3000/messages \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}'
```

### Test Backend Server:
```bash
# Test API health
curl http://0.0.0.0:8055/health

# Test Ollama connection
curl http://0.0.0.0:8055/api/ollama/status
```

---

**🎯 Lưu ý:** Đảm bảo tất cả services (Ollama, MCP Server, Backend Server) đều đang chạy trước khi sử dụng K8s AI Assistant!