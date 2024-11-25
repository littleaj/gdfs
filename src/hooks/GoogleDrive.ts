import { useCallback } from "react";

export default function useGoogleDrive() {
  /**
   * Print metadata for first 10 files.
   */
  const listFiles = useCallback(() => {
    console.log("querying for files");
    gapi.client.drive.files.list({
      pageSize: 10,
      fields: "files(id, name)", // Q how does this work?
    }).then((response) => {
      const files = response.result.files;
      if (!files || files.length == 0) {
        console.info("No files found");
        return;
      }
      // Flatten to string to display
      const output = files.reduce(
        (str, file) => `${str}${file.name} (${file.id})\n`,
        "Files:\n");
      console.info(output);
    },
      (err) => {
        console.error("Error listing drive files: ", err);
      });
  }, []);

  return [listFiles];
}