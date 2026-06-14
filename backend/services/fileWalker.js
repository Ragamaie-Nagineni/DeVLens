import fs from "fs/promises"
import path from "path";

const IGNORED_DIRECTORIES = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    "coverage",
    "__pycache__",
    "venv"
])

const SUPPORTED_EXTENSIONS = new Set([
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".cpp",
    ".c",
    ".h",
    ".cs",
    ".go",
    ".rs"
])

async function walkDirectory(dirPath, files = []) {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            if (!IGNORED_DIRECTORIES.has(entry.name)) {
              await walkDirectory(fullPath, files);
            }
        } else {
            const ext = path.extname(entry.name);
            if (SUPPORTED_EXTENSIONS.has(ext)) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

export default walkDirectory;