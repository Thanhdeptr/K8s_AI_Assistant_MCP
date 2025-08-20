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

This simplified workflow shows the complete cycle from user input through AI processing, tool execution, and back to user response display.