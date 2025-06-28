# Contributing to Unghost Agent

Thank you for your interest in contributing to **Unghost Agent**! We welcome contributions from the community and are excited to see what you'll bring to this AI-powered personalized outreach platform.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [License](#license)

## 🤝 Code of Conduct

By participating in this project, you are expected to uphold our code of conduct. Please be respectful, inclusive, and constructive in all interactions.

## 🚀 Getting Started

1. **Fork the repository** on GitHub: [https://github.com/PeterL-1111/deer-flow-fork](https://github.com/PeterL-1111/deer-flow-fork)
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/deer-flow-fork.git
   cd deer-flow-fork
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/PeterL-1111/deer-flow-fork.git
   ```

## ⚙️ Development Setup

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 18+** with pnpm
- **Git** for version control

### Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the backend server
python -m uvicorn src.server.app:app --reload --port 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd front

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🔧 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Help us improve reliability
- **Feature development** - Add new cold outreach capabilities
- **Documentation** - Improve guides and API docs
- **UI/UX improvements** - Enhance the user experience
- **Performance optimizations** - Make Unghost Agent faster
- **Testing** - Add test coverage and quality assurance

### Before You Start

1. **Check existing issues** to avoid duplicating work
2. **Create an issue** for major changes to discuss the approach
3. **Keep changes focused** - one feature/fix per pull request

## 📝 Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly:
   ```bash
   # Run backend tests
   pytest
   
   # Run frontend tests
   cd front && pnpm test
   ```

4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add personalized message generation feature"
   ```

5. **Push to your fork** and create a pull request

6. **Fill out the PR template** with:
   - Clear description of changes
   - Testing steps performed
   - Screenshots for UI changes
   - Breaking changes (if any)

### PR Requirements

- ✅ All tests pass
- ✅ Code follows style guidelines
- ✅ Documentation updated (if needed)
- ✅ No merge conflicts with main branch
- ✅ Clear, descriptive commit messages

## 🐛 Issue Guidelines

### Reporting Bugs

Please include:
- **Clear title** describing the issue
- **Steps to reproduce** the bug
- **Expected vs actual behavior**
- **Environment details** (OS, browser, Python/Node versions)
- **Screenshots or logs** if applicable

### Feature Requests

Please include:
- **Use case description** - what problem does this solve?
- **Proposed solution** - how should it work?
- **Alternative solutions** considered
- **Priority level** and impact assessment

## 💻 Coding Standards

### Python (Backend)

- Follow **PEP 8** style guide
- Use **type hints** for function parameters and returns
- Write **docstrings** for all functions and classes
- Use **black** for code formatting
- Use **isort** for import organization

### TypeScript/React (Frontend)

- Follow **ESLint** and **Prettier** configurations
- Use **TypeScript** for type safety
- Write **functional components** with hooks
- Use **Tailwind CSS** for styling
- Follow established component patterns

### General Guidelines

- **Clear, descriptive variable and function names**
- **Single responsibility principle** - functions should do one thing well
- **Comments for complex logic** but prefer self-documenting code
- **Error handling** - graceful failure with informative messages

## 🧪 Testing Guidelines

### Backend Testing

- Write **unit tests** for core functions
- Include **integration tests** for API endpoints
- Use **pytest fixtures** for test data
- Maintain **>80% code coverage**

### Frontend Testing

- Write **unit tests** for utility functions
- Include **component tests** for React components
- Use **E2E tests** for critical user flows
- Test **accessibility** compliance

## 📚 Documentation

When contributing:

- Update **README.md** if adding major features
- Add **API documentation** for new endpoints
- Include **code comments** for complex logic
- Update **configuration guides** if needed

## 📄 License

By contributing to Unghost Agent, you agree that your contributions will be licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

Your contributions will be attributed to you while being incorporated into the project under the existing dual copyright structure.

## 🙋‍♀️ Getting Help

If you need help contributing:

- **Check the documentation** first
- **Search existing issues** for similar questions
- **Create a new issue** with the "question" label
- **Be specific** about what you're trying to accomplish

## 🎉 Recognition

We appreciate all contributions! Contributors will be:

- **Listed in our contributors section**
- **Acknowledged in release notes** for significant contributions
- **Invited to join** the core contributor team for ongoing participation

---

## 🚀 Ready to Contribute?

Thank you for helping make Unghost Agent better! Every contribution, no matter how small, helps improve AI-powered cold outreach for everyone.

**Happy coding!** 👻✨ 