# DeVLens
Full-stack developer platform that visualizes code relationships, performs impact analysis, and enables AI-powered repository understanding.

## AI-Powered Developer Intelligence Platform

DevLens is a full-stack AI-powered platform that helps developers understand, analyze, and navigate large codebases efficiently through dependency graphs, semantic search, and intelligent repository analysis.

---

## Features

- AI-powered repository chat
- Dependency graph visualization
- Semantic code search
- Repository analysis engine
- Impact analysis system
- Authentication and GitHub integration
- Interactive dashboard
- Real-time developer insights

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript / TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- Node.js (optional services)

### Databases
- PostgreSQL
- Neo4j
- Qdrant

### AI & Search
- LangChain
- OpenAI API
- Vector Embeddings

### DevOps
- Docker
- GitHub Actions
- Vercel

---

## Project Structure

```bash
devlens/
│
├── frontend/
├── backend/
├── docs/
├── docker/
├── README.md
└── .gitignore
```

---

## Core Modules

### Repository Parsing
Analyzes repository structure, imports, dependencies, classes, and functions.

### Dependency Graph
Visualizes relationships between files, APIs, and services using graph databases.

### AI Repository Chat
Allows developers to ask natural language questions about repositories.

### Semantic Search
Enables intelligent codebase searching using vector embeddings.

### Impact Analysis
Predicts affected modules and dependency risks before code modifications.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/devlens.git
cd devlens
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Environment Variables

Create `.env` files inside frontend and backend folders.

Example:

```env
OPENAI_API_KEY=your_api_key
DATABASE_URL=your_database_url
NEO4J_URI=your_neo4j_uri
```

---

## Development Phases

### Phase 1
- Landing page
- Authentication
- Dashboard UI

### Phase 2
- Repository upload
- Repository parsing
- Dependency graph

### Phase 3
- AI repository chat
- Semantic search
- Impact analysis

### Phase 4
- Deployment
- Optimization
- Real-time features

---

## Future Enhancements

- Multi-language repository support
- Advanced architecture analysis
- AI-generated documentation
- Team collaboration tools
- CI/CD integration
- Cloud deployment automation

---

## Screenshots

> Screenshots and architecture diagrams will be added soon.

---

## Contributors

- Nagineni Ragamaie
- Vana Vamsi

---

## License

This project is licensed under the MIT License.

---

## Project Vision

DevLens aims to simplify large-scale codebase understanding using AI, graph databases, and modern developer tooling to improve software engineering productivity.
