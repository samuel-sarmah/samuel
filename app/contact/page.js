import ContactForm from "@/components/ContactForm";
import { EMAIL } from "@/lib/nav";

export const metadata = { title: "Contact · Samuel Ngobi" };

export default function Contact() {
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">Contact</h1>
      <p className="mt-4 max-w-[54ch] text-[16px] text-[var(--muted)]">
        Tell me what you&apos;re building or what&apos;s broken — a stalled
        build, a slow site, or an idea that needs to go live. I read every
        message and reply within 4 hours.
      </p>

      <div className="mt-10 max-w-[36rem]">
        <ContactForm />
      </div>

      <p className="mt-8 text-[14px] text-[var(--muted)]">
        Prefer email?{" "}
        <a href={`mailto:${EMAIL}`} className="link">
          {EMAIL}
        </a>
      </p>
    </div>
  );
}
