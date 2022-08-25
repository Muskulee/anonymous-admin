import React from "react";
import { ImSpinner11, ImEye } from "react-icons/im";

export default function CreatePost() {
  return (
    <form>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Create New Post</h1>

        <div className="flex items-center space-x-5">
          <button className="flex items-center space-x-2 px-3 ring-1 ring-teal-500 rounded h-10 text-teal-500 hover:text-white hover:bg-teal-500 transition">
            <ImSpinner11 />
            <span> Reset</span>
          </button>
          <button className="flex items-center space-x-2 px-3 ring-1 ring-teal-500 rounded h-10 text-teal-500 hover:text-white hover:bg-teal-500 transition">
            <ImEye />
            <span> View</span>
          </button>
          <button className="h-10 w-36 px-5 hover:ring-1 bg-teal-500 rounded text-white hover:text-teal-500 hover:bg-transparent ring-teal-500 transition">

            <span> Post</span>
          </button>
        </div>
      </div>
    </form>
  );
}
