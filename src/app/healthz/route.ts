export function GET() {
  return Response.json(
    {
      ok: true,
      sha: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_SHA || "unknown",
      ts: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
