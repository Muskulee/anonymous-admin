import React, { useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import SearchForm from "./components/SearchForm";
import UpdatePost from "./components/UpdatePost";
import { useAuth } from "./context/AuthProvider";
import axios from "axios";
import { CONSTANTS } from "./api/constants";
import SendPush from "./components/SendPush";

export default function App() {
  const [closedNav, setClosedNav] = useState(false);

  const refre = localStorage.getItem("token");

  // const { loggedIn, authUser, setLogOut, setLogIn, verifyToken } = useAuth();
  const { setLogOut, setLogIn } = useAuth();

  useEffect(() => {
    const interval = setInterval(async () => {
      const result = localStorage.getItem("token");

      if (!result) {
        setLogOut();
      }

    else{
      const { data } = await axios.post(
        `${CONSTANTS.api_url}/user/user`,
        { result },
        {
          headers: {
            "x-access-token": result,
          },
        }
      );

      if (data?.user) {
        setLogIn(data?.user);
        // console.log("data", data.user);
      } else {
        setLogOut();
      }
    }

      // console.log("result", result);
    }, 1000);
    return () => clearInterval(interval);
  }, [setLogIn, setLogOut]);

  const toggleNav = () => {
    setClosedNav(!closedNav);
  };

  const getNavWidth = () => (closedNav ? "w-16" : "w-56");

  return (
    <>
      {refre ? (
        <div className="flex">
          {/* nav section */}

          <div
            className={
              getNavWidth() +
              " min-h-screen bg-red-100 transition-width border border-right"
            }
          >
            <div className="sticky top-0">
              <Navbar closed={closedNav} setLogOut={setLogOut} />
            </div>
          </div>

          {/* content section */}

          {/* <div className="flex-1 min-h-screen bg-blue-100"> */}
          <div className="flex-1 min-h-screen bg-gray-100">
            <div className="sticky top-0">
              <div className="flex item-center p-2 space-x-2">
                <button onClick={toggleNav}>
                  {closedNav ? (
                    <AiOutlineMenuUnfold size="25" />
                  ) : (
                    <AiOutlineMenuFold size="25" />
                  )}
                </button>

                <SearchForm />
              </div>
            </div>

            {/* Create The Routes Here */}
            <div className="max-w-screen-lg mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/send-update" element={<SendPush />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update-post/:slug" element={<UpdatePost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
