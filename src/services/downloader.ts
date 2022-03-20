// https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

// The download function takes a CSV string, the filename and mimeType as parameters
// Scroll/look down at the bottom of this snippet to see how download is called
export const download = function (
  content: string,
  fileName: string,
  mimeType: string
) {
  const a = document.createElement("a");
  mimeType = mimeType || "application/octet-stream";

  if (navigator.msSaveBlob) {
    // IE10
    navigator.msSaveBlob(
      new Blob([content], {
        type: mimeType,
      }),
      fileName
    );
  } else if (URL && "download" in a) {
    //html5 A[download]
    a.href = URL.createObjectURL(
      new Blob([content], {
        type: mimeType,
      })
    );
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    location.href =
      "data:application/octet-stream," + encodeURIComponent(content); // only this mime type is supported
  }
};
