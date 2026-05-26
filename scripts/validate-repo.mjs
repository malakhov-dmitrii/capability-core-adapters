import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const markdownFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.name.endsWith(".md")) {
      markdownFiles.push(fullPath);
    }
  }
}

walk(root);

const missingLinks = [];
const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;

for (const filePath of markdownFiles) {
  const text = fs.readFileSync(filePath, "utf8");

  for (const match of text.matchAll(markdownLinkPattern)) {
    const href = match[1].split("#")[0];

    if (
      !href ||
      /^[a-z][a-z0-9+.-]*:/i.test(href) ||
      href.startsWith("mailto:")
    ) {
      continue;
    }

    const target = path.normalize(path.join(path.dirname(filePath), href));

    if (!fs.existsSync(target)) {
      missingLinks.push(`${path.relative(root, filePath)} -> ${match[1]}`);
    }
  }
}

const skillIssues = [];
const skillFiles = markdownFiles.filter((filePath) => {
  return path.basename(filePath) === "SKILL.md";
});

for (const filePath of skillFiles) {
  const text = fs.readFileSync(filePath, "utf8");
  const relative = path.relative(root, filePath);

  if (!text.startsWith("---\n")) {
    skillIssues.push(`${relative}: missing YAML frontmatter`);
  }

  if (!/\nname: [^\n]+/.test(text)) {
    skillIssues.push(`${relative}: missing name`);
  }

  if (!/\ndescription: [^\n]+/.test(text)) {
    skillIssues.push(`${relative}: missing description`);
  }
}

const failures = [...missingLinks, ...skillIssues];

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      markdownFiles: markdownFiles.length,
      skillFiles: skillFiles.map((filePath) => path.relative(root, filePath)),
      missingLinks: 0,
      skillIssues: 0
    },
    null,
    2
  )
);

