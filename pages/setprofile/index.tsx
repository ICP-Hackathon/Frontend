/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import CountrySelect from "@/components/setprofile/CountrySelect";
import { ChevronDown, User } from "lucide-react"; // Import the User icon from lucide-react

const SetProfilePage = () => {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState(0);

  const profileImages = [
    "https://suietail.s3.ap-southeast-2.amazonaws.com/1.png",
    "https://suietail.s3.ap-southeast-2.amazonaws.com/2.png",
    "https://suietail.s3.ap-southeast-2.amazonaws.com/3.png",
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
        <div className="size-32 bg-gray-200 rounded-full mb-4 mx-auto flex items-center justify-center overflow-hidden">
          {selectedProfile === 0 ? (
            <User className="text-gray-400 w-16 h-16" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileImages[selectedProfile - 1]}
              alt="Selected profile"
              className="w-full h-full object-cover transform scale-150 translate-y-[-10%]" // Scale and move image up
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
              <img
                src={img}
                alt={`Profile ${index + 1}`}
                className="w-full h-full object-cover transform scale-150 translate-y-[-10%]" // Scale and move image up
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
