import DriveOperations from "../model/DriveOperations";
import { ObservableDelegate, ObserveableFacade, createObservableDelegate } from "../model/ObservableDelegate";

export default class DriveAppController implements ObserveableFacade<DriveOperations> {
  readonly #api: DriveOperations;
  public readonly list: ObservableDelegate<DriveOperations["list"]>;
  public readonly delete: ObservableDelegate<DriveOperations["delete"]>;
  public readonly upload: ObservableDelegate<DriveOperations["upload"]>;
  public readonly download: ObservableDelegate<DriveOperations["download"]>;

  constructor(api: DriveOperations) {
    this.#api = api;
    this.list = createObservableDelegate(this.#api.list);
    this.delete = createObservableDelegate(this.#api.delete);
    this.download = createObservableDelegate(this.#api.download);
    this.upload = createObservableDelegate(this.#api.upload);
  }
  
}