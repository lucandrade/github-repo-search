import React, { useEffect, useState } from "react";

import Fetch from "./Functions/Fetch";
import Form from "./Components/Form/Form";
import Repository from "./Components/Listing/Repository";
import TransformApiResult from "./Functions/TransformApiResult";
import Pagination from "./Components/Listing/Pagination";

export default function App() {
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [failed, setFailed] = useState(false);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (options.query) {
      setPage(1);
    }
  }, [options]);

  useEffect(() => {
    if (options.query) {
      const runFetch = async () => {
        setFetching(true);
        setFailed(false);

        try {
          const { repos, pages } = TransformApiResult(await Fetch(options, page));
          setPages(pages);
          setRepos(repos);
        } catch (e) {
          setFailed(true);
        } finally {
          setFetching(false);
        }
      };

      runFetch();
    }
  }, [options, page]);

  return (
    <>
      <div className="app">
        <h1>GitHub Repository Search</h1>
        <Form disabled={fetching} onSearch={setOptions} />
        {fetching && <div className="loading">Loading</div>}
        {failed && <div className="loading">Error fetching github repositories</div>}
        {!fetching && <Pagination pages={pages} current={page} onChange={setPage} />}
        <div className="list">
          {repos.map(i =>  <Repository key={i.url} {...i} />)}
        </div>
      </div>
    </>
  );
}
