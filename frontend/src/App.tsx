import React from "react";

import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      surname
      subscribers {
        name
        surname
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (data) console.log("data", data);

  if (loading) {
    return <div>{"loading"}</div>;
  }

  if (error) {
    return <div>{"error"}</div>;
  }

  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
