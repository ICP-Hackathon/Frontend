import React from "react";
import { useRouter } from "next/router";
import { ArrowLeft, Clipboard, Pencil, ChevronDown, User } from "lucide-react";
import CountrySelect from "@/components/setprofile/CountrySelect";

const SetProfilePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="max-w-[600px] min-h-screen bg-white flex flex-col">
      <div className="p-4 flex-shrink-0">
        <button onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-6 h-6 text-black" />
        </button>

        <h1 className="text-3xl font-bold mb-2 flex items-center">
          Complete your profile <Clipboard className="w-6 h-6 ml-2" />
        </h1>
        <p className="text-gray-600 mb-8">Please enter your profile.</p>
      </div>

      <div className="flex-grow overflow-y-auto px-4 pb-4">
        <div className="relative w-24 h-24 bg-gray-200 rounded-full mb-8 mx-auto flex items-center justify-center">
          <User className="w-16 h-16 text-gray-400" />
          <div className="absolute bottom-0 right-0 bg-primary-900 rounded-full p-2">
            <Pencil className="w-4 h-4 text-primary-0" />
          </div>
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
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
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
            <input
              type="tel"
              id="phone"
              className="w-full p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
            />
          </div>
        </form>
      </div>

      <div className="p-4 flex-shrink-0">
        <button
          type="submit"
          className="w-full bg-primary-900 text-primary-0 py-3 rounded-full font-medium"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SetProfilePage;