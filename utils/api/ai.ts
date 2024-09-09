export async function fetchTopAIs() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/top10/`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchSearchAIs(name: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/search/${name}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAIDetails(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchAILogs(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ailogs/ai/${id}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function createAI(aiData: {
  name: string;
  creator: string;
  category: string;
  introductions: string;
  contents: string;
  logs: string;
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/`, {
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/myais/${userid}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
