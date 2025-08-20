# 🔗 Connection Diagram & Workflow

## 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    K8s AI Assistant System                                        │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                    User Interface Layer                                      │  │
│  │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────────────┐  │  │
│  │  │   Rancher UI    │    │   Vue.js Chat   │    │           Browser Client                │  │  │
│  │  │   Extensions    │    │   Widget        │    │                                         │  │  │
│  │  │                 │    │                 │    │                                         │  │  │
│  │  │ • Dashboard     │    │ • Chat Interface│    │ • HTTPS: 8005                          │  │  │
│  │  │ • Extensions    │    │ • Table Display │    │ • WebSocket Support                    │  │  │
│  │  │ • Navigation    │    │ • Logs Display  │    │ • Local Storage                        │  │  │
│  │  └─────────────────┘    └─────────────────┘    └─────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                           │                                                      │
│                                           │ HTTPS: 8005                                          │
│                                           ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                    Backend Layer                                             │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    Express.js Server (Port: 8055)                                       │  │  │
│  │  │                                                                                         │  │  │
│  │  │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────────┐  │  │  │
│  │  │  │   HTTP API      │    │   SSE Client    │    │           Tool Mapping              │  │  │  │
│  │  │  │   Endpoints     │    │   (MCP)         │    │                                       │  │  │  │
│  │  │  │                 │    │                 │    │                                       │  │  │  │
│  │  │  │ • /api/chat     │    │ • Session Mgmt  │    │ • MCP → OpenAI Tools                │  │  │  │
│  │  │  │ • /health       │    │ • JSON-RPC      │    │ • Response Formatting               │  │  │  │
│  │  │  │ • /api/mcp/     │    │ • Reconnection  │    │ • Error Handling                    │  │  │  │
│  │  │  └─────────────────┘    └─────────────────┘    └─────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                           │                                                      │
│                                           │ HTTP: 11434                                          │
│                                           ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                    AI Model Layer                                            │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                        Ollama Server (Port: 11434)                                      │  │  │
│  │  │                                                                                         │  │  │
│  │  │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────────┐  │  │  │
│  │  │  │   gpt-oss:20b   │    │   Tool Calling  │    │           OpenAI API                │  │  │  │
│  │  │  │   Model         │    │   Engine        │    │           Compatibility              │  │  │  │
│  │  │  │                 │    │                 │    │                                       │  │  │  │
│  │  │  │ • 20B Parameters│    │ • Function Call │    │ • OpenAI Format                     │  │  │  │
│  │  │  │ • Local Inference│   │ • JSON-RPC      │    │ • Chat Completions                  │  │  │  │
│  │  │  │ • Fast Response │    │ • Context Mgmt  │    │ • Tool Integration                   │  │  │  │
│  │  │  └─────────────────┘    └─────────────────┘    └─────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                           │                                                      │
│                                           │ HTTP+SSE: 3000                                       │
│                                           ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                    MCP Server Layer                                          │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    MCP Server (Port: 3000)                                              │  │  │
│  │  │                                                                                         │  │  │
│  │  │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────────┐  │  │  │
│  │  │  │   SSE Server    │    │   kubectl       │    │           Helm Operations           │  │  │  │
│  │  │  │   (Session)     │    │   Commands      │    │                                       │  │  │  │
│  │  │  │                 │    │                 │    │                                       │  │  │  │
│  │  │  │ • /sse          │    │ • get           │    │ • install                            │  │  │  │
│  │  │  │ • Session Mgmt  │    │ • describe      │    │ • upgrade                            │  │  │  │
│  │  │  │ • JSON-RPC      │    │ • logs          │    │ • uninstall                          │  │  │  │
│  │  │  └─────────────────┘    └─────────────────┘    └─────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                           │                                                      │
│                                           │ kubectl CLI                                          │
│                                           ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                                    Kubernetes Layer                                          │  │
│  │  ┌─────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │  │                        Kubernetes Cluster                                                │  │  │
│  │  │                                                                                         │  │  │
│  │  │  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────────────────┐  │  │  │
│  │  │  │   API Server    │    │   Resources     │    │           Services                  │  │  │  │
│  │  │  │   (Port: 6443)  │    │   Management    │    │                                       │  │  │  │
│  │  │  │                 │    │                 │    │                                       │  │  │  │
│  │  │  │ • REST API      │    │ • Pods          │    │ • Load Balancer                     │  │  │  │
│  │  │  │ • Authentication│    │ • Deployments   │    │ • NodePort                           │  │  │  │
│  │  │  │ • Authorization │    │ • Services      │    │ • ClusterIP                          │  │  │  │
│  │  │  └─────────────────┘    └─────────────────┘    └─────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────────────────────────────────────────┘  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Detailed Workflow Sequence

### 1. User Prompt Processing Flow

```
┌─────────────┐    1. User Input     ┌─────────────┐
│             │─────────────────────►│             │
│    User     │                      │  Frontend   │
│             │                      │  (Vue.js)   │
│             │                      │             │
└─────────────┘                      └─────────────┘
                                              │
                                              │ 2. HTTP POST
                                              │ /api/chat
                                              ▼
┌─────────────┐    6. Formatted      ┌─────────────┐
│             │◄─────────────────────│             │
│    User     │     Response         │  Frontend   │
│             │                      │  (Vue.js)   │
│             │                      │             │
└─────────────┘                      └─────────────┘
                                              ▲
                                              │ 5. HTTP Response
                                              │ JSON
                                              │
┌─────────────┐    4. Final          ┌─────────────┐
│             │◄─────────────────────│             │
│  Backend    │     Response         │  Backend    │
│ (Express.js)│                      │ (Express.js)│
│             │                      │             │
└─────────────┘                      └─────────────┘
       ▲                                      │
       │ 3. Tool Results                      │ 3. AI Response
       │                                      │
┌─────────────┐    3. Tool Calls     ┌─────────────┐
│             │◄─────────────────────│             │
│   Ollama    │                      │   Ollama    │
│ (AI Model)  │                      │ (AI Model)  │
│             │                      │             │
└─────────────┘                      └─────────────┘
       ▲                                      ▲
       │ 2. Tool Results                      │ 2. Tool Decisions
       │                                      │
┌─────────────┐    2. kubectl        ┌─────────────┐
│             │◄─────────────────────│             │
│ MCP Server  │     Results          │ MCP Server  │
│             │                      │             │
└─────────────┘                      └─────────────┘
       ▲                                      │
       │ 1. kubectl Commands                  │ 1. Tool Execution
       │                                      │
┌─────────────┐                      ┌─────────────┐
│             │                      │             │
│ Kubernetes  │                      │ Kubernetes  │
│  Cluster    │                      │  Cluster    │
│             │                      │             │
└─────────────┘                      └─────────────┘
```

### 2. Tool Calling Workflow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              Tool Calling Process                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  1. User: "Show me all pods"                                                    │
│     │                                                                           │
│     ▼                                                                           │
│  2. Frontend → Backend: POST /api/chat                                          │
│     │                                                                           │
│     ▼                                                                           │
│  3. Backend → Ollama: OpenAI API call with tools                               │
│     │                                                                           │
│     ▼                                                                           │
│  4. Ollama decides: "I need to call kubectl_get"                               │
│     │                                                                           │
│     ▼                                                                           │
│  5. Backend → MCP: JSON-RPC tools/call                                          │
│     │                                                                           │
│     ▼                                                                           │
│  6. MCP → Kubernetes: kubectl get pods --output=json                           │
│     │                                                                           │
│     ▼                                                                           │
│  7. Kubernetes → MCP: JSON pod list                                             │
│     │                                                                           │
│     ▼                                                                           │
│  8. MCP → Backend: Tool result                                                  │
│     │                                                                           │
│     ▼                                                                           │
│  9. Backend → Ollama: Tool result                                               │
│     │                                                                           │
│     ▼                                                                           │
│ 10. Ollama → Backend: Final formatted response                                  │
│     │                                                                           │
│     ▼                                                                           │
│ 11. Backend → Frontend: Formatted table response                                │
│     │                                                                           │
│     ▼                                                                           │
│ 12. Frontend → User: Display formatted table                                    │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🔌 Connection Protocols & Ports

### Network Configuration

| Component | Port | Protocol | Purpose | Example URL |
|-----------|------|----------|---------|-------------|
| **Frontend** | 8005 | HTTPS | Rancher UI Extensions | `https://192.168.10.18:8005` |
| **Backend** | 8055 | HTTP | Express.js API | `http://0.0.0.0:8055` |
| **MCP Server** | 3000 | HTTP+SSE | Kubernetes tools | `http://192.168.10.18:3000` |
| **Ollama** | 11434 | HTTP | AI model inference | `http://192.168.10.32:11434` |
| **Kubernetes** | 6443 | HTTPS | API server | `https://kubernetes:6443` |

### Data Flow Protocols

```
┌─────────────────┐  HTTP REST API  ┌─────────────────┐
│   Frontend      │◄────────────────►│    Backend      │
│   (Vue.js)      │  Port: 8055     │  (Express.js)   │
└─────────────────┘                 └─────────────────┘
                                              │
                                              │ OpenAI API
                                              │ Port: 11434
                                              ▼
┌─────────────────┐  HTTP+SSE       ┌─────────────────┐
│   MCP Server    │◄────────────────►│    Ollama       │
│  (K8s Tools)    │  Port: 3000     │  (AI Model)     │
└─────────────────┘                 └─────────────────┘
       │
       │ kubectl CLI
       ▼
┌─────────────────┐
│   Kubernetes    │
│    Cluster      │
└─────────────────┘
```

## 🔧 Tool Mapping & Execution

### MCP Tools → OpenAI Tools Conversion

```javascript
// Original MCP Tools
const mcpTools = [
  {
    name: "kubectl_get",
    description: "Get Kubernetes resources",
    inputSchema: {
      type: "object",
      properties: {
        resource: { type: "string" },
        namespace: { type: "string" }
      }
    }
  }
];

// Converted to OpenAI Format
const openaiTools = [
  {
    type: "function",
    function: {
      name: "kubectl_get",
      description: "Get Kubernetes resources",
      parameters: {
        type: "object",
        properties: {
          resource: { type: "string" },
          namespace: { type: "string" }
        }
      }
    }
  }
];
```

### Tool Execution Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Ollama        │───►│   Backend       │───►│   MCP Server    │
│  (AI Model)     │    │  (Tool Mapping) │    │  (kubectl)      │
│                 │    │                 │    │                 │
│ • Decides tool  │    │ • Maps OpenAI   │    │ • Executes      │
│ • Calls function│    │   to MCP        │    │   kubectl cmd   │
│ • Sends params  │    │ • JSON-RPC      │    │ • Returns JSON  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   Kubernetes    │
                                              │    Cluster      │
                                              │                 │
                                              │ • API Server    │
                                              │ • Resources     │
                                              │ • Data          │
                                              └─────────────────┘
```

## 🔄 Session Management

### MCP Session Lifecycle

```
1. Initial Connection
   ┌─────────────────┐    GET /sse    ┌─────────────────┐
   │   Backend       │───────────────►│   MCP Server    │
   │  (SSE Client)   │                │                 │
   └─────────────────┘                └─────────────────┘
                                              │
                                              │ SSE Events
                                              ▼
   ┌─────────────────┐    event: endpoint    ┌─────────────────┐
   │   Backend       │◄──────────────────────│   MCP Server    │
   │  (SSE Client)   │                       │                 │
   └─────────────────┘                       └─────────────────┘

2. Session Established
   ┌─────────────────┐    POST /messages?sessionId=...    ┌─────────────────┐
   │   Backend       │──────────────────────────────────►│   MCP Server    │
   │  (JSON-RPC)     │                                    │                 │
   └─────────────────┘                                    └─────────────────┘

3. Session Recovery
   ┌─────────────────┐    GET /sse?sessionId=...    ┌─────────────────┐
   │   Backend       │────────────────────────────►│   MCP Server    │
   │  (Recovery)     │                              │                 │
   └─────────────────┘                              └─────────────────┘
```

## 🛡️ Error Handling & Recovery

### Connection Recovery Strategy

```
┌─────────────────┐
│   Error Occurs  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Check Error    │
│     Type        │
└─────────────────┘
         │
         ▼
┌─────────────────┐    Yes    ┌─────────────────┐
│ Session Error?  │──────────►│   Reconnect     │
└─────────────────┘           │   Attempt       │
         │ No                 └─────────────────┘
         ▼                           │
┌─────────────────┐                  ▼
│  Throw Error    │           ┌─────────────────┐
└─────────────────┘           │  Max Attempts   │
                              │   Reached?      │
                              └─────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │  Reset Session  │
                              │   & Retry       │
                              └─────────────────┘
```

### Frontend Error Handling

```javascript
// Error handling in frontend
try {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify(messages)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const data = await response.json();
  // Process successful response
  
} catch (error) {
  if (error.name === 'AbortError') {
    // User cancelled request
    return;
  }
  
  // Display error to user
  this.messages.push({
    role: "bot",
    text: `❌ Lỗi kết nối: ${error.message}`
  });
}
```

## 📊 Performance & Scalability

### Response Time Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│                    Response Time Analysis                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Frontend → Backend:        ~5-10ms    (HTTP request)           │
│ Backend → Ollama:          ~50-200ms  (AI inference)           │
│ Ollama → Backend:          ~10-20ms   (tool decision)          │
│ Backend → MCP:             ~20-50ms   (JSON-RPC)               │
│ MCP → Kubernetes:          ~100-500ms (kubectl execution)      │
│ Kubernetes → MCP:          ~50-100ms  (data retrieval)         │
│ MCP → Backend:             ~10-20ms   (result formatting)      │
│ Backend → Ollama:          ~50-200ms  (final processing)       │
│ Ollama → Backend:          ~10-20ms   (response generation)    │
│ Backend → Frontend:        ~5-10ms    (HTTP response)          │
│                                                                 │
│ Total Response Time:       ~300-1100ms                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Scalability Considerations

- **Frontend**: Stateless, can scale horizontally
- **Backend**: Stateless API, can use load balancer
- **Ollama**: Model inference, can scale with GPU resources
- **MCP Server**: Stateful (sessions), consider clustering
- **Kubernetes**: Native clustering support

This architecture provides a robust, scalable system for AI-powered Kubernetes management with real-time tool execution and user-friendly interface.