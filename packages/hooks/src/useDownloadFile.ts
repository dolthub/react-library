type ReturnType = {
  onDownload: (contents: string) => void;
};

export default function useDownloadFile(
  fileName: string,
  fileType = "text/plain"
): ReturnType {
  const onDownload = (contents: string) => {
    const file = new Blob([contents], {
      type: fileType,
    });
    const href = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  return { onDownload };
}
