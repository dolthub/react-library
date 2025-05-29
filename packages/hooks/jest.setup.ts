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
