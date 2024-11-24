import { useReducer, useState } from "react";
import ApiService from "../services/ApiService";
import AuthService from "../services/AuthService";
import { dispatcherBuilder } from "../commands/CommandDispatcher";

// FIXME put different hooks in their own files

/**
 * UI elements use this to dispatch commands to application services
 */
export function useApplicationCommands(auth: AuthService, api: ApiService) {
  const [commands, /* readonly */] = useState(
    () => dispatcherBuilder()
      .withCommand("login", () => auth.login())
      .withCommand("logout", () => auth.logout())
      .withCommand("listFiles", (path: string) => api.list(path))
      .withCommand("upload", (localPath: string, remotePath: string) => api.upload(localPath, remotePath))
      .withCommand("download", (remotePath: string, localPath: string) => api.download(remotePath, localPath))
      .withCommand("delete", (remoteFile: string) => api.delete(remoteFile))
      .get()
  );
  return commands;
}

type ApplicationCommandDispatcher = ReturnType<typeof useApplicationCommands>;

export function useUiEventHandler(app: ApplicationCommandDispatcher) {
  const [commands, /* readonly */] = useState(
    () => dispatcherBuilder()
      .withCommand("clickLogin", app.login)
      .withCommand("clickLogout", app.logout)
      .withCommand("clickDownload", app.download)
      .withCommand("clickUpload", app.upload)
      .get()
  );
  return commands;
}

// type UiEventHandler = ReturnType<typeof useUiEventHandler>;

// TODO clean up typedefs

type MultiSet<K, V> = Map<K, Set<V>>;

// Q: can this be a template string?
type DrivePath = string; // NOSONAR
type DriveItemType = "file" | "folder" | "drive";
type DriveItem = {
  name: string;
  path: DrivePath;
  type: DriveItemType;
  parent?: DrivePath;
};

// TODO properly define this
export type ComponentId = string; // NOSONAR we'll make this concrete later

export type UiState = {
  disabled: Set<ComponentId>,
  drive: {
    contents: Map<DrivePath, DriveItem>;
    directories: {
      contents: MultiSet<DrivePath, DrivePath>,
      expanded: Set<DrivePath>,
    }
  }
}

const UI_UPDATE_ACTIONS = ["enable", "disable", "expand", "collapse", "reset", "populate"] as const;

type UiUpdateAction = typeof UI_UPDATE_ACTIONS[number];
type UiUpdateRequest =
  { id: ComponentId, action: UiUpdateAction, path?: DrivePath, contents?: DriveItem[] }

type UiUpdateData = Omit<UiUpdateRequest, "action">

function createInitalUiState(disabled: ComponentId[]): UiState {
  return {
    disabled: new Set<ComponentId>(disabled),
    drive: {
      contents: new Map<DrivePath, DriveItem>(),
      directories: {
        contents: new Map<DrivePath, Set<DrivePath>>(), // Q: maybe make a MultiSet class/proxy?
        expanded: new Set<DrivePath>()
      }
    }
  }
}

const clone = <T extends { [key: string]: any }>(obj: T): T => ({ ...obj });

type StateMutator = (state: UiState) => { [K in UiUpdateAction]: (data: UiUpdateData) => UiState };

const uiStateMutator: StateMutator = (state: UiState) => ({
  enable: ({ id }: UiUpdateData) => {
    return state.disabled.delete(id) ? clone(state) : state;
  },
  disable: ({ id }: UiUpdateData) => {
    state.disabled.add(id);
    return clone(state);
  },
  populate: ({ id, contents }: UiUpdateData) => {
    if (!contents || contents.length === 0 || id !== DRIVE_FILES_COMPONENT_ID) {
      return state;
    }

    function initDirectory(path: DrivePath) {
      state.drive.directories.contents.set(path, new Set<DrivePath>());
    }

    function addChild(parent: DrivePath, child: DrivePath) {
      return !!state.drive.directories.contents.get(parent)?.add(child);
    }

    contents.filter(item => item.type !== "file" && !state.drive.directories.contents.has(item.path))
      .forEach(item => initDirectory(item.path));

    contents.forEach(item => {
      state.drive.contents.set(item.path, item);
      if (item.parent && !addChild(item.parent, item.path)) {
        console.warn("That's weird... parent was not initialized: ", item.parent);
        initDirectory(item.parent);
        addChild(item.parent, item.path);
      }
    });

    return clone(state);
  },
  expand: ({ path }: UiUpdateData) => {
    if (!path) {
      return state;
    }
    state.drive.directories.expanded.add(path);
    return clone(state);
  },
  collapse: ({ path }: UiUpdateData) => {
    if (!path) {
      return state;
    }
    return state.drive.directories.expanded.delete(path) ? clone(state) : state;
  },
  reset: () => {
    return createInitalUiState([DRIVE_COMPONENTS_PANEL_ID]);
  }
});

const DRIVE_COMPONENTS_PANEL_ID = "drive-panel";
const DRIVE_FILES_COMPONENT_ID = "drive-files";

/**
 * UI components use the state to configure their attributes.
 * Application behaviors use this to update the UI based on application state.
 */
export function useUiStateReducer() {
  return useReducer((state: UiState, request: UiUpdateRequest) => {
    const mutator = uiStateMutator(state)[request.action];
    return mutator(request);
  }, [DRIVE_COMPONENTS_PANEL_ID], createInitalUiState);
}