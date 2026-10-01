// @vitest-environment node
import { expect, it, vi } from "vitest";
import { GET } from "./route";

it("returns fresh health JSON with the deployment SHA or its fallback", async () => {
  vi.useFakeTimers();
  try {
    for (const [vercelSha, gitSha, expectedSha] of [
      ["deployment-sha", "git-sha", "deployment-sha"],
      [undefined, "git-sha", "git-sha"],
      [undefined, undefined, "unknown"],
    ]) {
      vi.stubEnv("VERCEL_GIT_COMMIT_SHA", vercelSha);
      vi.stubEnv("GIT_SHA", gitSha);
      vi.setSystemTime(new Date("2026-10-01T12:00:00.000Z"));
      const response = GET();

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toContain("application/json");
      expect(response.headers.get("Cache-Control")).toBe("no-store");
      expect(await response.json()).toEqual({
        ok: true,
        sha: expectedSha,
        ts: "2026-10-01T12:00:00.000Z",
      });

      vi.advanceTimersByTime(1000);
      expect(await GET().json()).toEqual({
        ok: true,
        sha: expectedSha,
        ts: "2026-10-01T12:00:01.000Z",
      });
    }
  } finally {
    vi.unstubAllEnvs();
    vi.useRealTimers();
  }
});
