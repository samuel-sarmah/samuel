import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import ProcessSteps from "@/components/ProcessSteps";
import Section from "@/components/Section";

export const metadata = { title: "Contact · Samuel Ngobi" };

export default function Contact() {
  return (
    <div>
      <PageHeader
        title="Contact"
        intro="Thanks for reaching out!"
      />

      <div className="mt-10 max-w-[36rem]">
        <ContactForm />
      </div>

      <Section title="What happens next">
        <ProcessSteps />
      </Section>
    </div>
  );
}
