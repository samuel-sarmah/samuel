import { EMAIL } from "@/lib/nav";

export const metadata = { title: "Privacy · Samuel Ngobi" };

export default function Privacy() {
  return (
    <div>
      <h1 className="display text-[clamp(2.2rem,5.5vw,3rem)]">Privacy</h1>
      <div className="mt-5 max-w-[54ch] space-y-4 text-[17px]">
        <p>
          This site doesn't run analytics or tracking scripts of any kind. Nothing is collected just
          from browsing.
        </p>
        <p>
          The only cookie is a single random ID, set once you like a post under{" "}
          <a href="/writings" className="link">Writings</a>, so a repeat like from the same
          browser doesn't count twice. It isn't used for tracking or advertising, and no account
          or sign-in is involved.
        </p>
        <p>
          The dark/light theme toggle is stored in your browser's local storage, not a cookie. It
          never leaves your device.
        </p>
        <p>
          If you'd like a like removed, email{" "}
          <a href={`mailto:${EMAIL}`} className="link">{EMAIL}</a> and I'll take care of it.
        </p>
      </div>
    </div>
  );
}
