import React, { useEffect, useRef, useState } from "react";

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
  const [options, setOptions] = useState({});
  const fakeRef = useRef(true);

  useEffect(() => {
    if (fakeRef.current) {
      fakeRef.current = false;
    } else {
      if (options.query && page === 1) {
        const runFetch = async () => {
          setFetching(true);
          const { repos, pages } = TransformApiResult(await Fetch(options));
          setPages(pages);
          setRepos(repos);
          setFetching(false);
        };
        runFetch();
      }

      if (options.query && page !== 1) {
        setPage(1);
      }
    }
  }, [options, fakeRef]);

  useEffect(() => {
    if (options.query) {
      const runFetch = async () => {
        setFetching(true);
        const { repos, pages } = TransformApiResult(await Fetch(options, page));
        setPages(pages);
        setRepos(repos);
        setFetching(false);
      };

      runFetch();
    }
  }, [page]);

  return (
    <>
      <div className="app">
        <h1>GitHub Repository Listing</h1>
        <Form onSearch={setOptions} />
        {fetching && <div className="loading">Loading</div>}
        {!fetching && <Pagination pages={pages} current={page} onChange={setPage} />}
        <div className="list">
          {repos.map(i =>  <Repository key={i.url} {...i} />)}
        </div>
      </div>
    </>
  );
}
