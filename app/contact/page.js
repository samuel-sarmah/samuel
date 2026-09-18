import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import ProcessSteps from "@/components/ProcessSteps";
import Section from "@/components/Section";
import { EMAIL } from "@/lib/nav";

export const metadata = { title: "Contact · Samuel Ngobi" };

export default function Contact() {
  return (
    <div>
      <PageHeader
        title="Contact"
        intro="Tell me what you're building or what's broken: a stalled build, a slow site, or an idea that needs to go live. I read every message and reply within 4 hours."
      />

      <div className="mt-10 max-w-[36rem]">
        <ContactForm />
      </div>

      <p className="mt-8 text-[14px] text-[var(--muted)]">
        Prefer email?{" "}
        <a href={`mailto:${EMAIL}`} className="link">
          {EMAIL}
        </a>
      </p>

      <Section title="What happens next">
        <ProcessSteps />
      </Section>
    </div>
  );
}
