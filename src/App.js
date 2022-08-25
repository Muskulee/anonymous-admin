import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import UpdatePost from "./components/UpdatePost";

export default function App() {
  const [closedNav, setClosedNav] = useState(false);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  const getNavWidth = () => (closedNav ? "w-16" : "w-56");

  return (
    <div className="flex">
      {/* nav section */}

      <div
        className={getNavWidth() + " h-screen bg-red-100 transition-width"}
      >
        <Navbar closed={closedNav} />
      </div>

      {/* content section */}

      <div className="flex-1 min-h-screen bg-blue-100">
        <button onClick={toggleNav}>
          {closedNav ? (
            <AiOutlineMenuUnfold size="25" />
          ) : (
            <AiOutlineMenuFold size="25" />
          )}
        </button>
        {/* Create The Routes Here */}
        <div className="max-w-screen-lg mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post" element={<UpdatePost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
