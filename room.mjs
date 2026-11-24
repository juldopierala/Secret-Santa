import { getStore } from "@netlify/blobs";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers });
}

export default async (request) => {
  const url = new URL(request.url);
  const room = url.searchParams.get("room") || "";

  if (!/^[a-zA-Z0-9_-]{3,35}$/.test(room)) {
    return json({ error: "Invalid room id" }, 400);
  }
  if (request.method !== "GET" && request.method !== "PUT") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const store = getStore("secret-santa-rooms");
    if (request.method === "GET") {
      const value = await store.get(room, { type: "json" });
      if (!value) return json({ error: "Room not found" }, 404);
      return json(value);
    }

    const data = await request.json();
    if (!data || typeof data !== "object" || data.roomId !== room ||
        !data.assignments || !data.drawn || !data.pins) {
      return json({ error: "Invalid room data" }, 400);
    }
    await store.setJSON(room, data);
    return json({ ok: true, updatedAt: data.updatedAt || Date.now() });
  } catch (error) {
    console.error("Secret Santa room storage error:", error);
    return json({ error: "Shared storage unavailable" }, 500);
  }
};
