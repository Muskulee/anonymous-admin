import React, { useEffect, useState } from "react";
import {
  ImSpinner11,
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
  ImSpinner3,
} from "react-icons/im";
import { uploadImage } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import DeviceView from "./DeviceView";
import MarkdownHints from "./MarkdownHints";

export const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
  likeCount: "",
  commentCount: "",
};

export default function PostForm({
  initialPost,
  busy,
  onSubmit,
  postBTNTitle,
  resetAfterSubmit,
}) {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");
  const [imageURLToCopy, setImageURLToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState("");
  const [displayMarkDownHint, setDisplayMarkDownHint] = useState(false);
  const [showDeviceView, setShowDeviceView] = useState(false);

  const { updateNotification } = useNotification();

  useEffect(() => {
    //    console.log('initialPost', initialPost)

    if (initialPost) {
      setPostInfo({ ...initialPost });

      setSelectedThumbnailURL(initialPost?.thumbnail);
    }

    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [initialPost, resetAfterSubmit]);

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;

    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image")) {
        return alert("This is not an image file");
      }

      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }
    // if (name === "thumbnail") {
    //   const file = target.files[0];
    //   if (!file.type?.includes("image")) {
    //     return alert("This is not an image file");
    //   }

    //   setPostInfo({ ...postInfo, thumbnail: value });
    //   return setSelectedThumbnailURL(URL.createObjectURL(file));
    // }

    if (name === "featured") {
      localStorage.setItem(
        "blogPost",
        JSON.stringify({ ...postInfo, featured: checked })
      );
      return setPostInfo({ ...postInfo, [name]: checked });
    }

    if (name === "tags") {
      const newTags = tags.split(",");
      if (newTags.length > 4)
        updateNotification("warning", "Only First Four Tags Will Be Used!");
      // console.log("");
    }
    if (name === "meta" && meta.length >= 150) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    }
    const newPost = { ...postInfo, [name]: value };

    setPostInfo({ ...newPost });
    localStorage.setItem("blogPost", JSON.stringify(newPost));
  };

  const handleImageUpload = async ({ target }) => {
    const file = target.files[0];

    if (imageUploading) return;

    if (!file.type?.includes("image")) {
      return updateNotification("error", "This is not an image!");
    }

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const { error, image } = await uploadImage(formData);
    setImageUploading(false);

    if (error) return updateNotification("error", error);

    setImageURLToCopy(image);
  };

  const handleOnCopy = () => {
    const textToCopy = `![Add image description](${imageURLToCopy})`;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      author,
      createdAt,
      content,
      featured,
      tags,
      meta,
      likeCount,
      postCount,
    } = postInfo;

    if (!title.trim()) return updateNotification("error", "Title is missing!");
    if (!content.trim())
      return updateNotification("error", "Content is missing!");
    if (!tags.trim()) return updateNotification("error", "Tags is missing!");
    if (!meta.trim())
      return updateNotification("error", "Meta Description  is missing!");

    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, " ")
      .split(" ")
      .filter((item) => item.trim())
      .join("-");

    const newTags = tags
      .split(",")
      .map((item) => item.trim())
      .splice(0, 4);

    const formData = new FormData();
    const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };
    for (let key in finalPost) {
      formData.append(key, finalPost[key]);
    }

    onSubmit(formData);

    // if (resetAfterSubmit) resetForm();
  };

  const resetForm = () => {
    setPostInfo({ ...defaultPost });
    localStorage.removeItem("blogPost");
  };

  const {
    title,
    author,
    createdAt,
    content,
    featured,
    tags,
    meta,
    likeCount,
    postCount,
  } = postInfo;

  return (
    <>
      <form onSubmit={handleSubmit} className="p-2 flex">
        <div className="w-9/12 h-screen space-y-3 flex flex-col">
          {/* Title and Submit */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">
              Create New Post
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
              <button
                onClick={() => setShowDeviceView(true)}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 ring-teal-500 rounded h-10 text-teal-500 hover:text-white hover:bg-teal-500 transition"
              >
                <ImEye />
                <span> View</span>
              </button>
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
          <div className="flex">
            <input
              name="featured"
              value={featured}
              onChange={handleChange}
              id="featured"
              type="checkbox"
              hidden
            />
            <label
              className=" select-none flex items-center space-x-2 text-gray-700 cursor-pointer group"
              htmlFor="featured"
            >
              <div className="w-4 h-4 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:border-teal-500">
                {featured && (
                  <div className="w-2 h-2 rounded-full bg-gray-700  group-hover:bg-teal-500" />
                )}
              </div>
              <span className="group-hover:text-teal-500">Featured</span>
            </label>
          </div>

          {/* Title Input */}

          <input
            value={title}
            name="title"
            onChange={handleChange}
            onFocus={() => setDisplayMarkDownHint(false)}
            type="text"
            className="text-xl outline-none focus:ring-1
           ring-teal-500 rounded p-2 w-full"
            placeholder="Post Title"
          />

          {/* Image Input */}

          <div className="flex space-x-2">
            <div>
              <input
                onChange={handleImageUpload}
                id="image-input"
                type="file"
                hidden
              />
              <label
                htmlFor="image-input"
                className="flex items-center space-x-2 px-3 ring-1
                  ring-gray-500 rounded h-10 text-gray-500
                    hover:text-white hover:bg-gray-500 
                    transition cursor-pointer"
              >
                <span>Place Image</span>
                {!imageUploading ? (
                  <ImFilePicture />
                ) : (
                  <ImSpinner3 className="animate-spin" />
                )}
              </label>
            </div>

            {imageURLToCopy && (
              <div
                className="flex-1 flex bg-gray-400
        justify-between rounded overflow-hidden"
              >
                <input
                  type="text"
                  onChange={handleChange}
                  value={imageURLToCopy}
                  className="bg-transparent px-2 text-white w-full"
                  disabled
                />
                <button
                  onClick={handleOnCopy}
                  type="button"
                  className="text-xs flex
                flex-col items-center justify-center p-1
                self-stretch bg-gray-700 text-white"
                >
                  <ImFilesEmpty />
                  <span>copy</span>
                </button>
              </div>
            )}
          </div>

          {/* <input
          type="text"
          className="text-xl outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full"
          placeholder="Post Title"
        /> */}

          <textarea
            value={content}
            onChange={handleChange}
            onFocus={() => setDisplayMarkDownHint(true)}
            name="content"
            placeholder="## Mark Down"
            className="resize-none outline-none focus:ring-1 ring-teal-500 
        rounded p-2 w-full flex-1
        font-mono tracking-wide text-lg
        "
          ></textarea>
          {/* tags input */}
          <div>
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
          </div>
          {/* Text area */}
          <div>
            <label className="text-gray-500" htmlFor="meta">
              Meta Description {meta?.length} / 150
            </label>
            <textarea
              onChange={handleChange}
              value={meta}
              name="meta"
              id="meta"
              placeholder="Meta Description"
              className="resize-none outline-none focus:ring-1 ring-teal-500 rounded p-2 w-full font-semibold h-28"
            ></textarea>
          </div>
        </div>

        <div className="w-1/4 px-2 relative">
          <h1
            className="text-xl font-semibold
         text-gray-700 mb-2"
          >
            Thumbnail
          </h1>
          <div>
            <input
              name="thumbnail"
              type="file"
              onChange={handleChange}
              hidden
              id="thumbnail"
            />
            <label className="cursor-pointer" htmlFor="thumbnail">
              {selectedThumbnailURL ? (
                <img
                  src={selectedThumbnailURL}
                  className="aspect-video shadow-sm rounded"
                  alt=""
                />
              ) : (
                <div
                  className="border border-dashed
             border-gray-500 aspect-video text-gray-500
             flex flex-col justify-center items-center"
                >
                  <span>Select Thumbnail </span>
                  <span className="text-xs">Recommended Size </span>
                  <span className="text-xs">1280 * 720 </span>
                </div>
              )}
            </label>
          </div>

          {/* Markdown Rules */}

          <div className=" absolute top-1/2 -translate-y-1/2 px-2 py-4 rounded">
            {displayMarkDownHint && <MarkdownHints />}
          </div>
        </div>
      </form>

      <DeviceView
        title={title}
        content={content}
        thumbnail={selectedThumbnailURL}
        visible={showDeviceView}
        onClose={() => setShowDeviceView(false)}
      />
    </>
  );
}
