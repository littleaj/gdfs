import { ObservableDelegate, ObservableFacade, createObservableDelegate } from "../model/ObservableDelegate";
import ApiManager from "./ApiManager";

/**
 * Encapsulates application behaviors
 */
export default class AppController implements ObservableFacade<ApiManager> {
  public readonly list: ObservableDelegate<ApiManager["list"]>;
  public readonly delete: ObservableDelegate<ApiManager["delete"]>;
  public readonly upload: ObservableDelegate<ApiManager["upload"]>;
  public readonly download: ObservableDelegate<ApiManager["download"]>;

  constructor(api: ApiManager) {
    this.list = createObservableDelegate(api.list);
    this.delete = createObservableDelegate(api.delete);
    this.download = createObservableDelegate(api.download);
    this.upload = createObservableDelegate(api.upload);
  }
  
}