// Run after npm run build: node scripts/check-portfolio.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync("out/index.html", "utf8");
const projects = readFileSync("out/projects.html", "utf8");
const contact = readFileSync("out/contact.html", "utf8");
for (const service of ["Website design", "Photo editing", "Video editing", "Digital marketing", "SEO"]) {
  assert.ok(home.includes(service), `Home is missing ${service}`);
  assert.ok(contact.includes(service), `Contact is missing ${service}`);
}
for (const page of [home, projects, contact]) {
  assert.ok(page.includes("Sagar Nepali"));
  assert.ok(page.includes("alexsagar07@gmail.com"));
  assert.ok(!/UI\/UX|Workspace &amp; Developer Terminal/.test(page));
}
assert.equal((home.match(/class="project-card project-card-/g) || []).length, 5);
assert.equal((projects.match(/class="project-card project-card-/g) || []).length, 5);
assert.ok(home.includes("project-heading-track"), "Pinned project heading is missing");
assert.ok(contact.includes('type="email"'), "Contact email validation is missing");
assert.ok(contact.includes("Create email draft"));
console.log("Portfolio checks passed: three pages, five projects, five services, and contact details.");
