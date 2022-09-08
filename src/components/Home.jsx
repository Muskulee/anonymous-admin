import React, { useEffect, useState } from "react";
import { deletePost, getPosts } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import { useSearch } from "../context/SearchProvider";
import PostCard from "./PostCard";

let pageNo = 0;

const postLimit = 9;

const getPaginationCount = (length) => {
  const division = length / postLimit;

  if (division % 1 !== 0) {
    return Math.floor(division) + 1;
  }

  return division;
};

export default function Home() {
  const { searchResult } = useSearch();

  const [posts, setPosts] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState([]);

  const { updateNotification } = useNotification();

  const paginationCount = getPaginationCount(totalPostCount);

  const paginationArray = new Array(paginationCount).fill("");

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, postLimit);

    // console.log("posts", posts);
    if (error) return updateNotification("error", error);

    setPosts(posts);
    setTotalPostCount(postCount);
  };

  useEffect(() => {
    fetchPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts();
  };
  const handleDelete = async ({ id }) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;
    const { error, message } = await deletePost(id);
    // if (error) return console.log("error", error);
    if (error) return updateNotification("error", error);

    updateNotification("success", message);

    const newPosts = posts.filter((p) => p.id !== id);
    setPosts(newPosts);
  };

  return (
    <div className="md:flex sm:flex">
      <div className="grid lg:grid-cols-3 gap-3 pb-5 
      ">
        {searchResult.length
          ? searchResult.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={() => handleDelete(post)}
                />
              );
            })
          : posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteClick={() => handleDelete(post)}
                />
              );
            })}
      </div>
      {paginationArray.length > 1 && !searchResult.length ? (
        <div className="py-5 flex justify-center items-center space-x-3">
          {paginationArray.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  fetchMorePosts(index);
                }}
                className={
                  index === pageNo
                    ? "text-teal-500 border-b-2 border-b-teal-500"
                    : "text-gray-500 "
                }
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
