"use client";
import React, { useState } from "react";
import { gql, skipToken } from "@apollo/client";
import { useGoogleLogin } from "@react-oauth/google";
import { useSuspenseQuery } from "@apollo/client";

const CREATE_SESSION = gql`
  query createSession($code: String!) {
    createSession(code: $code) {
      accessToken
    }
  }
`;

export const GoogleButton = () => {
  const [code, setCode] = useState("");
  const { data } = useSuspenseQuery(
    CREATE_SESSION,
    code.length !== 0 ? { variables: { code } } : skipToken
  );
  console.log("data", data);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setCode(codeResponse.code);
    },
    flow: "auth-code",
  });

  return (
    <div>
      <div onClick={() => login()}>{"Sign in with Google 🚀"}</div>
    </div>
  );
};
