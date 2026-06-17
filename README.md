# DevLens 🚀

> **AI-Powered Developer Intelligence Platform**  
> *Google Maps + ChatGPT for Software Repositories.*

DevLens is a full-stack platform that helps developers understand large codebases by automatically analyzing repositories, extracting relationships between files and code entities, building dependency graphs, and enabling AI-powered repository understanding.

Instead of manually exploring hundreds of files, developers can upload a GitHub repository or ZIP file and instantly visualize its architecture, dependencies, and internal structure.

---

## ✨ Vision

Modern codebases are becoming increasingly complex. DevLens aims to simplify code understanding by combining:

- 🕸️ Dependency Graphs
- 🤖 AI-Powered Repository Chat
- 🔍 Semantic Code Search
- 📊 Impact Analysis
- 📁 Interactive File Explorer
- 🧠 Intelligent Code Navigation

The goal is to become **"Google Maps + ChatGPT for software repositories."**

---

# 🏗️ Repository Analysis Pipeline

When a repository is uploaded, DevLens performs the following steps:

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
 Store & Visualize Graph
            │
            ▼
 AI Chat • Search • Impact Analysis
```

---

# 🚀 Features

## ✅ Currently Implemented

- User Authentication
- GitHub Repository Upload
- Local Repository Cloning
- Recursive File Traversal
- AST Parsing using Babel
- Import Extraction
- Export Extraction
- Function Detection
- Class Detection
- File Dependency Graph Generation
- Relative Path Resolution
- Modular Analysis Pipeline

---

## 🚧 In Progress

- Interactive Dependency Graph Visualization
- Repository Explorer
- Code Viewer
- Neo4j Graph Storage
- React Flow Integration

---

## 🔮 Planned Features

- AI Repository Chat
- Semantic Code Search
- Function Call Graph
- Class Inheritance Graph
- Impact Analysis
- Multi-language Support
- Embedding-based Retrieval
- Architecture Summarization
- Automatic Documentation Generation

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- JavaScript
- CSS / Tailwind CSS
- React Flow (planned)

## Backend

- Node.js
- Express.js
- Postgresql

## Repository Analysis

- simple-git
- @babel/parser
- @babel/traverse

## Databases

- PostgreSQL
- Neo4j (planned)

## Future AI Stack

- Embedding Models
- Vector Search
- Large Language Models (LLMs)

---

# 📂 Project Structure

```text
devlens/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
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
Visualize Repository
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

This graph serves as the foundation for visualization, navigation, and future AI reasoning.

---

# 🔍 Future Graph Model

DevLens will evolve beyond file-level relationships to include functions and classes.

### Node Types

- File
- Function
- Class
- Module

### Relationship Types

- IMPORTS
- CONTAINS
- CALLS
- EXTENDS
- IMPLEMENTS

Example:

```text
(File) App.jsx
      │ CONTAINS
      ▼
(Function) App()

(Function) App()
      │ CALLS
      ▼
(Function) fetchData()

(File) App.jsx
      │ IMPORTS
      ▼
(File) Dashboard.jsx
```

---

# 🎯 Planned User Experience

Developers will be able to ask questions like:

- Where is authentication implemented?
- Explain the login flow.
- Which files depend on this module?
- Which components use Redis?
- What is the impact of changing this file?
- Summarize this repository.

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

# 📌 Current Development Status

- ✅ Authentication
- ✅ Repository Upload
- ✅ GitHub Repository Cloning
- ✅ Recursive File Traversal
- ✅ AST Parsing
- ✅ Import Graph Generation
- 🚧 Graph Visualization
- 🚧 Neo4j Integration
- ⏳ AI Chat
- ⏳ Semantic Search
- ⏳ Impact Analysis

---

# 🌟 Project Goal

DevLens aims to reduce the time developers spend understanding unfamiliar codebases by transforming raw source code into an interactive knowledge graph powered by AI.

Ultimately, it seeks to become the definitive platform for repository exploration, architecture visualization, and intelligent code understanding.

---

## 👨‍💻 Contributors

- **Nagineni Ragamaie**
- **Vana Vamsi**

---

## 📄 License

This project is licensed under the MIT License.