import "@testing-library/jest-dom";
import "@testing-library/react";

// Mock HTMLFormElement.prototype.requestSubmit for jsdom compatibility
Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', {
  value: function(submitter?: HTMLElement) {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'submitter', { value: submitter });
    this.dispatchEvent(event);
  },
  writable: true,
  configurable: true,
});

// Mock clipboard API for jsdom compatibility
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

// Mock document.execCommand for copy-to-clipboard fallback
Object.defineProperty(document, 'execCommand', {
  value: jest.fn().mockReturnValue(true),
  writable: true,
  configurable: true,
});

// Mock window.prompt for CopyButton tests
Object.defineProperty(window, 'prompt', {
  value: jest.fn(),
  writable: true,
  configurable: true,
});
