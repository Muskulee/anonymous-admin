import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useNotification } from "../context/NotificationProvider";

export default function LoginForm({
  busy,
  onSubmit,
  postBTNTitle,
  resetAfterSubmit,
}) {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === "user_name") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    // console.log("true", true);
    e.preventDefault();

    if (!user_name.trim())
      return updateNotification("error", "Username is missing!");
    if (!password.trim())
      return updateNotification("error", "Password is missing!");
    if (password < 6)
      return updateNotification("error", "Password Is Too SHORT!");

    await onSubmit({ user_name, password });
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit} className="flex"> */}
      <div
        className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-teal-700 to-red-100 overflow-hidden"
      >
        <form
          className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5 "
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <img
              className="w-14"
              src="./logo.png"
              alt=""
              height={100}
              width={100}
            />
          </div>
          {/* <h1 className="text-center text-xm">Admin Login</h1> */}
          <div className="flex flex-col space-y-2">
            {/* <label className="text-sm font-light" for="email">
                Username
              </label> */}
            <input
              className="lgw-96 px-3 py-2 rounded-md border border-slate-400 outline-teal-500/50"
              type="text"
              value={user_name}
              onChange={handleChange}
              placeholder="Admin Username"
              name="user_name"
              id="username"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col space-y-2">
            {/* <label className="text-sm font-light" for="password">
                Password
              </label> */}
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400 outline-4 outline-teal-500/50"
              type="password"
              onChange={handleChange}
              value={password}
              placeholder="Admin Password"
              name="password"
              id="password"
              autoComplete="off"
            />
          </div>

          {/* <div>
              <input type="checkbox" name="remember" id="remember" />
              <label className="text-sm font-light" for="remember">
                Remember me
              </label>
            </div> */}

          <button
            className="w-full px-10 py-2 bg-teal-600 text-white rounded-md
            hover:bg-teal-500 hover:drop-shadow-md duration-300 ease-in outline-4"
            // onClick={handleSubmit}
          >
            {busy ? (
              <ImSpinner3 className="animate-spin mx-auto text-xl" />
            ) : (
              postBTNTitle
            )}
          </button>
        </form>
      </div>
      {/* </form> */}
    </>
  );
}
