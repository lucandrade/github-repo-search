import React, { useEffect, useRef, useState } from "react";

import Fetch from "./Functions/Fetch";
import Form from "./Components/Form/Form";
import Repository from "./Components/Listing/Repository";
import TransformApiResult from "./Functions/TransformApiResult";

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
        const { repos } = TransformApiResult(await Fetch(options));
        setRepos(repos);
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
        <h1>GitHub Repository Listing</h1>
        <Form onSearch={setOptions} />
        {fetching && <div className="loading">Loading</div>}
        <div className="list">
          {repos.map(i =>  <Repository key={i.url} {...i} />)}
        </div>
      </div>
    </>
  );
}
