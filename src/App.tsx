import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' //NOSONAR
import './App.css'
import GoogleAuthConfig from './model/GoogleAuthConfig'
import { useGoogleServices } from './hooks/GoogleServices'
import { useApplicationCommands, useUiStateReducer } from './hooks/ApplicationCommands'
import { UiStateContext } from './model/contexts/UiStateContext'

function App() {
  const apiConfig: GoogleAuthConfig = {
    api_key: "", // TODO
    client_id: "", // TODO
  }

  const [count, setCount] = useState(0);

  const services = useGoogleServices(apiConfig);
  const [uiState, dispatchUiUpdate] = useUiStateReducer();
  const executor = useApplicationCommands(services.auth, services.api);

  // FIXME move to another file
  (function() {
    // TODO configure application event observers; to update UI state
  })();

  

  return (
    <>
      <UiStateContext.Provider value={uiState}>
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
      </UiStateContext.Provider>
    </>
  )
}

export default App

