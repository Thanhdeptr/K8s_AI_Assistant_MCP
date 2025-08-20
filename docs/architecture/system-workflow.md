# 🔄 System Workflow - Simplified

## 🎯 Combined Workflow: FE → Tool Call → FE

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Complete Workflow Cycle                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │    User     │───►│  Frontend   │───►│  Backend    │───►│   Ollama    │───►│   MCP       │  │
│  │   Types     │    │  (Vue.js)   │    │(Express.js) │    │ (AI Model)  │    │  Server     │  │
│  │   Prompt    │    │             │    │             │    │             │    │ (kubectl)   │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                                                                 │
│                                                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │    User     │◄───│  Frontend   │◄───│  Backend    │◄───│   Ollama    │◄───│   MCP       │  │
│  │   Sees      │    │  (Vue.js)   │    │(Express.js) │    │ (AI Model)  │    │  Server     │  │
│  │  Response   │    │             │    │             │    │             │    │ (kubectl)   │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│                                                                                                 │
│                                           │                                                    │
│                                           ▼                                                    │
│                                    ┌─────────────┐                                            │
│                                    │ Kubernetes  │                                            │
│                                    │  Cluster    │                                            │
│                                    │             │                                            │
│                                    │ • Pods      │                                            │
│                                    │ • Services  │                                            │
│                                    │ • Deployments│                                           │
│                                    └─────────────┘                                            │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## 🔧 Tools & Connections

### Core Tools

| Component | Tool | Purpose | Protocol |
|-----------|------|---------|----------|
| **Frontend** | Vue.js Chat Widget | User Interface | HTTP REST |
| **Backend** | Express.js API | Tool Mapping & Formatting | HTTP REST |
| **Ollama** | gpt-oss:20b | AI Processing & Tool Decision | OpenAI API |
| **MCP Server** | kubectl Commands | Kubernetes Operations | JSON-RPC |
| **Kubernetes** | API Server | Resource Management | REST API |

### Connection Flow

```
1. User Input → Frontend (Vue.js)
   Protocol: HTTP POST /api/chat
   Port: 8055

2. Frontend → Backend (Express.js)
   Protocol: HTTP REST API
   Port: 8055

3. Backend → Ollama (AI Model)
   Protocol: OpenAI API
   Port: 11434

4. Ollama → Backend (Tool Decision)
   Protocol: Function Calling
   Format: JSON-RPC

5. Backend → MCP Server
   Protocol: JSON-RPC + SSE
   Port: 3000

6. MCP Server → Kubernetes
   Protocol: kubectl CLI
   Port: 6443

7. Kubernetes → MCP Server
   Protocol: API Response
   Format: JSON

8. MCP Server → Backend
   Protocol: JSON-RPC
   Format: Tool Result

9. Backend → Ollama
   Protocol: OpenAI API
   Format: Tool Result

10. Ollama → Backend
    Protocol: OpenAI API
    Format: Final Response

11. Backend → Frontend
    Protocol: HTTP Response
    Format: JSON

12. Frontend → User
    Protocol: UI Update
    Format: Formatted Display
```

## 🔄 Detailed Step-by-Step Flow

### Phase 1: User Input Processing
```
1. User types prompt in Rancher UI
2. Frontend (Vue.js) sends POST to /api/chat
3. Backend receives request and connects to MCP
4. Backend gets available tools from MCP Server
5. Backend sends prompt + tools to Ollama
```

### Phase 2: AI Processing & Tool Decision
```
6. Ollama processes prompt and decides to call tool
7. Ollama returns tool call decision to Backend
8. Backend maps MCP tools to OpenAI format
9. Backend executes tool call via MCP Server
```

### Phase 3: Kubernetes Operations
```
10. MCP Server executes kubectl command
11. Kubernetes API processes command
12. Kubernetes returns data to MCP Server
13. MCP Server formats and returns results
```

### Phase 4: Response Generation
```
14. Backend receives tool results from MCP
15. Backend sends tool results back to Ollama
16. Ollama processes results and generates final response
17. Ollama returns final response to Backend
```

### Phase 5: User Response Display
```
18. Backend formats response for frontend
19. Backend sends response to Frontend
20. Frontend displays formatted response to user
21. User sees final result in Rancher UI
```

## 🛠️ Key Tools & Their Functions

### Frontend Tools (Vue.js)
- **Chat Widget**: User input handling
- **Table Display**: kubectl output formatting
- **Logs Display**: Container logs visualization
- **Local Storage**: Chat history persistence

### Backend Tools (Express.js)
- **Tool Mapping**: MCP → OpenAI format conversion
- **Response Formatting**: Table/log formatting
- **Session Management**: MCP connection handling
- **Error Handling**: Connection recovery

### Ollama Tools (AI Model)
- **Tool Decision**: When to call external tools
- **Function Calling**: Tool parameter generation
- **Response Generation**: Natural language output
- **Context Management**: Conversation history

### MCP Server Tools (kubectl)
- **kubectl get**: Resource listing
- **kubectl describe**: Resource details
- **kubectl logs**: Container logs
- **kubectl apply**: Resource creation/update
- **kubectl delete**: Resource deletion
- **Helm operations**: Chart management

### Kubernetes Tools (API Server)
- **Resource Management**: Pods, Services, Deployments
- **API Operations**: CRUD operations
- **Authentication**: RBAC enforcement
- **Data Retrieval**: Resource state information

## 🔌 Network Configuration

| Service | Port | Protocol | Purpose |
|---------|------|----------|---------|
| Rancher UI | 8005 | HTTPS | User Interface |
| Backend API | 8055 | HTTP | Express.js Server |
| MCP Server | 3000 | HTTP+SSE | Kubernetes Tools |
| Ollama | 11434 | HTTP | AI Model Inference |
| Kubernetes | 6443 | HTTPS | API Server |

## ⚡ Performance Metrics

| Step | Typical Time | Description |
|------|-------------|-------------|
| User → Frontend | 5-10ms | HTTP request |
| Frontend → Backend | 5-10ms | API call |
| Backend → Ollama | 50-200ms | AI inference |
| Ollama → Backend | 10-20ms | Tool decision |
| Backend → MCP | 20-50ms | JSON-RPC |
| MCP → Kubernetes | 100-500ms | kubectl execution |
| Kubernetes → MCP | 50-100ms | Data retrieval |
| MCP → Backend | 10-20ms | Result formatting |
| Backend → Ollama | 50-200ms | Final processing |
| Ollama → Backend | 10-20ms | Response generation |
| Backend → Frontend | 5-10ms | HTTP response |
| **Total** | **300-1100ms** | **Complete cycle** |

## 🛡️ Error Handling

### Connection Failures
- **MCP Connection**: Auto-reconnect with session recovery
- **Ollama Connection**: Retry with exponential backoff
- **Kubernetes Connection**: kubectl context validation

### Tool Execution Errors
- **Invalid Commands**: Parameter validation
- **Permission Errors**: RBAC check before execution
- **Resource Not Found**: Graceful error messages

### Frontend Errors
- **Network Timeout**: User-friendly error display
- **Invalid Response**: Fallback to text display
- **Session Expiry**: Automatic reconnection

This simplified workflow shows the complete cycle from user input through AI processing, tool execution, and back to user response display.