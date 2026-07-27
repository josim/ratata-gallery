import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectCategory = "exhibition" | "production";
export type ProjectRole = "Curated" | "Booth" | "Tech Lead" | "Platform";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Artwork = {
  title: string;
  artist: string;
  image: string;
};

export type ArtworkSection = {
  heading: string;
  items: Artwork[];
};

export type ProjectFrontmatter = {
  title: string;
  year: number;
  dates?: string;
  venue?: string;
  city?: string;
  category: ProjectCategory;
  role: ProjectRole;
  order?: number;
  featured?: boolean;
  artists?: string[];
  credits?: { label: string; value: string }[];
  images?: string[];
  artworkSections?: ArtworkSection[];
  links?: ProjectLink[];
};

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
};

function readProjectFile(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    ...(data as ProjectFrontmatter),
    slug,
    content,
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files
    .map((file) => readProjectFile(path.basename(file, ".mdx")))
    .filter((p): p is Project => p !== null);

  // Projects with an explicit `order` sort by it (curated sequence, e.g. the
  // exhibitions); the rest fall back to newest-first.
  return projects.sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return b.year - a.year;
  });
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

export function getProjectBySlug(slug: string): Project | null {
  return readProjectFile(slug);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}
