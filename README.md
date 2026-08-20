# DevLens 🚀

> **AI-Powered Developer Intelligence Platform**
> *Google Maps + ChatGPT for Software Repositories.*

DevLens is a full-stack platform that helps developers understand large software repositories without manually navigating hundreds of files.

It analyzes repositories, extracts relationships between files and code entities, builds dependency graphs, and provides interactive tools for repository exploration, dependency analysis, and impact analysis.

The long-term goal is to make understanding an unfamiliar codebase as simple as navigating Google Maps.

---

# ✨ Vision

Modern software repositories are becoming increasingly complex.

DevLens aims to simplify code understanding by combining:

- 🕸️ Dependency Graphs
- 🤖 AI-Powered Repository Chat
- 🔍 Semantic Code Search
- 📊 Impact Analysis
- 📁 Interactive File Explorer
- 🧠 Intelligent Code Navigation
- 📚 Architecture Understanding

The goal is to become:

> **"Google Maps + ChatGPT for Software Repositories."**

---

# 🏗️ Repository Analysis Pipeline

```text
GitHub URL / ZIP Upload
          │
          ▼
Clone / Extract Repository
          │
          ▼
Recursive File Traversal
          │
          ▼
AST Parsing
          │
          ▼
Extract Imports, Exports,
Functions & Classes
          │
          ▼
Build Dependency Graph
          │
          ▼
Store Analysis Snapshot
(PostgreSQL / Supabase)
          │
          ▼
Neo4j Graph Storage
          │
          ▼
Dashboard & Repository Explorer
          │
          ├──────────────► Impact Analysis
          │
          ├──────────────► Search
          │
          └──────────────► AI Repository Chat
```

---

# 🚀 Features

## ✅ Currently Implemented

### 🔐 Authentication
- User Authentication
- Protected Routes
- User-specific repositories

### 📦 Repository Analysis
- GitHub Repository Upload
- ZIP Repository Upload
- Local Repository Cloning
- Recursive File Traversal
- Ignored Directory Handling
- AST Parsing using Babel
- Import Extraction
- Export Extraction
- Function Detection
- Class Detection
- Relative Path Resolution
- File Dependency Graph Generation

Ignored directories include:
```
node_modules, .git, dist, build, .next, coverage, venv, __pycache__
```

### 💾 Persistent Analysis
- Repository analysis stored in PostgreSQL / Supabase
- Analysis snapshots
- Persistent repository data
- Load latest repository analysis
- Load latest repository graph
- Repository data persists across refresh and navigation

### 📊 Dashboard
- Repository Upload Component
- Latest Analysis Card
- Repository Metrics
- Recent Repositories
- Repository Pagination
- Repository Navigation
- Improved Dashboard UI

### 🗂️ Repository Explorer
- Interactive Dependency Graph (React Flow based)
- Hierarchical Tree Layout
- Folder-based repository structure
- File Explorer
- Code Viewer — click file → view source code
- Graph Lock / Unlock
- Fullscreen Graph Mode
- Scroll-safe Graph Interaction
- Repository Root Node

---

### 📚 Blogs
- Admin can upload/publish blog posts
- Users can browse and read published blogs
- Read-only for standard users (no user-generated posts)

---

## 🚧 Partially Implemented

### 🕸️ Neo4j Graph

Neo4j is being used to represent repository relationships as a graph.

**Current graph entities:**
- Repository Nodes
- Folder Nodes
- File Nodes

**Current relationships:**
- `CONTAINS`
- `IMPORTS`

Neo4j is also used by the Impact Analysis system to query repository dependencies.

### 📊 Impact Analysis — Core Complete

Impact Analysis allows developers to understand which parts of a repository may be affected when modifying a particular file. The core flow is complete; only minor polish remains.

**Current implementation:**
- Select a repository file
- Send repository ID and file path to backend
- Query Neo4j for dependent files
- Find incoming file dependencies
- Calculate impacted file count
- Calculate dependency depth
- Calculate impacted functions
- Generate initial risk level
- Display impact metrics
- Display affected files

Example:
```
                    pdfService.js
                         ▲
                         │
                      IMPORTS
                         │
                  claimroutes.js
                         ▲
                         │
                      IMPORTS
                         │
                     server.js
```

The UI currently displays:
- Overall Risk
- Files Impacted
- Functions Impacted
- Dependency Depth

Example response:
```json
{
    "overallRisk": "Medium",
    "filesImpacted": 2,
    "functionsImpacted": 0,
    "dependencyDepth": 2
}
```

**Remaining polish:**
- Function-level impact analysis
- Function call / class-level impact
- Change propagation visualization
- Minor UI refinements to the dependency tree

### ⚙️ Settings — Half Complete

A dedicated Settings page has been implemented. Roughly half of it is fully working; the rest still needs backend wiring.

The Settings interface contains:
- Profile & Account
- Repository
- Graph Settings
- AI Settings
- Security & Privacy

**👤 Profile & Account** ✅ Working:
- Profile information (Full Name, Email, Avatar)
- Change Avatar interface
- Save Changes interface

**📁 Repository Settings** ✅ Working:
- Analysis Defaults
- Default Branch
- Re-analysis Trigger
- Auto Re-analyze

**🕸️ Graph Settings** 🚧 UI created, not yet functional. Planned configuration includes:
- Default graph layout
- Graph depth
- Node visibility
- Relationship visibility
- Default zoom
- Graph interaction preferences

**🤖 AI Settings** 🚧 UI created, not yet functional. Planned options include:
- AI model selection
- Response behavior
- Repository context settings
- AI analysis preferences

**🔐 Security & Privacy** 🚧 UI created, not yet functional. Planned functionality includes:
- Account security
- Session management
- Repository privacy
- Data management
- Connected accounts

---

## 🚧 Currently In Progress

**Impact Analysis** (minor polish only)
- Function-level impact analysis
- Function call / class-level impact
- Change propagation visualization

**Settings** (half done)
- Persist Graph/AI/Security settings to database
- Complete Graph Settings functionality
- Complete AI Settings functionality
- Complete Security & Privacy functionality

**Neo4j**
- Advanced graph queries
- Function relationships
- Class relationships
- Call graph
- Graph-based repository navigation

**Repository Search**
- Repository-wide search
- File search
- Symbol search
- Natural language search

---

## 🔮 Planned Features

### 🤖 AI Repository Chat
Developers will be able to ask questions about their repositories, such as:
- Where is authentication implemented?
- Explain the login flow.
- Which files depend on this module?
- Which components use Redis?
- What is the impact of changing this file?
- Summarize this repository.

The AI assistant will use repository analysis and graph relationships as context.

### 🔍 Semantic Code Search
Developers will be able to search repositories using natural language.

Example: *"Where is JWT authentication handled?"*

Instead of requiring an exact filename or keyword, DevLens will identify relevant files, functions, classes, modules, and code sections.

### 🧠 Function Call Graph
DevLens will move beyond file-level dependencies and analyze function relationships.

```
authenticateUser()
        │
        ▼
validateToken()
        │
        ▼
getUserFromDatabase()
        │
        ▼
UserRepository.find()
```

This will enable deeper code understanding and more accurate impact analysis.

### 🏛️ Architecture Summarization
DevLens will automatically identify major architectural components such as:
- Authentication
- API Layer
- Database Layer
- Services
- Frontend Components
- Utilities
- External Integrations
- Configuration

### 📚 Automatic Documentation
Future versions will generate documentation automatically from repository structure, file relationships, functions, classes, API routes, and dependencies.

### 🌍 Multi-Language Support
The current analysis pipeline primarily targets JavaScript-based repositories. Future versions will support Python, Java, C++, Go, and Rust.

### 🔎 Embedding-Based Retrieval
Future AI functionality will use embeddings and vector search to retrieve relevant repository code before generating responses.

```
Repository → Code Extraction → Embeddings → Vector Database
→ Semantic Retrieval → LLM → AI Repository Answer
```

---

# 🛠️ Tech Stack

**Frontend:** React, Vite, JavaScript, CSS, React Flow, Axios, React Router, React Icons

**Backend:** Node.js, Express.js, REST APIs, `simple-git`, `@babel/parser`, `@babel/traverse`

**Databases:** PostgreSQL, Supabase, Neo4j

**Future AI Stack:** Large Language Models, Embedding Models, Vector Search, Retrieval-Augmented Generation (RAG)

---

# 🧠 Current Architecture

```
                    Repository
                        │
                        ▼
                Clone / Extract
                        │
                        ▼
                  Walk Files
                        │
                        ▼
                   AST Parse
                        │
                        ▼
                Extract Metadata
                        │
                        ▼
             Build Dependency Graph
                        │
                ┌───────┴───────┐
                ▼               ▼
           PostgreSQL          Neo4j
                │               │
                └───────┬───────┘
                        ▼
              Repository Explorer
                        │
              ┌─────────┼─────────┐
              ▼         ▼         ▼
            Graph     Search    Impact
                                 Analysis
                        │
                        ▼
                AI Repository Chat
```

---

# 🕸️ Dependency Graph

Each file in a repository is represented as a node. Import relationships between files are represented as graph edges.

Example:
```
App.jsx
   │
   ▼
Dashboard.jsx
   │
   ▼
UploadForm.jsx
```

The dependency graph serves as the foundation for repository visualization, dependency analysis, code navigation, impact analysis, and future AI reasoning.

---

# 🔍 Graph Model

DevLens is gradually evolving from a file-level dependency graph into a developer knowledge graph.

| | Current | Planned |
|---|---|---|
| **Node Types** | Repository, Folder, File | Function, Class, Module |
| **Relationships** | `CONTAINS`, `IMPORTS` | `CALLS`, `EXTENDS`, `IMPLEMENTS`, `DECLARES` |

---

# 📌 Development Progress

### ✅ Phase 1 — Repository Analysis
Repository upload, GitHub cloning, ZIP extraction, recursive file traversal, AST parsing, import/export extraction, function/class detection, relative path resolution, dependency graph generation, persistent analysis storage.

**Status: Completed**

### ✅ Phase 2 — Dashboard
Latest Analysis Card, Recent Repositories, Repository Metrics, Repository Pagination, Repository Navigation, Improved Dashboard UI.

**Status: Completed**

### ✅ Phase 3 — Repository Explorer
Interactive Dependency Graph, File Explorer, Code Viewer, Hierarchical Tree Layout, Fullscreen Graph, Graph Lock/Unlock, Scroll-safe Graph Interaction, Repository Root Node.

**Status: Completed**

### ✅ Phase 4 — Blogs
Admin blog upload, published blog listing, read-only blog viewing for users.

**Status: Completed**

### 🚧 Phase 5 — Neo4j & Impact Analysis
Neo4j graph storage, repository graph queries, file dependency queries, Impact Analysis API, affected file detection, dependency depth calculation, initial risk calculation, Impact Overview UI, Dependency Tree UI.

**Status: Core Complete — minor polish left (function-level impact, change propagation view)**

### 🚧 Phase 6 — Settings
Profile & Account UI, Repository Settings UI, Graph Settings UI, AI Settings UI, Security & Privacy UI.

**Status: Half Done — Profile & Repository settings fully working; Graph, AI, and Security settings still need backend wiring**

### 🔮 Phase 7 — Intelligent Repository Understanding
AI Repository Chat, Semantic Code Search, Function Call Graph, Class Inheritance Graph, Architecture Summarization, Automatic Documentation, Embedding-based Retrieval, RAG-based Repository Question Answering.

**Status: Planned**

---

# 🎯 Planned User Experience

A developer should be able to upload a repository and immediately understand its structure:

- **Architecture** — What are the major components of this repository?
- **Dependencies** — Which files depend on this module?
- **Code** — Where is authentication implemented?
- **Impact** — What will be affected if I modify this file?
- **AI Understanding** — Explain the login flow.
- **Repository Summary** — Give me an overview of this repository.

DevLens aims to transform a large repository from a collection of files into an interactive knowledge map.

---

# 📂 Project Structure

```
devlens/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── db/
│   └── temp/
│
├── docs/
│
├── README.md
└── .gitignore
```

---

# ⚙️ Getting Started

### Clone the Repository
```bash
git clone https://github.com/your-username/devlens.git
cd devlens
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

### 🔑 Environment Variables

Create a `.env` file inside the `backend` directory:

```
PORT=3000

DATABASE_URL=your_postgresql_connection_string

NEO4J_URI=your_neo4j_uri
NEO4J_USERNAME=your_neo4j_username
NEO4J_PASSWORD=your_neo4j_password

JWT_SECRET=your_jwt_secret
```

⚠️ Do not commit `.env` files to GitHub.

---

# 🔄 Application Flow

```
User → Login → Upload Repository → Clone / Extract
→ Analyze Repository → Parse Source Files → Build Dependency Graph
→ Store Analysis (PostgreSQL + Neo4j)
→ Repository Explorer
    ├── File Explorer
    ├── Code Viewer
    ├── Dependency Graph
    └── Impact Analysis
```

---

# 📊 Impact Analysis Flow

```
User selects file
        │
        ▼
Frontend sends: repositoryId + path
        │
        ▼
Express API → Impact Analysis Controller → Impact Analysis Service
        │
        ▼
Neo4j → Find dependent files
        │
        ▼
Calculate: Files Impacted, Functions Impacted,
           Dependency Depth, Risk
        │
        ▼
Return JSON → Impact Overview → Dependency Tree
```

---

# 🌟 Project Goal

DevLens aims to reduce the time developers spend understanding unfamiliar codebases.

By combining:
```
Repository Analysis + Dependency Graphs + Impact Analysis
+ Interactive Exploration + AI
```

DevLens transforms raw source code into an interactive developer intelligence platform.

The long-term vision is to become:

> **Google Maps + ChatGPT for Software Repositories.**

---

# 🚀 Future Vision

```
Upload Repository → Understand Architecture → Explore Dependencies
→ Search Code Semantically → Analyze Change Impact
→ Ask AI Questions → Understand the Entire Codebase
```

Instead of spending hours manually exploring an unfamiliar repository, developers will be able to use DevLens as an intelligent map of their software system.

---

# 👨‍💻 Contributors

- Nagineni Ragamaie
- Vana Vamsi

# 📄 License

This project is licensed under the MIT License.