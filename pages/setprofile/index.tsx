import { useState } from "react";
import { useRouter } from "next/router";
import CountrySelect from "@/components/setprofile/CountrySelect";
import { ChevronDown } from "lucide-react";

interface UserIconProps {
  className?: string;
}

const UserIcon = ({ className }: UserIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
    />
    <path
      d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
    />
  </svg>
);

const SetProfilePage = () => {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState(0);

  const profileImages = [
    "/path-to-profile-image-1.png",
    "/path-to-profile-image-2.png",
    "/path-to-profile-image-3.png",
  ];

  return (
    <div className="max-w-[600px] min-h-screen bg-white flex flex-col px-6">
      <div className="py-4 flex-shrink-0">
        <div className="text-3xl text-gray-900 font-bold mb-4">
          Complete your profile
        </div>
        <p className="text-lg text-gray-600 mb-8">Select a profile picture!</p>
      </div>

      <div className="flex-grow overflow-y-auto px-4 pb-4">
        <div className="size-32 bg-gray-200 rounded-full mb-4 mx-auto flex items-center justify-center">
          {selectedProfile === 0 ? (
            <UserIcon className="text-gray-400" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileImages[selectedProfile - 1]}
              alt="Selected profile"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {profileImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedProfile(index + 1)}
              className={`size-16 rounded-full overflow-hidden border-2 ${
                selectedProfile === index + 1
                  ? "border-primary-900"
                  : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`Profile ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              className="w-full p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
              placeholder="Name"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                className="w-full p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none appearance-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <CountrySelect />

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="flex">
              <input
                type="text"
                id="country-code"
                className="w-20 p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
                defaultValue="+86"
              />
              <input
                type="tel"
                id="phone"
                className="flex-1 p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
                placeholder="000-0000-0000"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 flex-shrink-0">
        <button
          type="submit"
          className="w-full bg-primary-900 text-white py-4 rounded-full font-medium"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SetProfilePage;
