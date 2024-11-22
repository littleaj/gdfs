import DriveOperations from "../model/DriveOperations";
import DriveAppController from "./DriveAppController";

describe("DriveAppController methods", () => {
  let controller: DriveAppController;
  const mockApi = {
    list: jest.fn(),
    delete: jest.fn(),
    download: jest.fn(),
    upload: jest.fn()
  };

  beforeEach(() => {
    controller = new DriveAppController(mockApi);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  type DelegateMapping = [keyof typeof controller, keyof typeof mockApi];
  function createBasicDelegateTest([ctrlName, apiName]: DelegateMapping) {
    return <T extends any[]>(...args: T) => {
      const obs = jest.fn();
      const methodFn = controller[ctrlName];
      methodFn.addObserver(obs);
      if (args.length === 0) {
        methodFn();
      } else {
        methodFn(...args);
      }

      const apiFn = mockApi[apiName];
      expect(apiFn.mock.calls).toHaveLength(1);
      args.forEach((arg, i) => {
        expect(apiFn.mock.calls[0][i]).toBe(arg);
      })

      expect(obs.mock.calls).toHaveLength(1);
    };
  }

  it.each([[undefined], ["test/path/to/file1"]])("refresh(...) delegates to api.list: %s",
    createBasicDelegateTest(["loadDir", "list"]));

  it.each([["test/path/to/file2"]])("delete(...) delegates to api.delete: %s",
    createBasicDelegateTest(["delete", "delete"]));

  it.each([["test/path/to/file3"]])("download(...) delegates to api.download: %s",
    createBasicDelegateTest(["download", "download"]));

  it.each([["test/path/to/local", "remote/path"]])("upload(...) delegates to api.upload: %s",
    createBasicDelegateTest(["upload", "upload"]));
});