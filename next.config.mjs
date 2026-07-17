/** @type {import('next').NextConfig} */
const nextConfig = {
  // ~/package-lock.json (a home-dir Cypress install) makes Next guess the
  // wrong workspace root; pin it to this repo.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
