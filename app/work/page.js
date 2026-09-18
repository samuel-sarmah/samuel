import ClosingCta from "@/components/ClosingCta";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/projects";

export const metadata = { title: "Work · Samuel Ngobi" };

export default function Work() {
  return (
    <div>
      <PageHeader
        title="Work"
        intro="A few things I've built. Every project links to the live site or the source code."
      />
      <div className="mt-12 space-y-16">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} project={p} headingLevel={2} />
        ))}
      </div>

      <ClosingCta
        title="Need something like this?"
        body="Every project above started as a short message. Tell me what you need shipped, and I'll reply within 4 hours with how I'd approach it."
        cta="Tell me what you need"
      />
    </div>
  );
}
