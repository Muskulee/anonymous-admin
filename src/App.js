import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";

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
      ></div>

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
              <Route path="/" element={<Home />}/>
           </Routes>
        </div>
      </div>
    </div>
  );
}
