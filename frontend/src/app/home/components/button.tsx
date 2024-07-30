"use client";
import { gql } from "@apollo/client";
import { useGoogleLogin } from "@react-oauth/google";
import { useSuspenseQuery } from "@apollo/client";

import React from "react";

export const GoogleButton = () => {
  const getUsers = gql`
    query {
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
  const { data } = useSuspenseQuery(getUsers);
  console.log("data", data);
  // const getTokens = gql`
  //   query GetTokens {
  //     getGoogleCode {
  //       tokens
  //     }
  //   }
  // `;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {},
    flow: "auth-code",
  });
  return <div onClick={() => login()}>Sign in with Google 🚀</div>;
};
