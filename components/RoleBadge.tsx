"use client";

import { useStrings } from "@/components/LangProvider";
import type { ProjectRole } from "@/lib/projects";

// DESIGN.md §5.5 — quiet-but-distinct badges: hue text + 6px marker + hairline-weight
// border at 40% opacity (via currentColor so it always matches the role hue). No solid
// fills except the active/selected state, which switches to the role's tint.
const ROLE_TEXT: Record<ProjectRole, string> = {
  Curated: "text-role-curated",
  Booth: "text-role-booth",
  "Tech Lead": "text-role-tech",
  Platform: "text-role-platform",
};

const ROLE_MARKER: Record<ProjectRole, string> = {
  Curated: "bg-role-curated",
  Booth: "bg-role-booth",
  "Tech Lead": "bg-role-tech",
  Platform: "bg-role-platform",
};

const ROLE_TINT: Record<ProjectRole, string> = {
  Curated: "bg-role-curated-tint",
  Booth: "bg-role-booth-tint",
  "Tech Lead": "bg-role-tech-tint",
  Platform: "bg-role-platform-tint",
};

export default function RoleBadge({
  role,
  active = false,
}: {
  role: ProjectRole;
  active?: boolean;
}) {
  const strings = useStrings();
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-1 font-sans text-meta uppercase ${
        ROLE_TEXT[role]
      } ${
        active
          ? `${ROLE_TINT[role]} border-current`
          : "border-[color-mix(in_srgb,currentColor_40%,transparent)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 ${ROLE_MARKER[role]}`}
      />
      {strings.roles[role]}
    </span>
  );
}
