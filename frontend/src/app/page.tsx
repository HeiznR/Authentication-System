import { getClient } from "@/config/apollo-server";
import { gql } from "@apollo/client";
import { GoogleButton } from "./home/components/button";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default async function Home() {
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
  //proof of concept
  // try {
  //   const { data } = await getClient().query({ query: getUsers });
  //   Odata = data;
  // } catch (error) {
  //   console.log("error", error);
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
        <GoogleButton />
      </GoogleOAuthProvider>
    </main>
  );
}
