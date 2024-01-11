type ReturnType = {
  onDownload: (contents: string) => void;
};

export function createLink(href: string, fileName?: string) {
  const link = document.createElement("a");
  link.setAttribute("href", href);
  if (fileName) {
    link.setAttribute("download", fileName);
  }
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}

export default function useDownloadFile(
  fileName: string,
  fileType = "text/plain",
): ReturnType {
  const onDownload = (contents: string) => {
    const file = new Blob([contents], {
      type: fileType,
    });
    const href = URL.createObjectURL(file);

    createLink(href, fileName);
  };

  return { onDownload };
}
