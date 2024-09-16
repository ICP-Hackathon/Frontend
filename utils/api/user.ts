const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addUser(userData: {
  user_address: string;
  nickname: string;
  image_url?: string;
  gender?: string;
  country?: string;
  phone?: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_address: userData.user_address,
        nickname: userData.nickname,
        image_url: userData.image_url || "",
        gender: userData.gender || "",
        country: userData.country || "",
        phone: userData.phone || "",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return await response.json();
}

export async function fetchUser(user_address: string) {
  const response = await fetch(`${API_BASE_URL}/users/exists/${user_address}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
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
