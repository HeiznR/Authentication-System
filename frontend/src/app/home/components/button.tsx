"use client";
import { useGoogleLogin } from "@react-oauth/google";

import React from "react";

export const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });
  return <div onClick={() => login()}>Sign in with Google 🚀</div>;
};
