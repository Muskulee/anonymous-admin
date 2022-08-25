import React, { useEffect, useState } from "react";
import { getPosts } from "../api/post";
import PostCard from "./PostCard";

let pageNo = 0;

const postLimit = 9;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState([]);

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, postLimit);

    console.log('posts', posts)
    if (error) return console.log("error", error);

    setPosts(posts);
    setTotalPostCount(postCount);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}
