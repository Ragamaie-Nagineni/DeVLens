import { saveRepository } from "../services/neo4jService.js";

await saveRepository({
    id: 1,
    name: "Test Repository",
});

console.log("Done");