import type { CompetitionWithCategory } from "@/types/competitions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ROOT = API_BASE_URL?.replace(/\/api\/?$/, "") || API_BASE_URL;

if (!API_ROOT) {
  // eslint-disable-next-line no-console
  console.warn(
    "[competitions api] NEXT_PUBLIC_API_BASE_URL is not set. Competition fetching will fail until it is configured."
  );
}

export async function fetchCompetitionsWithCategory(): Promise<
  CompetitionWithCategory[]
> {
  if (!API_ROOT) {
    throw new Error(
      "API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL."
    );
  }

  const response = await fetch(`${API_ROOT}/competitions/public`, {
    method: "GET",
    cache: "no-store",
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    const message =
      json?.message ||
      (Array.isArray(json?.errors) && json.errors[0]?.message) ||
      "Failed to fetch competitions.";
    throw new Error(message);
  }

  return (json.data || []) as CompetitionWithCategory[];
}

