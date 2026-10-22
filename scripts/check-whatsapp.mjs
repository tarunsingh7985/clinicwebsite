import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = readFileSync(new URL("../src/lib/whatsapp.ts", import.meta.url), "utf8");
const output = ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 });
const mockClinic = { clinic: { name: "Sample Clinic", doctorName: "Dr. Sample", whatsappNumber: "12125550148" } };
const module = { exports: {} };
new Function("require", "module", "exports", output)((id) => {
  if (id === "@/config/clinic") return mockClinic;
  throw new Error(`Unexpected import: ${id}`);
}, module, module.exports);

const url = module.exports.createWhatsAppUrl({
  name: "Alex Morgan",
  phone: "+1 212 555 0100",
  date: "2026-11-02",
  time: "Morning (9 am–12 pm)",
  service: "Back & Neck Pain",
});
const parsed = new URL(url);
const message = parsed.searchParams.get("text");
assert.equal(parsed.origin, "https://wa.me");
assert.equal(parsed.pathname, "/12125550148");
assert.match(message, /Name: Alex Morgan/);
assert.match(message, /Phone: \+1 212 555 0100/);
assert.match(message, /Preferred date: 2026-11-02/);
assert.match(message, /Preferred time: Morning \(9 am–12 pm\)/);
assert.match(message, /Selected service: Back & Neck Pain/);
assert.match(message, /subject to confirmation by the clinic/);
console.log("WhatsApp booking URL passed: configured number, encoded appointment fields, and confirmation note are present.");
