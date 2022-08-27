import React from "react";
import { ImSpinner11, ImEye, ImFilePicture, ImFilesEmpty } from "react-icons/im";

export default function CreatePost() {
  return (
    <form className="p-2">
      <div className="w-9/12 h-screen space-y-3 flex flex-col">

      {/* Title and Submit */}
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
      {/* Featured CheckBox  */}
      <div>
        <input id="featured" type="checkbox" hidden />
        <label
          className="flex items-center space-x-2 text-gray-700 cursor-pointer group"
          htmlFor="featured"
        >
          <div className="w-4 h-4 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:border-teal-500">
            <div className="w-2 h-2 rounded-full bg-gray-700  group-hover:bg-teal-500" />
          </div>
          <span className="group-hover:text-teal-500">Featured</span>
        </label>
      </div>

      {/* Title Input */}

      <input
        type="text"
        className="text-xl outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full"
        placeholder="Post Title"
      />

      {/* Image Input */}

      <div className="flex space-x-2">
        <div>
          <input id="image-input" type="file" hidden />
          <label
            htmlFor="image-input"
            className="flex items-center space-x-2 px-3 ring-1
       ring-gray-500 rounded h-10 text-gray-500
        hover:text-white hover:bg-gray-500 
        transition cursor-pointer"
          >
            <span> Place Image</span>
            <ImFilePicture />
          </label>
        </div>

        <div className="flex-1 flex bg-gray-400
        justify-between rounded overflow-hidden">
          <input
            type="text"
            value="We buildingbbxhdxb nnk jcjhbd bs db"
            className="bg-transparent px-2 text-white w-full"
            disabled
          />
          <button className="text-xs flex
          flex-col items-center justify-center p-1
          self-stretch bg-gray-700 text-white">
            <ImFilesEmpty />
            <span>
            copy

            </span>
          </button>
        </div>
      </div>

      <input
        type="text"
        className="text-xl outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full"
        placeholder="Post Title"
      />

      <textarea
        placeholder="## Mark Down"
        className="resize-none outline-none focus:ring-1 ring-teal-500 
        rounded p-2 w-full flex-1
        font-mono tracking-wide text-lg
        "
      ></textarea>
      {/* tags input */}
      <div>
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          className=" outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full"
          placeholder="Post Title"
        />
      </div>
      {/* Text area */}
      <div>
        <label htmlFor="meta">Meta Description</label>
        <textarea
          id="meta"
          placeholder="Meta Description"
          className="resize-none outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full font-semibold h-28"
        ></textarea>
      </div>
      </div>
    </form>
  );
}
