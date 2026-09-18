import { marked } from "marked";
import { getPage } from "@/lib/content";
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
    </div>
  );
}
