import BookCover from "@/components/BookCover";
import ClosingCta from "@/components/ClosingCta";
import PageHeader from "@/components/PageHeader";
import { BOOK_GROUPS } from "@/lib/books";

export const metadata = { title: "Books · Samuel Ngobi" };

export default function Books() {
  return (
    <div>
      <PageHeader
        title="Books"
        intro={
          <>
            My reading list is a mix of software and thinking clearly and making better
            decisions, drawn from{" "}
            <a
              href="https://www.rationality.org/resources/reading-list"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              CFAR's rationality reading list ↗
            </a>
            . These are the books I keep coming back to and recommend most. Each cover links
            out so you can grab a copy.
          </>
        }
      />

      <div className="mt-12 space-y-12">
        {BOOK_GROUPS.map((group, i) => (
          <section key={i}>
            <ul>
              {group.books.map((b) => (
                <li key={b.slug} className="flex gap-5 py-6 first:pt-1">
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={b.title}
                    className="shrink-0"
                  >
                    <BookCover slug={b.slug} title={b.title} />
                  </a>
                  <div className="min-w-0 flex-1">
                    <h3 className="item-title">
                      <a href={b.url} target="_blank" rel="noreferrer" className="hover:opacity-70">
                        {b.title}
                      </a>
                    </h3>
                    {b.author && (
                      <p className="text-[14px] text-[var(--muted)]">{b.author}</p>
                    )}
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
                      {b.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ClosingCta
        title="Building something?"
        body="Reading is how I think; shipping is what I do. If you have a project that needs a developer, tell me about it and I'll reply within 4 hours."
        cta="Start a project"
      />
    </div>
  );
}
