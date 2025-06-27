# 👻 Unghost Agent

[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](./README.md) | [简体中文](./README_zh.md) | [日本語](./README_ja.md) | [Deutsch](./README_de.md) | [Español](./README_es.md) | [Русский](./README_ru.md) | [Portuguese](./README_pt.md)

> Transform cold outreach from generic to irresistible with AI-powered personalization.

**Unghost Agent** is an AI-powered personalized cold outreach assistant that crafts compelling, response-generating messages by deeply researching prospects and understanding their professional context. Unlike generic outreach tools, Unghost Agent combines advanced prospect intelligence with strategic message crafting to help you break through inbox noise and build meaningful professional relationships.

## 🎯 What is Unghost Agent?

Unghost Agent is your AI-powered cold outreach specialist that transforms the way you connect with prospects. Instead of sending generic messages that get ignored, Unghost Agent:

- **Researches prospects deeply** using advanced AI tools and public data sources
- **Crafts personalized messages** that demonstrate genuine research and relevance
- **Adapts communication style** to match each prospect's preferences and context
- **Incorporates your professional background** to create authentic, credible outreach
- **Generates high-converting content** that drives responses and meetings

Whether you're in sales, business development, recruitment, or networking, Unghost Agent helps you create outreach that feels personal, relevant, and valuable to your recipients.

## 📑 Table of Contents

- [🚀 Quick Start](#quick-start)
- [🌟 Key Features](#key-features)
- [🎬 Demo & Examples](#demo--examples)
- [🏗️ Architecture](#architecture)
- [🛠️ Development](#development)
- [🐳 Docker](#docker)
- [🎙️ Content Creation Features](#content-creation-features)
- [📚 Configuration Guide](#configuration-guide)
- [❓ FAQ](#faq)
- [📜 License](#license)
- [💖 Acknowledgments](#acknowledgments)

## 🚀 Quick Start

Unghost Agent is built with Python and includes a modern web interface. Follow these steps to get started:

### Prerequisites

- **[Python](https://www.python.org/downloads/):** Version `3.12+`
- **[Node.js](https://nodejs.org/en/download/):** Version `22+`

### Recommended Tools

- **[`uv`](https://docs.astral.sh/uv/getting-started/installation/):** Python environment and dependency management
- **[`nvm`](https://github.com/nvm-sh/nvm):** Node.js version management
- **[`pnpm`](https://pnpm.io/installation):** Node.js package management

### Installation

```bash
# Clone the repository
git clone https://github.com/PeterL-1111/deer-flow-fork.git
cd unghost-agent

# Install Python dependencies (uv handles environment creation automatically)
uv sync

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys:
# - Tavily API for web search: https://app.tavily.com/home
# - OpenAI/Anthropic for LLM access
# - Optional: Volcengine TTS for audio features

# Configure LLM settings
cp conf.yaml.example conf.yaml
# Edit conf.yaml with your preferred LLM configuration
# See docs/configuration_guide.md for details

# Install frontend dependencies (optional for web UI)
cd front
npm install
cd ..
```

### Quick Start - Console

```bash
# Run Unghost Agent in console mode
uv run main.py

# Example: Create outreach for a specific prospect
uv run main.py "Create personalized cold outreach for John Smith, VP Engineering at TechCorp"
```

### Quick Start - Web Interface

```bash
# Start both backend and frontend servers
./bootstrap.sh -d  # macOS/Linux
# or
bootstrap.bat -d  # Windows

# Open your browser to http://localhost:3000
```

## 🌟 Key Features

### 🔍 Deep Prospect Intelligence

- **Professional Background Research**: LinkedIn profiles, career history, recent activities
- **Company Context Analysis**: Industry trends, company news, strategic initiatives  
- **Communication Style Detection**: Tone preferences from public content and interactions
- **Timing Intelligence**: Recent events that make outreach timely and relevant

### 💬 AI-Personalized Messaging

- **Multi-Style Tone Generation**: Aggressive, Conservative, Go Nuts, or Friendly approaches
- **Value Proposition Alignment**: Messages tailored to prospect's likely priorities and pain points
- **Professional Background Integration**: Leverage your expertise for authentic credibility
- **Response Psychology**: Crafted to maximize open rates and response probability

### 🎯 Strategic Outreach Planning

- **Persona Research**: Comprehensive prospect profiling with behavioral insights
- **Strategy Formulation**: Optimal approach recommendations based on prospect analysis
- **Message Drafting**: Complete outreach sequences with subject lines and follow-ups
- **Credibility Building**: Social proof and connection opportunities identification

### 🛠️ Advanced Research Tools

- **Multi-Engine Web Search**: Tavily, Brave Search, DuckDuckGo, and academic sources
- **Content Crawling**: Deep analysis of prospect's published content and interviews
- **LinkedIn Intelligence**: Professional network and career trajectory analysis
- **Company Intelligence**: Business context, competitive landscape, recent developments

### 🤝 Human-in-the-Loop Collaboration

- **Plan Review & Editing**: Review and modify outreach strategies before execution
- **Interactive Refinement**: Natural language feedback to improve research and messaging
- **Auto-Acceptance Mode**: Streamlined workflow for trusted use cases
- **Real-time Collaboration**: Work alongside AI to perfect your outreach approach

## 🎬 Demo & Examples

### Video Demo

*[Demo video will be added showcasing cold outreach creation process]*

### Sample Outreach Scenarios

Here are examples of cold outreach scenarios Unghost Agent excels at:

#### Sales Outreach
```bash
# Research a potential customer and craft a personalized sales message
uv run main.py "Create outreach for Sarah Johnson, Head of Marketing at GrowthCorp, to introduce our marketing automation platform"
```

#### Business Development
```bash
# Craft partnership outreach messages
uv run main.py "Draft outreach to Michael Chen, VP Business Development at TechStart, for potential integration partnership"
```

#### Recruitment
```bash
# Personalized recruiting messages
uv run main.py "Create recruiting outreach for Lisa Wang, Senior Software Engineer at BigTech, for our new AI team role"
```

#### Professional Networking
  ```bash
# Network expansion and relationship building
uv run main.py "Draft networking message to Alex Thompson, founder of StartupX, to discuss AI trends in fintech"
```

### Interactive Mode

```bash
# Launch with built-in cold outreach templates
uv run main.py --interactive
```

## 🏗️ Architecture

Unghost Agent implements a specialized multi-agent system optimized for cold outreach intelligence and message crafting:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Coordinator   │───▶│    Planner      │───▶│ Research Team   │
│ (Outreach Mgmt) │    │ (Strategy Dev)  │    │ (Intel Gather)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                       ┌─────────────────┐            ▼
                       │   Strategizer   │    ┌─────────────────┐
                       │ (Message Craft) │◀───│   Researcher    │
                       └─────────────────┘    │ (Prospect Intel)│
                                              └─────────────────┘
```

### Core Components

1. **Coordinator**: Manages the outreach workflow and user interactions
2. **Planner**: Creates strategic research plans for comprehensive prospect intelligence
3. **Researcher**: Gathers deep prospect and company intelligence using specialized tools
4. **Strategizer**: Formulates outreach strategies and crafts personalized messages
5. **Reporter**: Generates comprehensive outreach packages and recommendations

### Specialized Tools

- **LinkedIn Profile Scraper**: Professional background and network analysis
- **Company Information Tool**: Business context and competitive intelligence
- **Social Media Activity Analyzer**: Communication style and engagement patterns
- **Public Speaking & Publication Tracker**: Thought leadership and expertise insights

## 🛠️ Development

### Running Tests

```bash
# Run the full test suite
make test

# Run specific tests
pytest tests/integration/test_outreach_workflow.py

# Run with coverage
make coverage
```

### Code Quality

```bash
# Run linting
make lint

# Format code
make format
```

### Debugging with LangGraph Studio

Debug and visualize outreach workflows in real-time:

```bash
# Mac
uvx --refresh --from "langgraph-cli[inmem]" --with-editable . --python 3.12 langgraph dev --allow-blocking

# Windows/Linux
pip install -e .
pip install -U "langgraph-cli[inmem]"
langgraph dev
```

Access the Studio UI at: https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024

## 🐳 Docker

Run Unghost Agent with Docker for consistent deployment:

   ```bash
# Build the Docker image
docker build -t unghost-agent .

# Run with environment variables
docker run -d -p 8000:8000 --env-file .env unghost-agent

# Or use Docker Compose for full stack
docker compose up
```

## 🎙️ Content Creation Features

Beyond cold outreach, Unghost Agent includes additional content creation capabilities:

### Podcast Generation
Convert research reports into podcast scripts and audio:

```bash
curl -X POST "http://localhost:8000/api/podcast/generate" \
  -H "Content-Type: application/json" \
  -d '{"content": "Your research content here"}'
```

### Presentation Creation
Generate PowerPoint presentations from research:

```bash
curl -X POST "http://localhost:8000/api/ppt/generate" \
  -H "Content-Type: application/json" \
  -d '{"content": "Your research content here"}'
```

### Text-to-Speech
Convert outreach messages to audio for review:

```bash
curl -X POST "http://localhost:8000/api/tts" \
  -H "Content-Type: application/json" \
  -d '{"text": "Your outreach message here"}' \
  --output message.mp3
```

## 📚 Configuration Guide

### Environment Variables (.env)

```bash
# Search Engine (choose one)
SEARCH_API=tavily                    # tavily, brave_search, duckduckgo, arxiv
TAVILY_API_KEY=your_tavily_key
BRAVE_SEARCH_API_KEY=your_brave_key

# LLM Configuration (see conf.yaml)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# Optional: RAG Integration
RAG_PROVIDER=ragflow
RAGFLOW_API_URL=http://localhost:9388
RAGFLOW_API_KEY=your_ragflow_key

# Optional: Text-to-Speech
VOLCENGINE_TTS_APPID=your_app_id
VOLCENGINE_TTS_ACCESS_TOKEN=your_token

# Optional: Debugging
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=your_langsmith_key
LANGSMITH_PROJECT=unghost-agent
```

### LLM Configuration (conf.yaml)

```yaml
BASIC_MODEL:
  model: "gpt-4"
  api_key: "${OPENAI_API_KEY}"
  base_url: "https://api.openai.com/v1"

REASONING_MODEL:
  model: "claude-3-5-sonnet-20241022"
  api_key: "${ANTHROPIC_API_KEY}"
  base_url: "https://api.anthropic.com"

VISION_MODEL:
  model: "gpt-4-vision-preview"
  api_key: "${OPENAI_API_KEY}"
  base_url: "https://api.openai.com/v1"
```

For detailed configuration options, see [docs/configuration_guide.md](docs/configuration_guide.md).

## ❓ FAQ

### General Questions

**Q: What makes Unghost Agent different from other outreach tools?**
A: Unghost Agent combines deep AI-powered prospect research with strategic message crafting. Instead of templates, it creates truly personalized messages based on comprehensive prospect intelligence.

**Q: Can I use my own professional background for credibility?**
A: Yes! Unghost Agent includes a user background feature that incorporates your professional experience to create authentic, credible outreach that sounds natural coming from you.

**Q: What data sources does Unghost Agent use?**
A: Unghost Agent uses only publicly available information from web searches, LinkedIn profiles, company websites, social media, and published content. No private data access.

### Technical Questions

**Q: Which LLM models are supported?**
A: Unghost Agent supports OpenAI (GPT-4), Anthropic (Claude), and most models through LiteLLM integration. See the configuration guide for setup details.

**Q: Can I customize the outreach style?**
A: Yes! Choose from four outreach styles: Aggressive (direct), Conservative (diplomatic), Go Nuts (creative), or Friendly (relationship-focused).

**Q: Is there an API for integration?**
A: Yes, Unghost Agent provides a full REST API for integration with your existing tools and workflows.

For more questions, see [docs/FAQ.md](docs/FAQ.md).

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

## 💖 Acknowledgments

Unghost Agent builds upon the foundation of DeerFlow and the incredible work of the open-source community. We extend our sincere gratitude to:

### Original Contributors

Special thanks to **Henry Li and the original DeerFlow contributors** for their foundational work that made Unghost Agent possible. Their vision for AI-powered research provided the technical foundation we've specialized for cold outreach.

### Core Technology

- **[LangChain](https://github.com/langchain-ai/langchain)**: Framework powering our LLM interactions and agent orchestration
- **[LangGraph](https://github.com/langchain-ai/langgraph)**: Multi-agent workflow architecture enabling sophisticated outreach intelligence
- **[Novel](https://github.com/steven-tey/novel)**: Notion-style editor supporting our content creation features
- **[RAGFlow](https://github.com/infiniflow/ragflow)**: Private knowledge base integration for enhanced research capabilities

### Project Leadership

**Unghost Agent** is maintained by **Peter Liu**, who has adapted and specialized the original DeerFlow framework to create a powerful cold outreach solution while respecting the MIT license terms of the original work.

---

*Transform your cold outreach from ignored to irresistible with Unghost Agent. Start building meaningful professional relationships through AI-powered personalization.*
