const WORKER_URL = "https://utilitorium-counter.sriramsharma-dev.workers.dev";

export async function fetchViews(toolId: string): Promise<number> {
  try {
    const res = await fetch(`${WORKER_URL}?id=${encodeURIComponent(toolId)}`);
    const data = await res.json();
    return data.views ?? 0;
  } catch (err) {
    console.error(`Failed to fetch views for ${toolId}:`, err);
    return 0;
  }
}

export async function incrementViews(toolId: string): Promise<number> {
  // Avoid inflating counts during local pnpm dev
  if (import.meta.env.DEV) {
    return 0;
  }

  try {
    const res = await fetch(`${WORKER_URL}?id=${encodeURIComponent(toolId)}`, {
      method: "POST",
    });
    const data = await res.json();
    return data.views ?? 0;
  } catch (err) {
    console.error(`Failed to increment views for ${toolId}:`, err);
    return 0;
  }
}