const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchTrendingAIs(
  category: string,
  offset: number,
  limit: number
) {
  const response = await fetch(
    `${API_BASE_URL}/ais/trend/${category}/${offset}/${limit}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAIs(offset: number, limit: number) {
  const response = await fetch(`${API_BASE_URL}/ais/base/${offset}/${limit}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchTodayAIs() {
  const response = await fetch(`${API_BASE_URL}/ais/today_ais`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAIDetails(id: string) {
  const response = await fetch(`${API_BASE_URL}/ais/ai_id/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchSearchAIs(name: string) {
  const response = await fetch(`${API_BASE_URL}/ais/search/${name}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No results found");
    }
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAILogs(id: string) {
  const response = await fetch(`${API_BASE_URL}/ailogs/ai/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function createAI(aiData: {
  name: string;
  creator_address: string;
  category: string;
  introductions: string;
  image_url: string;
  contents: string;
  comments: string;
}) {
  const response = await fetch(`${API_BASE_URL}/ais`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aiData),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Error response:", errorData);
    throw new Error(
      `Failed to create AI: ${response.status} ${response.statusText}\n${errorData}`
    );
  }

  return await response.json();
}

export async function fetchMyAIs(userid: string) {
  const response = await fetch(`${API_BASE_URL}/ais/user/${userid}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function deleteAI(id: string) {
  const response = await fetch(`${API_BASE_URL}/ai/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete AI");
  }
  return await response.json();
}
