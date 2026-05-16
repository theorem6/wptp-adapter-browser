import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { importHarJson } from "../src/index.js";

describe("HAR import", () => {
  it("imports mini.har.json", () => {
    const har = JSON.parse(readFileSync(join(import.meta.dirname, "..", "fixtures", "mini.har.json"), "utf8"));
    const expected = JSON.parse(readFileSync(join(import.meta.dirname, "..", "fixtures", "ir-v0", "mini.json"), "utf8"));
    expect(importHarJson(har, "mini-har")).toEqual(expected);
  });
});
