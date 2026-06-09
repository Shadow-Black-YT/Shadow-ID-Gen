import { describe, it, expect } from "vitest";
import { ALL_TEMPLATES, SIGNATURE_TEMPLATES } from "@/types/idcard";

describe("id card catalogs", () => {
  it("generates the advertised template and signature counts", () => {
    expect(ALL_TEMPLATES).toHaveLength(216);
    expect(SIGNATURE_TEMPLATES).toHaveLength(54);
  });
});
