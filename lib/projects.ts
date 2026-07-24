import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectCategory = "exhibition" | "fair" | "tech" | "platform";
export type ProjectRole = "Curated" | "Booth" | "Tech Lead" | "Platform";

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectFrontmatter = {
  title: string;
  year: number;
  dates?: string;
  venue?: string;
  city?: string;
  category: ProjectCategory;
  role: ProjectRole;
  featured?: boolean;
  artists?: string[];
  images?: string[];
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

  return projects.sort((a, b) => b.year - a.year);
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
