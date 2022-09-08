import React from "react";
import dateformat from "dateformat";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function PostCard({ post, onDeleteClick }) {
  if (!post) return null;

  const {
    title,
    slug,
    id,
    thumbnail,
    author,
    tags,
    meta,
    createdAt,
    content,
    likeCount,
    commentCount,
  } = post;

  return (
    <div className= " bg-white shadow-sm rounded flex flex-col p-8 lg:m-0 m-8">
      <img
        className="box-size aspect-video"
        src={thumbnail || "./logo.png"}
        alt={title}
      />

      <div className="p-2 flex-1 flex flex-col justify-between">
        <h1 className="text-lg font-semibold text-gray-700">{title}</h1>

        <p className="text-gray-500">{meta.substring(0, 80) + "..."}</p>

        <div className="flex justify-between py-2">
          <p className="text-gray-500 text-sm">
            {dateformat(createdAt, "mediumDate")}
          </p>
          <p className="text-gray-500 text-sm">{tags.join(", ")}</p>
        </div>

        <div className="flex space-x-3">
          <Link
            to={`/update-post/${slug}`}
            className="w-8 h-8 rounded-full bg-teal-400  hover:bg-teal-700 flex justify-center items-center text-white"
          >
            <BsPencilSquare />
          </Link>
          <button
            onClick={onDeleteClick}
            className="w-8 h-8 rounded-full bg-red-400 hover:bg-red-700 flex justify-center items-center"
          >
            <BsTrash />
          </button>
        </div>
      </div>

      {/* <p>{likeCount}</p>
      <p>{commentCount}</p> */}
    </div>
  );
}
