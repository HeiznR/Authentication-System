"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  gql,
  skipToken,
  useLazyQuery,
  useLoadableQuery,
  useMutation,
  useQuery,
  useReadQuery,
} from "@apollo/client";
import { useGoogleLogin } from "@react-oauth/google";
import { useSuspenseQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers($code: String!) {
    getUsers(code: $code) {
      id
      userName
      name
      surname
      email
      password
    }
  }
`;
// const CREATE_SESSION = gql`
//   query createSession($code: String!) {
//     createSession(code: $code) {
//       token
//     }
//   }
// `;

export const GoogleButton = () => {
  const [code, setCode] = useState("");
  const { data: data2 } = useSuspenseQuery(
    GET_USERS,
    code.length !== 0 ? { variables: { code } } : skipToken
  );
  console.log("data2", data2);

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
