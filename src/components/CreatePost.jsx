import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import PostForm, { defaultPost } from "./PostForm";

export default function CreatePost() {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);

  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState(null);

  const handleSubmit = async (data) => {
    // console.log("This data", data);
    setBusy(true);
    const { error, post } = await createPost(data);

    setBusy(false);
    // console.log("This data", data.get('slug'));

    // console.log("Tierror", error.message);
    if (error)
      return updateNotification("error", `Problem Submitting Form : ${error} `);

    setResetAfterSubmit(true);

    navigate(`/update-post/${post.slug}`);

    // navigate(`/update-post/${data.get('slug')}`);
  };

  useEffect(() => {
    const result = localStorage.getItem("blogPost");
    if (!result) return;

    const oldPost = JSON.parse(result);
    setPostInfo({ ...defaultPost, ...oldPost });
  }, []);

  return (
    <PostForm
      onSubmit={handleSubmit}
      initialPost={postInfo}
      busy={busy}
      postBTNTitle={"Post"}
      resetAfterSubmit={resetAfterSubmit}
    />
  );
}
