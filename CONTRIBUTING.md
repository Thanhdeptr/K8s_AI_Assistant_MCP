# Contributing to K8s AI Assistant MCP

Thank you for your interest in contributing to K8s AI Assistant MCP! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork and Clone

1. Fork the repository to your GitHub account
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/K8s_AI_Assistant_MCP.git
cd K8s_AI_Assistant_MCP
```

### 2. Set Up Development Environment

#### Prerequisites
- Node.js 18+ and npm/bun
- Kubernetes cluster (local or remote)
- kubectl configured
- Rancher Manager (for UI extensions)

#### Installation
```bash
# Install MCP Server dependencies
cd mcp-server-kubernetes
npm install

# Install Rancher UI dependencies
cd ../rancher-ui
npm install
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

- Follow the coding standards below
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 5. Commit Your Changes

Use conventional commit messages:
```bash
git commit -m "feat: add new kubectl command support"
git commit -m "fix: resolve port forwarding issue"
git commit -m "docs: update installation guide"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- Clear description of changes
- Reference to any related issues
- Screenshots for UI changes
- Test results

## 📋 Development Guidelines

### Code Standards

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

#### Testing
- Write unit tests for all new functionality
- Maintain test coverage above 80%
- Use descriptive test names
- Mock external dependencies

#### Documentation
- Update README.md for user-facing changes
- Add inline comments for complex logic
- Update API documentation
- Include usage examples

### Project Structure

```
K8s_AI_Assistant_MCP/
├── mcp-server-kubernetes/     # MCP Server backend
│   ├── src/                   # Source code
│   ├── tests/                 # Unit tests
│   ├── dist/                  # Built artifacts
│   └── package.json           # Dependencies
├── rancher-ui/               # Rancher UI extensions
│   ├── pkg/                  # Extension packages
│   ├── charts/               # Helm charts
│   ├── assets/               # Extension assets
│   └── package.json          # Dependencies
├── docs/                     # Documentation
├── .github/                  # GitHub workflows
└── README.md                 # Project overview
```

### Commit Message Format

Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

Example:
```
feat: add support for custom kubectl contexts

- Add kubectl_context command
- Support multiple cluster management
- Add context switching functionality

Closes #123
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test:all

# Test MCP Server only
cd mcp-server-kubernetes
npm run test

# Test UI extensions only
cd rancher-ui
npm run test

# Run tests with coverage
npm run test:coverage
```

### Manual Testing

1. **MCP Server Testing:**
```bash
cd mcp-server-kubernetes
npm run build
node dist/index.js
```

2. **UI Extension Testing:**
```bash
cd rancher-ui
npm run dev
# Access at http://localhost:3000
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment:**
   - OS and version
   - Node.js version
   - Kubernetes version
   - Rancher version (if applicable)

2. **Steps to Reproduce:**
   - Clear, step-by-step instructions
   - Expected vs actual behavior

3. **Additional Information:**
   - Error messages and logs
   - Screenshots (for UI issues)
   - Configuration files

## 💡 Feature Requests

When requesting features:

1. **Describe the Problem:**
   - What problem does this solve?
   - Who would benefit from this?

2. **Propose a Solution:**
   - How should this work?
   - Any implementation ideas?

3. **Consider Alternatives:**
   - Are there existing solutions?
   - Could this be implemented differently?

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] No sensitive data in commits

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] No regression issues

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective
- [ ] New and existing unit tests pass locally
```

## 🏷️ Release Process

### Versioning

We follow semantic versioning (SemVer):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backward compatible)
- **PATCH** version for backward compatible bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changelog is updated
- [ ] Version numbers are updated
- [ ] Release notes are written
- [ ] GitHub release is created

## 📞 Getting Help

- **Issues:** [GitHub Issues](https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP/issues)
- **Discussions:** [GitHub Discussions](https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP/discussions)
- **Documentation:** [Wiki](https://github.com/Thanhdeptr/K8s_AI_Assistant_MCP/wiki)

## 🙏 Acknowledgments

Thank you to all contributors who help make this project better!

---

**Happy contributing! 🚀**