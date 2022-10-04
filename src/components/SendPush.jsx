import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { sendPushMessage } from "../api/push";
import { useNotification } from "../context/NotificationProvider";
import PushForm from "./PushForm";

function SendPush() {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);

//   const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, push } = await sendPushMessage(data);

    setBusy(false);

    if (error)
      return updateNotification("error", `Problem Submitting Form : ${error} `);

    updateNotification(
      "success",
      `Broadcast Sent Successfully! Send Another! `
    );

    setResetAfterSubmit(true);
  };

  return (
    <PushForm
      postBTNTitle={"Broadcast"}
      busy={busy}
      onSubmit={handleSubmit}
      resetAfterSubmit={resetAfterSubmit}
    />
  );
}

export default SendPush;
