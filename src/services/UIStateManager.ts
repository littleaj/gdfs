import { FileTreeData } from "../model/data/ui/FileTreeData";

/**
 * Encapsulates all UI updates
 */
export default class UIStateManager {
  private constructor() {
  }

  /**
   * Activates application UI components
   */
  public async activate() {
    await this.configureLiseneters();
    this.setAppComponentsEnabled(true);
  }

  private async configureLiseneters() {
    // IMPLEMENT
  }

  private setAppComponentsEnabled(enabled: boolean) {
    // IMPLEMENT
  }

  /**
   * showError
   */
  public async showError(message: string) {
    // IMPLEMENT
  }

  /**
   * showDialog
   */
  public async showDialog(message: string) {
    // IMPLEMENT
  }

  public async updateFileTree(data: FileTreeData) {
    // IMPLEMENT
  }

}