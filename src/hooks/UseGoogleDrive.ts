import { useCallback, useState } from "react";


type File = gapi.client.drive.File;

// modifiedTime is RFC-3339
type DriveFile = Required<Pick<File, "id" | "name" | "modifiedTime" | "mimeType" | "parents" | "iconLink">> & {
  "label": string
};

export default function useGoogleDrive() {

  const [driveContents, setDriveContents] = useState<DriveFile[]>([] as DriveFile[]);

  const resetContents = useCallback(() => {
    setDriveContents([]);
  }, []);

  const refreshContents = useCallback(() => {
    console.log("querying for files");
    gapi.client.drive.files.list({
      q: "",
      corpora: "user",
      orderBy: "name_natural",
      fields: "files(id, name, modifiedTime, mimeType, parents, iconLink)", // Q how does this work?
      spaces: "drive"
    }).then((response) => {
      const files = response.result.files;
      if (!files) {
        console.warn("files refresh did not return a value...");
      }
      console.info(files?.length + " files found");
      setDriveContents((files ?? []) as DriveFile[]);
    },
    (err: gapi.client.Response<{ error: Record<string, unknown> & { code: number, message: string } }>) => {
        console.error(err.result.error.code, "- Error listing drive files: ", err.result.error.message);
      });
  }, []);

  return { driveContents, refreshContents, resetContents };
}