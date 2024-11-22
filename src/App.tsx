import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' //NOSONAR
import './App.css'
import ApiManager from './controllers/ApiManager'
import GoogleApiConfig from './model/GoogleApiConfig'
import AuthManager from './controllers/AuthManager'

function App() {
  const apiConfig: GoogleApiConfig = {
    apiKey: "", // TODO
    clientId: "", // TODO
  }

  const [count, setCount] = useState(0)
  const apiMgmt: ApiManager = new ApiManager();
  const authMgmt: AuthManager = new AuthManager();

  useEffect(() => {
    // const gsiScript = document.createElement("script");
    const gapiScript = document.createElement("script");
    gapiScript.onload = null; // TODO
  }, []);

  // <script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
  //   <script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
