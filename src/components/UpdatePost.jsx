import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import NotFound from "./NotFound";
import PostForm from "./PostForm";

export default function UpdatePost() {
  const { slug } = useParams();

  const { updateNotification } = useNotification();
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);

    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    }

    // console.log("post", post);

    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = async (data) => {
    setBusy(true);
    const {error, post} = await updatePost(postInfo.id, data);

    setBusy(false);

    if (error)
      return updateNotification("error", `Problem Submitting Form : ${error} `);

    setPostInfo({ ...post, tags: post.tags?.join(", ") });

    setBusy(false);
    // navigate(`/update-post/${post.slug}`);

    // setResetAfterSubmit(true);
    // navigate(`/update-post/${data.get('slug')}`);
  };

  if (notFound) return <NotFound />;

  return (
    <PostForm
      onSubmit={handleSubmit}
      initialPost={postInfo}
      postBTNTitle={"Update"}
      busy={busy}
    />
  );
}
