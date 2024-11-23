import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' //NOSONAR
import './App.css'
import GoogleApiConfig from './model/GoogleApiConfig'
import UIStateManager from './services/UIStateManager'
import AppController from './services/AppController'
import { useGoogleApiServices } from './hooks/GoogleApiServices'

function App() {
  const apiConfig: GoogleApiConfig = {
    apiKey: "", // TODO
    clientId: "", // TODO
  }

  const [count, setCount] = useState(0)
  const [uiController, setUiController] = useState<UIStateManager>();
  const [appController, setAppController] = useState<AppController>();

  const services = useGoogleApiServices();

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

