export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  subtitle: string;
  description: string;
  content: string;
};

type RawPost = string;

const files = import.meta.glob<RawPost>(
  "../content/posts/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);

  if (!match) {
    return {
      metadata: {} as Record<string, string>,
      content: raw,
      subtitle: "",
      description: "",
    };
  }

  const [, frontmatter, content] = match;

  const metadata: Record<string, string> = {};

  for (const line of frontmatter.split("\n")) {
    const separator = line.indexOf(":");

    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    value = value.replace(/^["']|["']$/g, "");

    metadata[key] = value;
  }

  return {
    metadata,
    content,
    subtitle: metadata.subtitle ?? "",
    description: metadata.description ?? "",
  };
}

function slugFromPath(path: string) {
  return path
    .split("/")
    .pop()
    ?.replace(/\.md$/, "") ?? "";
}

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { metadata, content, subtitle, description } = parseFrontmatter(raw);

    return {
      slug: slugFromPath(path),
      title: metadata.title ?? "Sem título",
      date: metadata.date ?? "",
      category: metadata.category ?? "POST",
      subtitle,
      description,
      content,
    };
  })
  .sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
