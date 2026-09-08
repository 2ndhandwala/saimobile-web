/**
 * Self-check for lib/analytics.ts classifyClick(). Run: node scripts/analytics-classify-check.mjs
 * Kept as a plain .mjs (no ts-node, no test runner) to stay zero-dep.
 * If lib/analytics.ts changes, sync the regexes below or fold in a build step.
 */
import assert from "node:assert/strict";

function classifyClick(href) {
  if (/^https?:\/\/(?:www\.|api\.)?wa\.me\//i.test(href)) return { name: "whatsapp_click", params: {} };
  if (/^tel:/i.test(href)) return { name: "phone_click", params: {} };
  if (/^mailto:/i.test(href)) return { name: "email_click", params: {} };
  if (/instagram\.com/i.test(href)) return { name: "social_click", params: { platform: "instagram" } };
  if (/youtube\.com|youtu\.be/i.test(href)) return { name: "social_click", params: { platform: "youtube" } };
  if (/maps\.google|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href)) return { name: "maps_click", params: {} };
  return null;
}

assert.equal(classifyClick("https://wa.me/919755666024?text=hi")?.name, "whatsapp_click");
assert.equal(classifyClick("tel:+919755666024")?.name, "phone_click");
assert.equal(classifyClick("mailto:contact@2ndhandwala.com")?.name, "email_click");
assert.deepEqual(classifyClick("https://www.instagram.com/2ndhandwala"), {
  name: "social_click",
  params: { platform: "instagram" },
});
assert.deepEqual(classifyClick("https://youtu.be/abc"), {
  name: "social_click",
  params: { platform: "youtube" },
});
assert.equal(classifyClick("https://maps.app.goo.gl/xyz")?.name, "maps_click");
assert.equal(classifyClick("/about"), null);
assert.equal(classifyClick("https://example.com"), null);

console.log("analytics classify check ok");
