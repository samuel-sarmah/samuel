import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT = path.join(process.cwd(), "content");

export function getPage(name) {
  const file = path.join(CONTENT, `${name}.md`);
  if (!fs.existsSync(file)) return { data: {}, content: "" };
  return matter(fs.readFileSync(file, "utf8"));
}
