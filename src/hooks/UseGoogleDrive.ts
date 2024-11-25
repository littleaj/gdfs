import { useCallback, useState } from "react";
import { gdrive } from "../google-aliases";

type File = gapi.client.drive.File;

// modifiedTime is RFC-3339
type DriveFile = Required<Pick<File, "id" | "name" | "modifiedTime" | "mimeType" | "parents" | "iconLink">> & {
  "label": string
};

export default function useGoogleDrive(): [DriveFile[], () => void, () => void] {

  const [driveContents, setDriveContents] = useState<DriveFile[]>([] as DriveFile[]);

  const resetContents = useCallback(() => {
    setDriveContents([]);
  }, []);

  const refreshContents = useCallback(() => {
    console.log("querying for files");
    gdrive.files.list({
      corpora: "user",
      orderBy: "name_natural",
      fields: "files(id, name, modifiedTime, mimeType, parents, iconLink)", // Q how does this work?
      spaces: "drive"
    }).then((response) => {
      const files = response.result.files;
      if (!files) {
        console.warn("files refresh did not return a value...");
      }
      console.info(files?.length + "files found");
      setDriveContents((files ?? []) as DriveFile[]);
    },
      (err) => {
        console.error("Error listing drive files: ", err);
      });
  }, []);

  return [driveContents, refreshContents, resetContents];
}