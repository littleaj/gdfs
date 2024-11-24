import './App.css'
import GoogleAuthConfig from './model/GoogleAuthConfig'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'

function App() {
  const apiConfig: GoogleAuthConfig = {
    api_key: process.env['api_key'] as string,
    client_id: process.env['client_id'] as string,
  };

  return (
    <>
      <header>
        <h1>GDFS</h1>
        <p className="subtitle"></p>
      </header>
      <div className="card">
        <LoginButton />
        <LogoutButton />
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

