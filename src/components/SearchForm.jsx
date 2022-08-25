import React from "react";

export default function SearchForm() {
  return (
    <form>
      <input
        placeholder="Search..."
        className="border border-gray-500 outline-none rounded p-1 focus:ring-1 ring-blue-500 w-56"
      />
    </form>
  );
}
