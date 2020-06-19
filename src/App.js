import React, { useEffect, useRef, useState } from "react";

import Fetch from "./Functions/Fetch";
import Form from "./Components/Form/Form";
import Repository from "./Components/Listing/Repository";

export default function App() {
  const [repos, setRepos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState({});
  const fakeRef = useRef(true);

  useEffect(() => {
    if (fakeRef.current) {
      fakeRef.current = false;
    } else {
      const runFetch = async () => {
        setFetching(true);
        const result = await Fetch(options);
        setRepos(result);
        setFetching(false);
      };

      if (options.query) {
        runFetch();
      }
    }
  }, [options, fakeRef]);

  return (
    <>
      <div className="app">
        <Form onSearch={setOptions} />
        {fetching && <div className="loading">Loading</div>}
        <div className="list">
          {repos.map(i =>  <Repository key={i.url} {...i} />)}
        </div>
      </div>
    </>
  );
}
