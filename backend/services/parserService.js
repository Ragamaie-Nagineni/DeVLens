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

            const declaration = path.node.declaration;

            if (declaration) {

                if (declaration.type === "FunctionDeclaration") {

                    result.exports.push({
                        type: "named",
                        kind: "function",
                        name: declaration.id.name,
                    });

                }

                else if (declaration.type === "ClassDeclaration") {

                    result.exports.push({
                        type: "named",
                        kind: "class",
                        name: declaration.id.name,
                    });

                } else if (declaration.type === "VariableDeclaration") {

                    for (const variable of declaration.declarations) {

                        result.exports.push({
                            type: "named",
                            kind: "function",
                            name: variable.id.name,
                        });

                    }
                }

            }

            for (const specifier of path.node.specifiers || []) {

                const exportedName = specifier.exported.name;

                const isFunction = result.functions.some(
                    fn => fn.name === exportedName
                );

                const isClass = result.classes.includes(exportedName);

                result.exports.push({
                    type: "named",
                    kind: isFunction
                        ? "function"
                        : isClass
                            ? "class"
                            : "unknown",
                    name: exportedName,
                });

            }

        },
        ExportDefaultDeclaration(path) {

            const declaration = path.node.declaration;

            if (declaration.type === "Identifier") {
                const isFunction = result.functions.some(
                    fn => fn.name === declaration.name
                );
                const isClass = result.classes.includes(declaration.name);
                result.exports.push({
                    type: "default",
                    kind: isFunction
                        ? "function"
                        : isClass
                            ? "class"
                            : "unknown",
                    name: declaration.name,
                });
            }

            else if (declaration.type === "FunctionDeclaration") {

                result.exports.push({
                    type: "default",
                    kind: "function",
                    name: declaration.id?.name || "anonymous",
                });

            }

            else if (declaration.type === "ClassDeclaration") {

                result.exports.push({
                    type: "default",
                    kind: "class",
                    name: declaration.id?.name || "anonymous",
                });

            }

        },
    })
    return result;
}

export default parseJavaScriptFile;