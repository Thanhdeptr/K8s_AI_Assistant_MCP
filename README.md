# 🚀 K8s AI Assistant MCP

A comprehensive Kubernetes management solution combining **MCP (Model Context Protocol) Server** and **Rancher UI Extensions** for intelligent, AI-powered Kubernetes cluster management.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Components](#components)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## 🎯 Overview

This project integrates two powerful technologies to create a seamless Kubernetes management experience:

1. **MCP Server for Kubernetes** - AI-powered command interface for Kubernetes operations
2. **Rancher UI Extensions** - Visual interface extensions for Rancher management platform

The combination provides both command-line AI assistance and visual management capabilities through a unified interface.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    K8s AI Assistant MCP                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────────────────────┐  │
│  │   MCP Server    │    │      Rancher UI Extensions      │  │
│  │   (Backend)     │    │         (Frontend)              │  │
│  │                 │    │                                 │  │
│  │ • kubectl ops   │    │ • Visual dashboards            │  │
│  │ • Helm support  │    │ • Resource management UI       │  │
│  │ • AI diagnosis  │    │ • Real-time monitoring         │  │
│  │ • Port forward  │    │ • Custom extensions            │  │
│  └─────────────────┘    └─────────────────────────────────┘  │
│           │                           │                      │
│           └───────────┬───────────────┘                      │
│                       │                                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              Kubernetes Cluster                         │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │  │
│  │  │   Pods      │ │ Services    │ │   Deployments   │   │  │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘   │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Components

### 1. MCP Server for Kubernetes (`mcp-server-kubernetes/`)

**Forked from:** [Flux159/mcp-server-kubernetes](https://github.com/Flux159/mcp-server-kubernetes/)

The MCP Server provides AI-powered Kubernetes management through natural language commands and automated operations.

#### Key Features:
- **Unified kubectl API** - Complete kubectl command support
- **AI-powered diagnostics** - Automated troubleshooting with `k8s-diagnose`
- **Helm operations** - Chart management and deployment
- **Port forwarding** - Secure access to cluster services
- **Non-destructive mode** - Safe read-only operations
- **Secrets masking** - Security-focused data handling

#### Available Commands:
```bash
# Resource Management
kubectl_get, kubectl_describe, kubectl_create, kubectl_apply
kubectl_delete, kubectl_scale, kubectl_patch, kubectl_rollout

# Monitoring & Debugging
kubectl_logs, port_forward, k8s-diagnose

# Helm Operations
install_helm_chart, upgrade_helm_chart, uninstall_helm_chart

# Context Management
kubectl_context, list_api_resources, explain_resource
```

### 2. Rancher UI Extensions (`rancher-ui/`)

**Forked from:** [rancher/ui-plugin-examples](https://github.com/rancher/ui-plugin-examples)

The Rancher UI Extensions provide visual management interfaces for Kubernetes resources through the Rancher platform.

#### Key Features:
- **Visual dashboards** - Real-time cluster monitoring
- **Resource management UI** - Intuitive resource operations
- **Custom extensions** - Extensible plugin architecture
- **Multi-cluster support** - Manage multiple clusters
- **Role-based access** - Secure access control

#### Extension Types:
- **Clock Extension** - Real-time cluster time display
- **Homepage Extension** - Custom dashboard views
- **CRD Extensions** - Custom resource definitions
- **Node Driver Extensions** - Cloud provider integrations
- **Top-level Product Extensions** - Complete product integrations

## ✨ Features

### AI-Powered Management
- Natural language Kubernetes commands
- Automated troubleshooting and diagnostics
- Intelligent resource recommendations
- Predictive scaling and optimization

### Visual Interface
- Real-time cluster monitoring dashboards
- Drag-and-drop resource management
- Visual pod and service topology
- Interactive log viewing

### Security & Compliance
- Role-based access control (RBAC)
- Secrets management and masking
- Audit logging and compliance reporting
- Secure port forwarding

### Multi-Cluster Support
- Unified management across multiple clusters
- Cross-cluster resource monitoring
- Centralized configuration management
- Cluster health scoring

## 🎬 Demo

### Demo Screenshots

> **📸 Demo Images Placeholder**
> 
> *Coming soon: Screenshots and videos demonstrating the K8s AI Assistant in action*
> 
> **Planned Demo Content:**
> - MCP Server command-line interface
> - Rancher UI extension dashboards
> - AI-powered troubleshooting workflow
> - Multi-cluster management interface
> - Real-time monitoring and alerts
> - Helm chart deployment process
> - Port forwarding and service access
> - Custom extension development

### Interactive Demo

> **🔗 Live Demo Placeholder**
> 
> *Coming soon: Interactive demo environment for hands-on experience*

## 🚀 Installation

### Prerequisites

- Kubernetes cluster (local or remote)
- Node.js 18+ and npm/bun
- kubectl configured with cluster access
- Rancher Manager (for UI extensions)

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP.git
cd K8s_AI_Assistant_MCP
```

2. **Install MCP Server:**
```bash
cd mcp-server-kubernetes
npm install
npm run build
```

3. **Install Rancher UI Extensions:**
```bash
cd ../rancher-ui
npm install
```

4. **Configure Claude Desktop:**
```json
{
  "mcpServers": {
    "k8s-ai-assistant": {
      "command": "node",
      "args": ["/path/to/K8s_AI_Assistant_MCP/mcp-server-kubernetes/dist/index.js"]
    }
  }
}
```

5. **Deploy Rancher Extensions:**
```bash
# Build and package extensions
npm run build
npm run package

# Deploy to Rancher
helm install k8s-ai-extensions ./charts/
```

## 📖 Usage

### MCP Server Commands

```bash
# Get all pods in default namespace
kubectl_get pods

# Describe a specific deployment
kubectl_describe deployment my-app

# Scale a deployment
kubectl_scale deployment my-app --replicas=5

# Diagnose pod issues
k8s-diagnose my-app-pod

# Port forward to a service
port_forward service/my-app-service 8080:80
```

### Rancher UI Extensions

1. **Access Rancher Manager**
2. **Navigate to Extensions**
3. **Install K8s AI Assistant extensions**
4. **Access custom dashboards and tools**

## 🛠️ Development

### Project Structure

```
K8s_AI_Assistant_MCP/
├── mcp-server-kubernetes/     # MCP Server backend
│   ├── src/                   # Source code
│   ├── tests/                 # Unit tests
│   └── dist/                  # Built artifacts
├── rancher-ui/               # Rancher UI extensions
│   ├── pkg/                  # Extension packages
│   ├── charts/               # Helm charts
│   └── assets/               # Extension assets
└── docs/                     # Documentation
```

### Development Setup

1. **MCP Server Development:**
```bash
cd mcp-server-kubernetes
npm run dev          # Development mode with hot reload
npm run test         # Run tests
npm run build        # Build for production
```

2. **Rancher UI Development:**
```bash
cd rancher-ui
npm run dev          # Development server
npm run build        # Build extensions
npm run package      # Package for deployment
```

### Testing

```bash
# Run all tests
npm run test:all

# Test MCP Server only
cd mcp-server-kubernetes && npm run test

# Test UI extensions only
cd rancher-ui && npm run test
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Follow conventional commit messages
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This project builds upon the excellent work of the following open-source projects:

### MCP Server for Kubernetes
- **Original Repository:** [Flux159/mcp-server-kubernetes](https://github.com/Flux159/mcp-server-kubernetes/)
- **Author:** Paras Patel and Suyog Sonwalkar
- **License:** MIT License
- **Description:** MCP Server providing Kubernetes management commands through AI interfaces

### Rancher UI Plugin Examples
- **Original Repository:** [rancher/ui-plugin-examples](https://github.com/rancher/ui-plugin-examples)
- **Author:** Rancher Labs
- **License:** Apache 2.0
- **Description:** Example UI extensions for Rancher management platform

### Key Contributors
- **Flux159** - MCP Server development and maintenance
- **Rancher Labs** - UI extension framework and examples
- **Open Source Community** - Continuous improvements and feedback

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP/discussions)
- **Documentation:** [Wiki](https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP/wiki)

## 🔄 Version History

- **v1.0.0** - Initial release with MCP Server and basic UI extensions
- **v1.1.0** - Enhanced AI diagnostics and monitoring features
- **v1.2.0** - Multi-cluster support and advanced UI components

---

**⭐ Star this repository if you find it useful!**

**🔄 Fork and contribute to make it even better!**