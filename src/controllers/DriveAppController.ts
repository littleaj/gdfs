import { ObservableDelegate, ObservableFacade, createObservableDelegate } from "../model/ObservableDelegate";
import ApiManager from "./ApiManager";

export default class DriveAppController implements ObservableFacade<ApiManager> {
  readonly #api: ApiManager;
  public readonly list: ObservableDelegate<ApiManager["list"]>;
  public readonly delete: ObservableDelegate<ApiManager["delete"]>;
  public readonly upload: ObservableDelegate<ApiManager["upload"]>;
  public readonly download: ObservableDelegate<ApiManager["download"]>;

  constructor(api: ApiManager) {
    this.#api = api;
    this.list = createObservableDelegate(this.#api.list);
    this.delete = createObservableDelegate(this.#api.delete);
    this.download = createObservableDelegate(this.#api.download);
    this.upload = createObservableDelegate(this.#api.upload);
  }
  
}