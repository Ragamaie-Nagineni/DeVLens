import fs from "fs/promises";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

const traverse = traverseModule.default;

async function parseJavaScriptFile(filePath) {
    const code = await fs.readFile(filePath, "utf-8");
    const ast = parse(code, {
        sourceType: "unambiguous",
        plugins: [
            "jsx",
            "typescript",
            "classProperties",
            "dynamicImport"
        ]
    })
    const result = {
        imports: [],
        exports: [],
        functions: [],
        classes: []
    }

    traverse(ast, {
        ImportDeclaration(path) { result.imports.push(path.node.source.value); },
        FunctionDeclaration(path) {
            /* result.functions.push({
                  name:path.node.id?.name || "ananymous"
             }); */
            const fn = {
                name: path.node.id?.name || "anonymous",
                calls: []
            };
            path.get("body").traverse({
                FunctionDeclaration(inner) {
                    inner.skip(); // don't enter nested functions
                },
                FunctionExpression(inner) {
                    inner.skip();
                },
                ArrowFunctionExpression(inner) {
                    inner.skip();
                },
                CallExpression(callPath) {
                    if (callPath.node.callee.type === "Identifier") {
                        fn.calls.push(callPath.node.callee.name);
                    }
                }
            });
            result.functions.push(fn);
        },
        VariableDeclarator(path) {
            if (path.node.init && (path.node.init.type === "ArrowFunctionExpression" || path.node.init.type == "FunctionExpression")) {
                /* result.functions.push({
                    name: path.node.id.name
                }) */
                const fn = {
                    name: path.node.id.name || "anonymous",
                    calls: []
                };
                const bodyPath = path.get("init");
                bodyPath.traverse({
                    
                    CallExpression(callPath) {
                        if (callPath.node.callee.type === "Identifier") {
                            fn.calls.push(callPath.node.callee.name);
                        }
                    }
                });
                result.functions.push(fn);
            }
        },
        ClassDeclaration(path) { result.classes.push(path.node.id.name); },
        ExportNamedDeclaration(path) {
            if (path.node.declaration?.id?.name) { result.exports.push(path.node.declaration.id.name); }
            if (path.node.specifiers?.length) { for (const specifier of path.node.specifiers) { result.exports.push(specifier.exported.name); } }
        },
        ExportDefaultDeclaration(path) { result.exports.push("default"); }
    })
    return result;
}

export default parseJavaScriptFile;