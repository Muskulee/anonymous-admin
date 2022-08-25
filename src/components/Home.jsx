import React, { useEffect, useState } from "react";
import { getPosts } from "../api/post";

let pageNo = 0;

const postLimit = 9;

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { error, posts } = await getPosts(pageNo, postLimit);

    if (error) return console.log("error", error);

    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {posts.map((post) => {
        return <PostCard post={post} />;
      })}
    </div>
  );
}
