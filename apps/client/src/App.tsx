import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import Render from "./Render";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
function App() {
  const [count, setCount] = useState(0);

  const [message, setMessage] = React.useState();

  const [loading, setLoading] = React.useState(false);
  const controller = new AbortController();
  const ourRequest = axios.CancelToken.source(); // <-- 1st step

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3005?count=${count}`, {
        // signal: controller.signal,
        cancelToken: ourRequest.token, // <-- 2nd step
      })
      .then((response) => {
        setMessage(response.data);
      })
      .finally(() => setLoading(false));

    return () => {
      // controller.abort();
      ourRequest.cancel(); // <-- 3rd step
    };
  }, [count]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is ---- {count} --- {message}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Render />
    </>
  );
}

export default App;
