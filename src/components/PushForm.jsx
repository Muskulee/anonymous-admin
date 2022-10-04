import React, { useEffect, useState } from "react";
import {
  ImSpinner11,
  //   ImEye,
  //   ImFilePicture,
  //   ImFilesEmpty,
  ImSpinner3,
} from "react-icons/im";
import { useNotification } from "../context/NotificationProvider";

export default function PushForm({
  initialPost,
  busy,
  onSubmit,
  postBTNTitle,
  resetAfterSubmit,
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { updateNotification } = useNotification();

  useEffect(() => {
    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [initialPost, resetAfterSubmit]);

  const handleChange = ({ target }) => {
    const { value, name } = target;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "message") {
      setMessage(value);
    }

    if (name === "message" && message.length >= 70) {
      return setMessage(value.substring(0, 70));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return updateNotification("error", "Title is missing!");
    if (!message.trim())
      return updateNotification("error", "Content is missing!");

    console.log("{title, message}", { title, message });

    onSubmit({ title, message });

    if (resetAfterSubmit) resetForm();
  };

  const resetForm = () => {
    setMessage("");
    setTitle("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="lg:p-2 lg:flex">
        <div className="lg:w-9/12 lg:h-screen space-y-3 flex flex-col lg:m-0 lg:p-0 m-2 p-2">
          {/* Title and Submit */}
          <div className="flex items-center justify-between">
            <h1 className="lg:text-xl font-semibold text-gray-700 text-sm">
              Send Update To All Users
            </h1>

            <div className="flex items-center space-x-5">
              <button
                onClick={resetForm}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 ring-teal-500 rounded h-10 text-teal-500 hover:text-white hover:bg-teal-500 transition"
              >
                <ImSpinner11 />
                <span> Reset</span>
              </button>
              {/* <button
                onClick={() => setShowDeviceView(true)}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 ring-teal-500 rounded h-10 text-teal-500 hover:text-white hover:bg-teal-500 transition"
              >
                <ImEye />
                <span> View</span>
              </button> */}
              <button className="h-10 w-36 px-5 hover:ring-1 bg-teal-500 rounded text-white hover:text-teal-500 hover:bg-transparent ring-teal-500 transition">
                {busy ? (
                  <ImSpinner3 className="animate-spin mx-auto text-xl" />
                ) : (
                  postBTNTitle
                )}
              </button>
            </div>
          </div>
          {/* Featured CheckBox  */}
          <div className="flex"></div>

          {/* Title Input */}

          <input
            value={title}
            name="title"
            onChange={handleChange}
            type="text"
            className="text-xl outline-none focus:ring-1
           ring-teal-500 rounded p-2 w-full"
            placeholder="Broadcast Title"
          />

          {/* Image Input */}

          {/* <input
          type="text"
          className="text-xl outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full"
          placeholder="Post Title"
        /> */}

          {/* <textarea
            value={content}
            onChange={handleChange}
            onFocus={() => setDisplayMarkDownHint(true)}
            name="content"
            placeholder="## Mark Down"
            className=" p-2.5 w-full tracking-wide text-sm
           bg-gray-50 rounded border border-gray-300
              focus:ring-teal-500 focus:border-teal-500
               dark:border-gray-600 dark:placeholder-gray-40
                dark:focus:ring-teal-500 dark:focus:border-teal-500 
                

                lg:resize-none lg:outline-none lg:focus:ring-1 ring-teal-500 
                lg:rounded lg:p-2  lg:flex-1
                lg:font-mono lg:tracking-wide lg:text-lg
                
                
                "

               
             
          ></textarea> */}

          {/* tags input */}
          {/* <div>
            <label className="text-gray-500" htmlFor="tags">
              Tags
            </label>
            <input
              value={tags}
              onChange={handleChange}
              name="tags"
              type="text"
              id="tags"
              className=" outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full"
              placeholder="Tag One, Tag Two"
            />
          </div> */}
          {/* Text area */}
          <div>
            <label className="text-gray-500" htmlFor="meta">
              Message {message?.length} / 70
            </label>
            <textarea
              onChange={handleChange}
              value={message}
              name="message"
              id="meta"
              placeholder="Write Message Here"
              className="resize-none outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full font-semibold h-28"
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
}
