import { Message, ChatResponse } from "@/utils/interface";

export async function createChat(chatData: { aiid: string; userid: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatData),
    }
  );
  if (!response.ok) {
    const errorData = await response.text();
    console.error("Error response:", errorData);
    throw new Error(
      `Failed to create AI: ${response.status} ${response.statusText}\n${errorData}`
    );
  }

  return await response.json();
}

// export const fetchChatHistory = async (chatid : string) => {

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/chatcontents/${chatid}`
//     );
//     if (!response.ok) {
//       if (response.status === 404) {
//         // Chat history not found, send welcome message
//         const welcomeMessage: Message = {
//           role: "ai",
//           content: "Hello! How can I assist you?",
//           timestamp: new Date().toISOString(),
//         };
//         setMessages([welcomeMessage]);
//         await sendMessage(welcomeMessage.content, aiName);
//       } else {
//         throw new Error("Failed to fetch chat history");
//       }
//     } else {
//       const data = await response.json();
//       const formattedMessages: Message[] = data.chats.map(
//         (chat: ChatResponse) => ({
//           role: chat.senderid === user?.userid ? "user" : "ai",
//           content: chat.message,
//           timestamp: chat.createdat,
//         })
//       );
//       setMessages(formattedMessages);
//     }
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//   }
// };
