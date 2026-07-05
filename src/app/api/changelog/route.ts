import { getChangelog } from "@/lib/changelog";

export const dynamic = "force-dynamic";

export async function GET() {
  const changelog = await getChangelog();

  return Response.json(changelog, {
    status: changelog.error ? 502 : 200,
  });
}
