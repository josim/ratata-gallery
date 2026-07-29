import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DEFAULT_LANG, type Lang } from "@/lib/strings";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectCategory = "exhibition" | "production";
export type ProjectRole = "Curated" | "Booth" | "Tech Lead" | "Platform";

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  poster?: string;
  caption?: string;
  credit?: string;
};

export type Artwork = {
  title: string;
  artist: string;
  image: string;
  video?: string;
  curator?: string;
  url?: string;
};

export type ArtworkSection = {
  heading: string;
  items: Artwork[];
};

export type ArtistProfile = {
  name: string;
  image: string;
  imageAlt: string;
  imagePresentation?: "compact";
  description: string;
  url: string;
  linkLabel: string;
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
  artistProfiles?: ArtistProfile[];
  credits?: { label: string; value: string }[];
  images?: string[];
  media?: ProjectMedia[];
  primaryAction?: ProjectLink;
  artworkSections?: ArtworkSection[];
  links?: ProjectLink[];
  overviewText?: string;
};

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
};

// The English file under content/projects/ is the source of truth. A German
// variant at content/projects/de/<slug>.mdx is a partial override: its body
// replaces the English body, and any frontmatter fields it declares (e.g. a
// translated `dates`) are merged over the English ones.
function readProjectFile(slug: string, lang: Lang = DEFAULT_LANG): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  let frontmatter = data as ProjectFrontmatter;
  let body = content;

  if (lang === "de") {
    const dePath = path.join(PROJECTS_DIR, "de", `${slug}.mdx`);
    if (fs.existsSync(dePath)) {
      const deFile = matter(fs.readFileSync(dePath, "utf8"));
      frontmatter = {
        ...frontmatter,
        ...(deFile.data as Partial<ProjectFrontmatter>),
      };
      if (deFile.content.trim()) body = deFile.content;
    }
  }

  return {
    ...frontmatter,
    slug,
    content: body,
  };
}

export function getAllProjects(lang: Lang = DEFAULT_LANG): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const projects = files
    .map((file) => readProjectFile(path.basename(file, ".mdx"), lang))
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

export function getProjectsByCategory(
  category: ProjectCategory,
  lang: Lang = DEFAULT_LANG
): Project[] {
  return getAllProjects(lang).filter((p) => p.category === category);
}

export function getProjectBySlug(
  slug: string,
  lang: Lang = DEFAULT_LANG
): Project | null {
  return readProjectFile(slug, lang);
}

export function getFeaturedProjects(lang: Lang = DEFAULT_LANG): Project[] {
  return getAllProjects(lang).filter((p) => p.featured);
}
