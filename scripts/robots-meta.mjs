// Después de `next build`: cada .html de out lleva exactamente una etiqueta robots, la de ROBOTS en src/content/meta.ts.
// Next añade por su cuenta un "noindex" a la 404, así que aquí se quitan los duplicados. Falla si una página no la tiene.
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] || "out";
const ROBOTS = readFileSync("src/content/meta.ts", "utf8").match(/export const ROBOTS = "([^"]+)"/)?.[1];
if (!ROBOTS) throw new Error("No encuentro ROBOTS en src/content/meta.ts");
const tag = `<meta name="robots" content="${ROBOTS}"/>`;
const any = /<meta name="robots" content="[^"]*"\s*\/?>/g;

const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
let fixed = 0;
for (const file of walk(root).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  if (!html.includes(tag)) throw new Error(`${file}: falta <meta name="robots" content="${ROBOTS}">`);
  let first = true;
  const out = html.replace(any, (m) => (m === tag && first ? ((first = false), m) : ""));
  if (out !== html) { writeFileSync(file, out); fixed++; }
}
console.log(`robots-meta: una etiqueta robots por página (${fixed} corregidas)`);
