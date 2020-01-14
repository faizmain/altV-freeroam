import tsNode from "ts-node";
import { dirname, resolve as resolvePath } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = dirname(decodeURI(new URL(import.meta.url).pathname)).replace(/^\/([A-Za-z]):\//, '$1:/');

tsNode.register({
  project: resolvePath(__dirname, "tsconfig.json"),
  transpileOnly: true
})

require('./index.ts')