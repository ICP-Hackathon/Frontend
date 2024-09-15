import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Camera } from "lucide-react";

const CreateCustomAISheet = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "All",
    "Education",
    "Health & Fitness",
    "Entertainment",
    "Social networking",
    "Business",
    "Developer tools",
    "Graphics & Design",
    "Others",
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-full py-4 bg-primary-50 text-primary-900 hover:bg-primary-700 rounded-full flex items-center justify-center">
          <Plus className="mr-4" size={24} />
          Create Custom AI
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[calc(100vh-4rem)] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold flex-grow text-center">
              Create Custom AI
            </h2>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-6">
            <div className="flex justify-center">
              <div className="relative size-20 bg-primary-900 rounded-full overflow-hidden">
                <input
                  type="file"
                  id="ai-image"
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="ai-image"
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <Plus size={32} className="text-white" />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                AI Name
              </label>
              <input
                type="text"
                id="nickname"
                className="w-full p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
                placeholder="Name your AI"
              />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? "text-primary-900 bg-primary-50 border-2 border-primary-900"
                        : "text-primary-900 bg-primary-50 border-2 border-transparent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border py-2 px-4">
                <h3 className="font-semibold mb-2 pb-2 border-b">
                  Introduction
                </h3>
                <textarea
                  placeholder="Add a short description"
                  className="w-full text-gray-600 bg-transparent resize-none focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="bg-white rounded-lg border py-2 px-4">
                <h3 className="font-semibold mb-2">Source</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Comment: Write a comment"
                    className="w-full text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none focus:border-primary-900"
                  />
                  <input
                    type="text"
                    placeholder="URL: Input URL"
                    className="w-full text-gray-600 bg-transparent focus:outline-none focus:border-primary-900"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg border py-2 px-4">
                <h3 className="font-semibold mb-2">Examples</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Provide an example to initiate the conversation"
                    className="w-full text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none focus:border-primary-900"
                  />
                  <input
                    type="text"
                    placeholder="Click to edit"
                    className="w-full text-gray-600 bg-transparent focus:outline-none focus:border-primary-900"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border-t">
            <button className="w-full py-4 bg-primary-50 text-primary-900 hover:bg-primary-700 rounded-full flex items-center justify-center">
              Create
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCustomAISheet;
