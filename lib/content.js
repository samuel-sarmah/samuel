import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT = path.join(process.cwd(), "content");

export function getWritings() {
  const dir = path.join(CONTENT, "writings");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title || f,
        date: data.date || "",
        summary: data.summary || "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWriting(slug) {
  return getWritings().find((w) => w.slug === slug) || null;
}

export function getPage(name) {
  const file = path.join(CONTENT, `${name}.md`);
  if (!fs.existsSync(file)) return { data: {}, content: "" };
  return matter(fs.readFileSync(file, "utf8"));
}
