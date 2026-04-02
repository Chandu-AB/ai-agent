# 🚀 AI-Powered Git Automation using MCP + Ollama

## 📌 Overview

This project is an AI-powered automation system that uses an MCP (Model Context Protocol) server and a local LLM (Ollama) to automate Git operations such as:

* Committing local changes
* Pushing code to GitHub
* Creating Pull Requests automatically

👉 The user simply gives a command, and the system handles the Git workflow.

---

## ⚙️ Architecture

```
User Input (CLI)
   ↓
Agent (Ollama)
   ↓
Tool Selection
   ↓
MCP Tool Execution
   ↓
Git + GitHub Actions
```

---

## 📁 Project Structure

```
src/
│
├── agent/
│   └── ollamaAgent.ts
│
├── tools/
│   └── createPR.ts
│
└── index.ts
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```
git clone <your-repo-url>
cd <project-folder>
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file:

```
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_username
GITHUB_REPO=your_repo_name
```

---

### 4. Build the Project (IMPORTANT ⚠️)

```
npm run build
```

👉 This converts TypeScript → JavaScript (`src → dist`)

---

### 5. Start the Application

```
npm start
```

👉 (internally runs: `node dist/index.js`)

---

## 🧪 Usage

### Step 1: Create a Branch

```
git checkout -b feature/my-change
```

### Step 2: Make Code Changes

### Step 3: Run AI Agent

```
npm start
```

### Step 4: Enter Command

```
create PR
```

---

## 🔥 Output

```
⚡ Executing: createPR
✅ PR Created: https://github.com/...
```

---

## ⚠️ Important Notes

* Must be inside a Git repository
* Must be on a feature branch (not main)
* Changes must exist before running
* Project must be built before running (`npm run build`)

---

## 🎯 Conclusion

This project demonstrates how AI + MCP can automate real-world developer workflows by reducing manual Git operations into a single command.

---

## 👨‍💻 Author

Chandrasekharareddy

* GitHub: https://github.com/Chandu-AB

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
