import "server-only";

import { Resolver } from "node:dns/promises";

const LOCAL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const DOMAIN = /^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

const RESERVED = new Set([
  "example.com", "example.net", "example.org", "example.edu",
  "test.com", "test.net", "test.org",
  "localhost", "invalid", "example", "test", "local", "localdomain",
  "domain.com", "email.com", "mail.com", "yourdomain.com", "mydomain.com",
]);

const DISPOSABLE = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "sharklasers.com",
  "10minutemail.com", "10minutemail.net", "tempmail.com", "temp-mail.org",
  "throwawaymail.com", "trashmail.com", "trashmail.net", "yopmail.com",
  "getnada.com", "dispostable.com", "maildrop.cc", "fakeinbox.com",
  "mintemail.com", "mailnesia.com", "mytemp.email", "discard.email",
  "spamgourmet.com", "mailcatch.com", "tempinbox.com", "emailondeck.com",
  "moakt.com", "tmpmail.org", "burnermail.io", "mohmal.com",
]);

const resolver = new Resolver({ timeout: 4000, tries: 2 });

const FATAL_DNS = new Set(["ENOTFOUND", "ENODATA", "NXDOMAIN"]);

async function hasMailHost(domain) {
  try {
    const mx = await resolver.resolveMx(domain);
    if (mx.length > 0) return { deliverable: true };
  } catch (cause) {
    if (!FATAL_DNS.has(cause.code)) return { deliverable: true, unknown: true };
  }

  for (const lookup of ["resolve4", "resolve6"]) {
    try {
      const records = await resolver[lookup](domain);
      if (records.length > 0) return { deliverable: true };
    } catch (cause) {
      if (!FATAL_DNS.has(cause.code)) return { deliverable: true, unknown: true };
    }
  }

  return { deliverable: false };
}

export async function validateEmailAddress(email) {
  if (email.length > 254) return "That email address is too long.";

  const at = email.lastIndexOf("@");
  if (at < 1 || at === email.length - 1)
    return "That email address doesn't look right.";

  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();

  if (local.length > 64 || domain.length > 255 || !LOCAL.test(local) || !DOMAIN.test(domain))
    return "That email address doesn't look right.";

  if (RESERVED.has(domain))
    return "Please use a valid email address for a quick reply.";

  if (DISPOSABLE.has(domain))
    return "Please use a permanent email address rather than a temporary one.";

  const { deliverable } = await hasMailHost(domain);
  if (!deliverable)
    return `No mail server is set up for "${domain}", please check the address.`;

  return null;
}
