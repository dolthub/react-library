import useDownloadFile, { createLink } from "../useDownloadFile";

describe("useDownloadFile", () => {
  // Mocking the necessary global objects and functions
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn();
    global.document.createElement = jest.fn().mockReturnValue({
      setAttribute: jest.fn(),
      click: jest.fn(),
      parentNode: {
        removeChild: jest.fn(),
      },
    });
    global.document.body.appendChild = jest.fn();
  });

  it("creates a link and initiates download", () => {
    const href = "blob:test";
    const fileName = "test.txt";
    createLink(href, fileName);

    const link = (document.createElement as jest.Mock).mock.results[0].value;
    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(link.setAttribute).toHaveBeenNthCalledWith(1, "href", href);
    expect(link.setAttribute).toHaveBeenNthCalledWith(2, "download", fileName);
    expect(document.body.appendChild).toHaveBeenCalledWith(link);
    expect(link.click).toHaveBeenCalled();
    expect(link.parentNode.removeChild).toHaveBeenCalledWith(link);
  });

  it("creates a link and initiates without filename", () => {
    const href = "blob:test";
    createLink(href);

    const link = (document.createElement as jest.Mock).mock.results[0].value;
    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(link.setAttribute).toHaveBeenNthCalledWith(1, "href", href);
    expect(link.setAttribute).not.toHaveBeenCalledWith("download");
    expect(document.body.appendChild).toHaveBeenCalledWith(link);
    expect(link.click).toHaveBeenCalled();
    expect(link.parentNode.removeChild).toHaveBeenCalledWith(link);
  });

  it("creates a Blob and initiates download through onDownload", () => {
    const fileName = "test.txt";
    const contents = "Hello, World!";
    const { onDownload } = useDownloadFile(fileName);
    onDownload(contents);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    const blob = (global.URL.createObjectURL as jest.Mock).mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob).toEqual(new Blob([contents], { type: "text/plain" }));
  });

  it("creates a Blob and initiates download through onDownload as csv", () => {
    const fileName = "test.csv";
    const fileType = "text/csv";
    const contents = "col1,col2\n1,2";
    const { onDownload } = useDownloadFile(fileName, fileType);
    onDownload(contents);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    const blob = (global.URL.createObjectURL as jest.Mock).mock.calls[0][0];
    expect(blob).toBeInstanceOf(Blob);
    expect(blob).toEqual(new Blob([contents], { type: fileType }));
  });
});
