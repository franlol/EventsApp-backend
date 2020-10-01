import path from 'path';
import { buildSchema, print } from "graphql";
import { loadFilesSync, mergeTypeDefs } from "graphql-tools";

const loadedFiles = loadFilesSync(path.join(__dirname, '/*/**.gql'));
const typeDefs = mergeTypeDefs(loadedFiles)
const printedTypeDefs = print(typeDefs);

export default buildSchema(printedTypeDefs);
