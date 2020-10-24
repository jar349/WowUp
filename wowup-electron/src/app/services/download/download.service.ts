import { Injectable } from "@angular/core";
import { DOWNLOAD_FILE_CHANNEL } from "common/constants";
import { v4 as uuidv4 } from "uuid";
import { DownloadRequest } from "common/models/download-request";
import { DownloadStatus } from "common/models/download-status";
import { DownloadStatusType } from "common/models/download-status-type";
import { ElectronService } from "../electron/electron.service";

@Injectable({
  providedIn: "root",
})
export class DownloadSevice {
  constructor(private _electronService: ElectronService) {}

  public downloadZipFile(
    url: string,
    fileName: string,
    outputFolder: string,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const request: DownloadRequest = {
        url,
        fileName,
        outputFolder,
        responseKey: uuidv4(),
      };

      const eventHandler = (_evt: any, arg: DownloadStatus) => {
        if (arg.type !== DownloadStatusType.Progress) {
          this._electronService.ipcRenderer.off(
            request.responseKey,
            eventHandler
          );
        }

        switch (arg.type) {
          case DownloadStatusType.Complete:
            resolve(arg.savePath);
            break;
          case DownloadStatusType.Error:
            reject(arg.error);
            break;
          case DownloadStatusType.Progress:
            onProgress?.call(null, arg.progress);
            break;
          default:
            break;
        }
      };

      this._electronService.ipcRenderer.on(request.responseKey, eventHandler);
      this._electronService.ipcRenderer.send(DOWNLOAD_FILE_CHANNEL, request);
    });
  }
}