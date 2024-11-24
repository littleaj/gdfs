import './App.css'
import GoogleAuthConfig from './model/GoogleAuthConfig'
import { useGoogleServices } from './hooks/GoogleServices'
import { ApplciationCommands, DriveItem, useApplicationCommands, useUiStateReducer } from './hooks/ApplicationCommands'
import { UiStateContext } from './model/contexts/UiStateContext'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { OperationResponse } from './model/operations/Operation'

function App() {
  const apiConfig: GoogleAuthConfig = {
    api_key: process.env['api_key'] as string,
    client_id: process.env['client_id'] as string,
  };

  const services = useGoogleServices(apiConfig);
  const [uiState, dispatchUiUpdate] = useUiStateReducer();
  const commands = useApplicationCommands(services.auth, services.api);

  // FIXME move to another file
  (function () {
    commands.login.addObserver((response: OperationResponse) => {
      if (response.success) {
        commands.listFiles();
        dispatchUiUpdate({
          action: "enable",
          id: "drive-panel",
        });
      }
    });

    commands.logout.addObserver((response: OperationResponse) => {
      const { success } = response;
      if (success) {
        dispatchUiUpdate({
          action: "reset",
          id: "drive-files"
        });
        dispatchUiUpdate({
          action: "disable",
          id: "drive-panel",
        });
      } else {
        dispatchUiUpdate({
          action: "show_dialog",
          id: "error",
          message: "Error attempting logout: " + response.message
        })
      }
    });

    commands.listFiles.addObserver((response: OperationResponse<DriveItem[]>) => {
      if (response.success && response.data) {
        dispatchUiUpdate({
          action: "populate",
          id: "drive-files",
          contents: response.data
        });
        return;
      }

      if (!response.success) {
        console.error("listFiles failed: ", response.message);
      } else {
        console.error("Missing result from successful 'listFiles'");
      }
      dispatchUiUpdate({
        action: "show_dialog",
        id: "error",
        message: "Failed to get drive update: " + response.message,
      });
    });
    // TODO configure application event observers; to update UI state
  })();



  return (
    <UiStateContext.Provider value={uiState}>
      <ApplciationCommands.Provider value={commands}>

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
      </ApplciationCommands.Provider>
    </UiStateContext.Provider>
  )
}

export default App

