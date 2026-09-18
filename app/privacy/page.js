import { EMAIL } from "@/lib/nav";

export const metadata = { title: "Privacy · Samuel Ngobi" };

export default function Privacy() {
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">Privacy</h1>
      <div className="mt-5 max-w-[54ch] space-y-4 text-[17px]">
        <p>
          This site doesn't run analytics or tracking scripts of any kind, and it sets no
          cookies. Nothing is collected just from browsing.
        </p>
        <p>
          If you send a message through the{" "}
          <a href="/contact" className="link">contact form</a>, the name, email address and
          message you type are stored so I can reply. They're used for nothing else and are
          never shared.
        </p>
        <p>
          The dark/light theme toggle is stored in your browser's local storage, not a cookie. It
          never leaves your device.
        </p>
        <p>
          If you'd like a message you sent deleted, email{" "}
          <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a> and I'll take care of it.
        </p>
      </div>
    </div>
  );
}
