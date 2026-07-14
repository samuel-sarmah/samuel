import { marked } from "marked";
import { getPage } from "@/lib/content";

export const metadata = { title: "Now · Samuel Ngobi" };

export default function Now() {
  const { content } = getPage("now");
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">Now</h1>
      <div
        className="prose mt-5"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      />
    </div>
  );
}
