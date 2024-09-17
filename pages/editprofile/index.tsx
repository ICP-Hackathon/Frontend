/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CountrySelect from "@/components/setprofile/CountrySelect";
import { UserRound } from "lucide-react";
import { updateUser } from "@/utils/api/user";
import GenderSelect from "@/components/setprofile/GenderSelect";
import { useUserStore } from "@/store/userStore";
import { useWallet } from "@suiet/wallet-kit";
import Image from "next/image";

const EditProfilePage = () => {
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const wallet = useWallet();
  const router = useRouter();

  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setGender(user.gender || "");
      setCountry(user.country || "");
      setPhone(user.phone || "");
      if (user.image_url) {
        const index = profileImages.findIndex((img) => img === user.image_url);
        setSelectedProfile(index !== -1 ? index + 1 : 0);
      }
    }
  }, [user]);

  const profileImages = [
    "https://suietail.s3.ap-southeast-2.amazonaws.com/1.png",
    "https://suietail.s3.ap-southeast-2.amazonaws.com/2.png",
    "https://suietail.s3.ap-southeast-2.amazonaws.com/3.png",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!wallet.address) {
      setError("Wallet address is not available");
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
        user_address: wallet.address,
        ...(selectedProfile > 0 && {
          image_url: profileImages[selectedProfile - 1],
        }),
        ...(gender && { gender }),
        ...(country && { country }),
        ...(phone && { phone }),
      };

      const result = await updateUser(userData);
      console.log("User profile updated:", result);
      setUser(result);
      router.push("/mypage");
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen bg-white flex flex-col px-6">
      <div className="py-4 flex-shrink-0">
        <div className="text-3xl text-gray-900 font-bold mb-4">
          Edit your profile
        </div>
        <p className="text-lg text-gray-600 mb-8">
          Update your profile information
        </p>
      </div>

      <div className="flex-grow overflow-y-auto pb-4">
        <div className="size-32 bg-gray-200 rounded-full mb-4 mx-auto flex items-center justify-center overflow-hidden">
          {selectedProfile === 0 ? (
            <UserRound className="text-gray-400 size-24" />
          ) : (
            <Image
              src={profileImages[selectedProfile - 1]}
              alt="Selected profile"
              width={128}
              height={128}
              className="object-cover transform scale-150 translate-y-[-10%]"
            />
          )}
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {profileImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedProfile(index + 1)}
              className={`size-16 rounded-full overflow-hidden border-2 bg-gray-200 ${
                selectedProfile === index + 1
                  ? "border-primary-900"
                  : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`Profile ${index + 1}`}
                width={64}
                height={64}
                className="object-cover transform scale-150 translate-y-[-10%]"
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <GenderSelect value={gender} onChange={setGender} />
          <CountrySelect value={country} onChange={setCountry} />

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
              placeholder="+1 123-456-7890"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="pb-6 flex-shrink-0">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-900 text-white py-4 rounded-full font-medium disabled:bg-gray-400"
            >
              {isLoading ? "Updating Profile..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
