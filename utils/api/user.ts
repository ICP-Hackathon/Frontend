export async function loginUser(address: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: address }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

export async function fetchChatList(user_address: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/${user_address}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response body:", errorText);
    throw new Error(
      `Failed to fetch chat list: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
