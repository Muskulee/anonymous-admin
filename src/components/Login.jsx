import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../api/auth";
import { useAuth } from "../context/AuthProvider";
import { useNotification } from "../context/NotificationProvider";
import LoginForm from "./LoginForm";

export default function Login() {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);

  const { setLogIn } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // console.log("This data", data);
    setBusy(true);
    const { error, user } = await logIn(data);

    if (error)
      return updateNotification(
        "error",
        `Problem Granting You Access : ${error} `
      );

    setLogIn(user);
    setBusy(false);
    localStorage.setItem("token", user.token);
    navigate(`/`);
  };



  return (
    <LoginForm
      onSubmit={handleSubmit}
      busy={busy}
      postBTNTitle={"Access"}
      // resetAfterSubmit={resetAfterSubmit}
    />
  );
}
