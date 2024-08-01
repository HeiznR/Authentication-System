"use client";
import React, { useState } from "react";
import { gql, skipToken } from "@apollo/client";
import { useGoogleLogin } from "@react-oauth/google";
import { useSuspenseQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      userName
      name
      surname
      email
      password
    }
  }
`;

export const GoogleButton = () => {
  const [code, setCode] = useState("");
  const { data } = useSuspenseQuery(
    GET_USERS,
    code.length !== 0 ? {} : skipToken
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
      <div onClick={() => login()}>test</div>
    </div>
  );
};
