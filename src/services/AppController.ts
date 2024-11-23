import { ObservableDelegate, ObservableFacade, createObservableDelegate } from "../model/ObservableDelegate";
import ApiService from "./ApiService";

/**
 * Encapsulates application behaviors
 */
export default class AppController implements ObservableFacade<ApiService> {
  public readonly list: ObservableDelegate<ApiService["list"]>;
  public readonly delete: ObservableDelegate<ApiService["delete"]>;
  public readonly upload: ObservableDelegate<ApiService["upload"]>;
  public readonly download: ObservableDelegate<ApiService["download"]>;

  constructor(api: ApiService) {
    this.list = createObservableDelegate(api.list);
    this.delete = createObservableDelegate(api.delete);
    this.download = createObservableDelegate(api.download);
    this.upload = createObservableDelegate(api.upload);
  }
  
}