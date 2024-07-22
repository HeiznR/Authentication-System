import { getClient } from "@/config/apollo-server";
import { gql } from "@apollo/client";

export default function Home() {
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

  getClient()
    .query({ query: getUsers })
    .then((data) => console.log("data", data));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {"test"}
    </main>
  );
}
