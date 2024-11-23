import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' //NOSONAR
import './App.css'
import ApiManager from './controllers/ApiManager'
import GoogleApiConfig from './model/GoogleApiConfig'
import UIController from './controllers/UIController'
import AppController from './controllers/AppController'
import GoogleAuthManager from './controllers/GoogleAuthManager'
import GoogleApiManager from './controllers/GoogleApiManager'
import { ObservableAuthManager } from './controllers/AuthManager'
import { PlainFunction } from './model/UtilityTypes'

function App() {
  const apiConfig: GoogleApiConfig = {
    apiKey: "", // TODO
    clientId: "", // TODO
  }

  const [count, setCount] = useState(0)
  const [uiController, setUiController] = useState<UIController>();
  const [appController, setAppController] = useState<AppController>();

  useGoogleApi()

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
function useGoogleApi() {
  const [authManager, setAuthManager] = useState<ObservableAuthManager>()
  const [apiManager, setApiManager] = useState<ApiManager>()

  type EventInfo = { target: string, verb: string };
  const createFailureHandler = ({ target, verb }: EventInfo, reject: (reason?: any) => void) => (e: ErrorEvent) => {
    console.error(`${target} failed to ${verb}: `, e.message)
    console.error(e.error)
    reject(new Error(e.message));
  }

  const createSuccessHandler = ({ target, verb }: EventInfo, resolve: PlainFunction<[GIS], void>) => () => {
    const auth = window.google.accounts.oauth2
    console.info(`${verb} ${target} successful: `, !!auth)
    resolve(auth)
  }

  useEffect(() => {
    const gsiScript = document.getElementById("script-gsi") as HTMLScriptElement

    const loadGsi = async () => {
      const loader = new Promise<GIS>((resolve, reject) => {
        const opInfo = {
          target: "GIS",
          verb: "load",
        };
        gsiScript.addEventListener("error", createFailureHandler(opInfo, reject));
        gsiScript.addEventListener("load", createSuccessHandler(opInfo, resolve))
      })
      const auth = await loader
      setAuthManager(new GoogleAuthManager(auth))
    }
    loadGsi()

    return () => {
      authManager?.logout()
    }
  }, []);

  useEffect(() => {
    const gapiScript = document.getElementById("script-gapi") as HTMLScriptElement
    const loadGapi = async () => {
      const loader = new Promise<GAPI>((resolve, reject) => {
        const opInfo = {
          target: "GAPI",
          verb: "load",
        };
        gapiScript.addEventListener("error", createFailureHandler(opInfo, reject));
        gapiScript.addEventListener("error", (e) => {
          console.error("GAPI could not load: ", e.message)
          console.error(e.error)
          reject(new Error(e.message))
        })
        gapiScript.addEventListener("load", () => {
          const api = window.gapi
          console.info("Loaded GAPI: ", !!api)
          resolve(api)
        })

      })
      const api = await loader
      setApiManager(new GoogleApiManager(api))
    }
    loadGapi()
  }, []);

  return {
    authManager,
    apiManager
  }
}

