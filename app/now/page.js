import { marked } from "marked";
import { getPage } from "@/lib/content";
import ClosingCta from "@/components/ClosingCta";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Now · Samuel Ngobi" };

export default function Now() {
  const { content } = getPage("now");
  return (
    <div>
      <PageHeader title="Now" />
      <div
        className="prose mt-5"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      />

      <ClosingCta
        title="Have something for me?"
        body="I'm taking on new freelance work and open to full-time roles. If your project fits, tell me about it and I'll reply within 4 hours."
        cta="Get in touch"
      />
    </div>
  );
}
