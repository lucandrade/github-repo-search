import React from "react";

import Form from "./Components/Form/Form";
import Repository from "./Components/Listing/Repository";

export default function App() {
  return (
    <>
      <div className="app">
        <Form />
        <div className="list">
          <Repository
            avatarUrl={"https://avatars2.githubusercontent.com/u/96857?v=4"}
            url={"https://avatars2.githubusercontent.com/u/96857?v=4"}
            name={"First Repo"}
            description={"here's a great description."} />
        </div>
      </div>
    </>
  );
}
