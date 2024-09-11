import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import { AIModel } from "@/utils/interface";
import { MyAIs } from "@/components/MyAIs";

// Main SettingsPage Component
const SettingsPage: React.FC = () => {
  const { user } = useUserStore();
  const [myAIs, setMyAIs] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.userid) {
      fetchMyAIProfiles();
    }
  }, [user?.userid]);

  const fetchMyAIProfiles = async () => {
    if (!user?.userid) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/myais/${user?.userid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch AI profiles");
      }
      const data = await response.json();

      if (data && Array.isArray(data.ais)) {
        setMyAIs(data.ais);
      } else {
        throw new Error("Unexpected data format from API");
      }
    } catch (error) {
      console.error("Error fetching AI profiles:", error);
      setError("Failed to load AI profiles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAI = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this AI?")) {
      try {
        const response = await fetch(`http://localhost:8000/ai/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setMyAIs((prevAIs) => prevAIs.filter((ai) => ai.id !== id));
          alert("AI deleted successfully");
        } else {
          throw new Error("Failed to delete AI");
        }
      } catch (error) {
        console.error("Error deleting AI:", error);
        alert("Failed to delete AI. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-2">My AIs and Earnings</h2>
        <p className="text-gray-600 mb-4">
          Manage your AI profiles and collect earnings.
        </p>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <div className="space-y-4">
            {myAIs.length > 0 ? (
              myAIs.map((ai) => (
                <MyAIs
                  key={ai.id}
                  {...ai}
                  onDelete={() => handleDeleteAI(ai.id)}
                />
              ))
            ) : (
              <p>No AI profiles found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SettingsPage;

export async function getServerSideProps() {
  return {
    props: {
      title: "Settings",
    },
  };
}
