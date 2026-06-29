# DevLens 🚀

> **AI-Powered Developer Intelligence Platform**
> *Google Maps + ChatGPT for Software Repositories.*

DevLens is a full-stack platform that helps developers understand large codebases by automatically analyzing repositories, extracting relationships between files and code entities, building dependency graphs, and enabling AI-powered repository understanding.

Instead of manually exploring hundreds of files, developers can upload a GitHub repository or ZIP file and instantly visualize its architecture, dependencies, and internal structure.

---

## ✨ Vision

Modern codebases are becoming increasingly complex. DevLens aims to simplify code understanding by combining:

* 🕸️ Dependency Graphs
* 🤖 AI-Powered Repository Chat
* 🔍 Semantic Code Search
* 📊 Impact Analysis
* 📁 Interactive File Explorer
* 🧠 Intelligent Code Navigation

The goal is to become **"Google Maps + ChatGPT for Software Repositories."**

---

# 🏗️ Repository Analysis Pipeline

```text
GitHub URL / ZIP Upload
            │
            ▼
 Clone or Extract Repository
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
 Dashboard & Repository Explorer
            │
            ▼
 AI Chat • Search • Impact Analysis
```

---

# 🚀 Features

## ✅ Currently Implemented

### Authentication

* User Authentication
* Protected Routes

### Repository Analysis

* GitHub Repository Upload
* ZIP Repository Upload
* Local Repository Cloning
* Recursive File Traversal
* AST Parsing using Babel
* Import Extraction
* Export Extraction
* Function Detection
* Class Detection
* Relative Path Resolution
* File Dependency Graph Generation

### Persistent Analysis

* Save repository analysis to PostgreSQL (Supabase)
* Load latest analysis automatically
* Load latest repository graph
* Persist analysis across refresh and navigation

### Dashboard

* Upload Repository Component
* Latest Analysis Card
* Repository Metrics
* Recent Repositories
* Repository Pagination
* Improved Dashboard UI

### Repository Explorer

* Interactive Dependency Graph
* Hierarchical Tree Layout
* Lock / Unlock Graph Controls
* Fullscreen Graph Mode
* Scroll-safe Graph Interaction
* File Explorer
* Code Viewer
* Click File → View Source Code

---

## 🚧 In Progress

* Neo4j Graph Storage
* Repository Search
* Repository Settings

---

## 🔮 Planned Features

* AI Repository Chat
* Semantic Code Search
* Function Call Graph
* Class Inheritance Graph
* Impact Analysis
* Multi-language Support
* Embedding-based Retrieval
* Architecture Summarization
* Automatic Documentation Generation

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* JavaScript
* CSS
* React Flow

## Backend

* Node.js
* Express.js

## Repository Analysis

* simple-git
* @babel/parser
* @babel/traverse

## Databases

* PostgreSQL (Supabase)
* Neo4j (Planned)

## Future AI Stack

* Embedding Models
* Vector Search
* Large Language Models (LLMs)

---

# 📂 Project Structure

```text
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
│   ├── database/
│   └── temp/
│
├── docs/
├── README.md
└── .gitignore
```

---

# 🧠 Current Architecture

```text
Repository
     │
     ▼
Clone Repository
     │
     ▼
Walk Files
     │
     ▼
Parse AST
     │
     ▼
Extract Metadata
     │
     ▼
Build Import Graph
     │
     ▼
Store Analysis
     │
     ▼
Dashboard
     │
     ▼
Repository Explorer
```

---

# 🕸️ Dependency Graph

Each file is represented as a **node**, and each import relationship becomes an **edge**.

Example:

```text
App.jsx
    │
    ▼
Dashboard.jsx
    │
    ▼
UploadForm.jsx
```

The dependency graph serves as the foundation for visualization, navigation, and future AI reasoning.

---

# 🔍 Future Graph Model

DevLens will evolve beyond file-level relationships to include functions, classes, and modules.

### Node Types

* File
* Function
* Class
* Module

### Relationship Types

* IMPORTS
* CONTAINS
* CALLS
* EXTENDS
* IMPLEMENTS

---

# 📌 Current Development Progress

### ✅ Phase 1 – Repository Analysis

* Repository upload, cloning, AST parsing, and dependency graph generation
* Persistent analysis storage with PostgreSQL (Supabase)
* Automatic loading of latest analysis and repository graph

### ✅ Phase 2 – Dashboard

* Latest Analysis Card
* Recent Repositories
* Repository Pagination
* Improved Dashboard UI

### ✅ Phase 3 – Repository Explorer

* Interactive Dependency Graph
* File Explorer & Code Viewer
* Fullscreen Graph
* Graph Lock / Unlock
* Hierarchical Tree Layout

---

# 🎯 Planned User Experience

Developers will be able to ask questions like:

* Where is authentication implemented?
* Explain the login flow.
* Which files depend on this module?
* Which components use Redis?
* What is the impact of changing this file?
* Summarize this repository.

---

# ⚙️ Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/devlens.git
cd devlens
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

---

# 🌟 Project Goal

DevLens aims to reduce the time developers spend understanding unfamiliar codebases by transforming raw source code into an interactive knowledge graph powered by AI.

Ultimately, it seeks to become the definitive platform for repository exploration, architecture visualization, and intelligent code understanding.

---

## 👨‍💻 Contributors

* **Nagineni Ragamaie**
* **Vana Vamsi**

---

## 📄 License

This project is licensed under the MIT License.
